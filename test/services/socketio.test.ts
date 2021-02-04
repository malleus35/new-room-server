// import app from "@src/app";
import socketIoClient from "socket.io-client";
import { Server } from "socket.io";
//TODO Express서버와 연결해서도 잘 되는지 확인 필요
//TODO 그룹에서 회원 목록 중에 톡을 보내는 것 로직 생각해보기
//TOD 두명이서 서버 거쳐서 통신시키기
//TOD 단톡방도 만들기
//TOD Room 사용해보기
//TOD Room 사용하기 위한 네임스페이스 테스트 만들기
// TOD 네임스페이스 이해하기
const initSocketServer = () =>
    new Server(8001, {
        transports: ["websocket"],
        pingInterval: 10000,
        pingTimeout: 5000
    });

const setSocketEvent = (namesp) => {
    return {
        basic: () => {
            namesp.on("connection", (soc) => {
                soc.on("echo", (msg) => {
                    soc.emit("echoSend", "Hello " + msg);
                });

                soc.emit("disconnect!", "disconnected...");
            });
        },
        nsp: () => {
            namesp.on("connection", (socket) => {
                socket.on("meari", (msg) => {
                    socket.emit("meariResponse", "메아리 " + msg);
                });
                socket.emit("diconnect!", "disconnected...");
            });
        },
        room: () => {
            namesp.on("connection", (socket) => {
                socket.join("coding room");
                socket.emit("test room", "Holy Crack");
                socket.on("say to coding room", (msg) => {
                    socket.to("coding room").emit("my message", msg);
                });
                socket.on("coding", (msg) => {
                    socket.emit("codingResponse", "코딩 " + msg);
                });
                socket.emit("disconnect!", "disconnected...");
            });
        }
    };
};

const setClientConnect = (client, mode?) => {
    return () =>
        client.connect(`http://localhost:8001/${mode || ""}`, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ["websocket"]
        });
};

const setClientEvent = (client, done) => {
    return {
        basic: () => {
            client.on("connect", () => {
                client.on("send", (msg) =>
                    expect(msg).toEqual("This is Server")
                );
                client.emit("hey", "This is Client");
                done();
            });
            client.on("disconnect!", (msg) =>
                expect(msg).toEqual("disconnected...")
            );
        },
        nsp: () => {
            client.on("connect", () => {
                client.on("meari", (msg) => {
                    client.emit("meariResponse", "메아리 " + msg);
                });
                client.on("disconnect!", (msg) =>
                    expect(msg).toEqual("disconnected...")
                );
                done();
            });
        },
        room: () => {
            client.on("connect", () => {
                client.on("coding", (msg) => {
                    client.emit("codingResponse", "코딩 " + msg);
                });
                client.on("test room", (msg) => {
                    client.emit("say to coding room", "Holy " + msg);
                });
                client.on("disconnect!", (msg) =>
                    expect(msg).toEqual("disconnected...")
                );
                done();
            });
        }
    };
};
const endConnect = (server, client, done) => {
    if (client.connected) {
        // console.log("disconnecting...");
        client.disconnect();
    } else {
        console.log("no connection to break...");
    }
    server.close();
    done();
};
describe("Basic socketioClient test", () => {
    let socket;
    let socket_server;
    beforeEach((done) => {
        socket_server = initSocketServer();
        setSocketEvent(socket_server).basic();
        socket = setClientConnect(socketIoClient)();
        setClientEvent(socket, done).basic();
    });
    afterEach((done) => {
        // Cleanup
        endConnect(socket_server, socket, done);
    });

    it("Basic connection test", (done) => {
        socket_server.emit("echo", "Hello World");
        socket.on("echo", (msg) => {
            expect(msg).toEqual("Hello World");
            done();
        });
    });

    it("Basic connection test emit server", (done) => {
        socket.emit("echo", "Server!");
        socket.on("echoSend", (msg) => {
            expect(msg).toEqual("Hello Server!");
            done();
        });
    });
});

describe("Basic using namespace test", () => {
    let nspSocket;
    let nspSocket_server;
    beforeEach((done) => {
        nspSocket_server = initSocketServer();
        const adminNamespace = nspSocket_server.of("/admin");
        setSocketEvent(adminNamespace).nsp();

        nspSocket = setClientConnect(socketIoClient, "admin")();
        setClientEvent(nspSocket, done).nsp();
    });
    afterEach((done) => {
        endConnect(nspSocket_server, nspSocket, done);
    });
    it("Basic Connection test use namesapce", (done) => {
        nspSocket.emit("meari", "양정훈");
        nspSocket.on("meariResponse", (msg) => {
            expect(msg).toEqual("메아리 양정훈");
            done();
        });
    });
});

describe("Basic using room test", () => {
    let roomSocket;
    let roomSocket2;
    let roomSocket_server;
    beforeEach((done) => {
        roomSocket_server = initSocketServer();
        const roomNamespace = roomSocket_server.of("/room");
        setSocketEvent(roomNamespace).room();

        roomSocket = setClientConnect(socketIoClient, "room")();
        roomSocket2 = setClientConnect(socketIoClient, "room")();
        setClientEvent(roomSocket, () => "").room();
        setClientEvent(roomSocket2, done).room();
    });
    afterEach((done) => {
        endConnect(roomSocket_server, roomSocket, () => "");
        endConnect(roomSocket_server, roomSocket2, done);
    });
    it("Basic Connection test use namesapce", (done) => {
        roomSocket.emit("coding", "양정훈");
        roomSocket.on("codingResponse", (msg) => {
            expect(msg).toEqual("코딩 양정훈");
            // done();
        });
        roomSocket2.on("codingResponse", (msg) => {
            expect(msg).toEqual("코딩 양정훈");
            // done();
        });
        roomSocket.on("my message", (msg) => {
            console.log(msg + "1");
            expect(msg).toEqual("Holy Holy Crack");
        });
        roomSocket2.on("my message", (msg) => {
            console.log(msg + "2");
            expect(msg).toEqual("Holy Holy Crack");
            done();
        });
    });
});
