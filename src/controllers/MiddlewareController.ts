import Controller from "@src/controllers/controller";

abstract class MiddlewareController extends Controller {
    constructor() {
        super();
    }

    abstract doService(): unknown;
    doResponse(): any {
        this.doMiddlewareResponse();
    }

    abstract doMiddlewareResponse(): unknown;
}

export default MiddlewareController;
