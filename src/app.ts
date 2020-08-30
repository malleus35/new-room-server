import express, { Request, Response } from "express";

export const app = express();
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});
app.get("/signin", (req: Request, res: Response) => {
	const { id, pwd } = req.body;
	console.log(req.body)
	res.json({ msg: "Login Success!" });
});

app.listen(3000);
