import env from "@src/custom/dotenv";
describe("Test dotenv test", () => {
    it("custom dotenv test", () => {
        env.chooseEnv();
        expect(process.env.PORT).not.toEqual("5000");
        expect(process.env.PORT).not.toEqual("8080");
        expect(process.env.PORT).toEqual("8000");
    });
});
