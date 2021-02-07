import sum from "../../sum";
describe("Common Matchers", () => {
    it("two plus two is four", () => {
        expect(sum(2, 2)).toBe(4);
    });

    it("object assignment", () => {
        const data = { one: 1 };
        data["two"] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    });

    it("adding positive numbers is not zero", () => {
        for (let a = 1; a < 10; a++) {
            for (let b = 1; b < 10; b++) {
                expect(a + b).not.toBe(0);
            }
        }
    });
});

describe("Truthiness", () => {
    it("null", () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    it("zero", () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });
});

describe("Numbers", () => {
    it("two plus two", () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);

        expect(value).toBe(4);
        expect(value).toEqual(4);
    });

    it("adding floating point numbers", () => {
        const value = 0.1 + 0.2;
        expect(value).toBeCloseTo(0.3);
    });
});

describe("Strings", () => {
    it("there is no I in team", () => {
        expect("team").not.toMatch(/I/);
    });

    it("but there is a 'stop' in Christoph", () => {
        expect("Christoph").toMatch(/stop/);
    });
});

describe("Arrays and iterables", () => {
    const shoppingList = [
        "diapers",
        "kleenex",
        "trash bags",
        "paper towels",
        "milk"
    ];

    it("the shopping list has milk on it", () => {
        expect(shoppingList).toContain("milk");
        expect(new Set(shoppingList)).toContain("milk");
    });
});

describe("Exceptions", () => {
    function compileAndroidCode() {
        throw new Error("you are using the wrong JDK");
    }

    it("compiling android goes as expected", () => {
        expect(() => compileAndroidCode()).toThrow();
        expect(() => compileAndroidCode()).toThrow(Error);

        expect(() => compileAndroidCode()).toThrow(
            "you are using the wrong JDK"
        );
        expect(() => compileAndroidCode()).toThrow(/JDK/);
    });
});
