import mongoose from "mongoose";
interface KittenDoc extends mongoose.Document {
    name: {
        type: String;
    };
    speak?: () => {};
}
describe("mongoose test", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(() => {});

    beforeEach(async () => {
        const db = mongoose.connection;
        await db.on("error", console.error.bind(console, "connection error:"));
        await db.once("open", function () {
            console.log("connect success!");
        });
    });

    afterEach(() => {});

    const kittySchema = new mongoose.Schema({
        name: String
    });
    kittySchema.methods.speak = function () {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
        return greeting;
    };
    const Kitten = mongoose.model<KittenDoc>("Kitten", kittySchema);
    it("create kitten schema and make kitten model test", () => {
        const silence = new Kitten({ name: "Silence" });
        expect(silence.name).toEqual("Silence");
    });

    it("create kitten schema with method test", () => {
        // NOTE: methods must be added to the schema before compiling it with mongoose.model()

        // const Kitten = mongoose.model("Kitten", kittySchema);
        const silence = new Kitten({ name: "Silence" });
        expect(silence.speak()).toEqual("Meow name is Silence");
        const loud = new Kitten();
        expect(loud.speak()).toEqual("I don't have a name");
    });

    it("save kitten schema instance to mongodb test", async () => {
        const fluffy = new Kitten({ name: "fluffy" });
        fluffy.speak(); // "Meow name is fluffy"
        await fluffy
            .save()
            .then((fluffy) => {
                expect(fluffy.speak()).toEqual("Meow name is fluffy");
            })
            .catch((err) => {
                console.log(err);
            });
        await Kitten.find()
            .then((kitten) => console.log(kitten))
            .catch((err) => console.error(err));
    });
});
