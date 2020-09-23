import argon2 from "argon2";
import LogService from "@src/utils/LogService";
const logger = LogService.getInstance();
describe("argon2 crypt module test", () => {
    let hash1: any;
    let hash2: any;
    it("test make hash test", async () => {
        try {
            hash1 = await argon2.hash("password");
            console.log(hash1);
        } catch (err) {
            logger.info(err);
        }
    });

    it("test decode hash test", async () => {
        try {
            hash2 = await argon2.hash("password");
            console.log(hash2);
        } catch (err) {
            logger.info(err);
        }
        try {
            expect(await argon2.verify(hash1, "password")).toBeTruthy();
            expect(await argon2.verify(hash2, "password")).toBeTruthy();
            expect(
                (await argon2.verify(hash2, "password")) ===
                    (await argon2.verify(hash1, "password"))
            ).toBeTruthy();
        } catch (err) {
            logger.error(err);
        }
    });
});
