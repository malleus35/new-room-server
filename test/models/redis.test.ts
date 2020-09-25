import redis from "redis";
import { promisify } from "util";
describe("Redis test", () => {
    let getAsync;
    let setAsync;
    let client;
    beforeEach(() => {
        client = redis.createClient({
            host: "127.0.0.1",
            port: 6379
        });
        getAsync = promisify(client.get).bind(client);
        setAsync = promisify(client.set).bind(client);
    });

    afterEach(() => {
        client.quit();
        client.end(true);
    });
    it("create redis connection and test get,set method", async () => {
        await setAsync(
            "maestroprog@seoultech.ac.kr",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m"
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
});
