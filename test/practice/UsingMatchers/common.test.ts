import sum from "../basic/sum";
describe("Common Matchers", () => {
    it("two plus two is four", () => {
        expect(sum(2, 2)).toBe(4);
    });
});
