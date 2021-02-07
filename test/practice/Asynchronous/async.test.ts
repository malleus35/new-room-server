import { fetchCallBack, fetchData, fetchError } from "./fetchData";

describe("Callbacks", () => {
    it("the data is peanut butter", (done) => {
        function callback(data: any) {
            try {
                expect(data).toBe("peanut butter");
                done();
            } catch (error) {
                done(error);
            }
        }
        fetchCallBack(callback);
    });
});

describe("Promises", () => {
    it("the data is peanut butter", () => {
        return fetchData().then((data) => {
            expect(data).toBe("peanut butter");
        });
    });

    it("the fetch fails with an error", () => {
        expect.assertions(1);
        return fetchError().catch((e) => expect(e).toMatch("error"));
    });

    it("the data is peanut butter with resolves", () => {
        return expect(fetchData()).resolves.toBe("peanut butter");
    });

    it("the fetch fails with an error with rejects", () => {
        return expect(fetchError()).rejects.toMatch("error");
    });
});

describe("Async/Await", () => {
    it("the data is peanut butter", async () => {
        const data = await fetchData();
        expect(data).toBe("peanut butter");
    });

    it("the fetch fails with an error", async () => {
        expect.assertions(1);
        try {
            await fetchError();
        } catch (e) {
            expect(e).toMatch("error");
        }
    });

    it("the data is peanut butter with resolves", async () => {
        await expect(fetchData()).resolves.toBe("peanut butter");
    });

    it.skip("the fetch fails with an error wtih rejects", async () => {
        await expect(fetchError()).rejects.toThrow("error");
    });
});
