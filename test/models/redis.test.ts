import redis from "redis";
import { promisify } from "util";
describe("Redis test", () => {
    let flushallAsync: Function;
    let getAsync: Function;
    let setAsync: Function;
    let ttlAsync: Function;
    let delAsync: Function;
    let client: redis.RedisClient;

    beforeEach(async () => {
        client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
        flushallAsync = promisify(client.flushall).bind(client);

        getAsync = promisify(client.get).bind(client);
        setAsync = promisify(client.set).bind(client);
        ttlAsync = promisify(client.ttl).bind(client);
        delAsync = promisify(client.del).bind(client);

        await flushallAsync()
            .then((succeeded) => {
                console.log(succeeded); // will be true if successfull
            })
            .catch((err) => console.log(err));
    });

    afterEach(() => {
        client.end(true);
        client.quit();
    });
    it("create redis connection and test get,set method", async () => {
        await setAsync(
            "maestroprog@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m",
            "EX",
            60 * 60 * 24 * 14,
            "NX"
        )
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        await getAsync("maestroprog@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("test set with ex method", async () => {
        await setAsync(
            "luciferkala@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m",
            "EX",
            60 * 60 * 24 * 14
        )
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        await setAsync(
            "minoflower31@seoultech.ac.kr",
            "DDDDDDDDDDDDDD",
            "PX",
            1
        )
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        await getAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });

        await getAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });

        await ttlAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
            })
            .catch((err) => {
                console.log(err);
            });

        await ttlAsync("minoflower31@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("test set not exist method", async () => {
        await setAsync(
            "luciferkala@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m",
            "EX",
            60 * 60 * 24 * 14,
            "NX"
        )
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        await getAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });

        await ttlAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply).not.toBeNaN();
            })
            .catch((err) => {
                console.log(err);
            });
        await setAsync(
            "luciferkala@seoultech.ac.kr",
            "ddJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m",
            "EX",
            60 * 60 * 24 * 14,
            "NX"
        )
            .then((reply) => {
                expect(reply).toBeNull();
                console.log("hello");
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("test to delete key", async () => {
        await setAsync(
            "luciferkala@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m",
            "EX",
            60 * 60 * 24 * 14,
            "NX"
        )
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        await getAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });
        await ttlAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply).not.toBeNaN();
            })
            .catch((err) => {
                console.log(err);
            });
        await delAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                // expect(reply).not.toBeNaN();
            })
            .catch((err) => {
                console.log(err);
            });
        await getAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });
        await ttlAsync("luciferkala@seoultech.ac.kr")
            .then((reply) => {
                console.log(reply.toString());
                expect(reply).not.toBeNaN();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("create redis connection and test disconnect and get,set method", async () => {
        let client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
        let flushallAsync = promisify(client.flushall).bind(client);

        let getAsync = promisify(client.get).bind(client);
        let setAsync = promisify(client.set).bind(client);
        let ttlAsync = promisify(client.ttl).bind(client);
        let delAsync = promisify(client.del).bind(client);
        await setAsync(
            "maestroprog@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
        )
            .then((reply: any) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual("OK");
            })
            .catch((err) => {
                console.log(err);
            });
        client.end(true);
        client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
        getAsync = promisify(client.get).bind(client);
        await getAsync("maestroprog@seoultech.ac.kr")
            .then((reply: any) => {
                console.log(reply.toString());
                expect(reply.toString()).toEqual(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
                );
            })
            .catch((err) => {
                console.log(err);
            });
        client.quit();
        // client.end(true);
        // client.quit();
    });
});
