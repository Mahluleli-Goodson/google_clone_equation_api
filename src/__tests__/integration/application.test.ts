import supertest from "supertest";
import appUtil from "../../utils/application.util";

const app = appUtil.createServer();

describe("application", () => {

    describe("uptime", () => {
        it("should return status code 200", async () => {
            await supertest(app).get("/uptime").expect(200);
        });
    });
});
