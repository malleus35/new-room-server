import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";
import KafkaService from "@src/services/KafkaService";

class KafkaController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        KafkaService.Init();
    }
    protected async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {}
}

export default KafkaController;
