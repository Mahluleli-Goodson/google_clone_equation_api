import dotenv from "dotenv";

dotenv.config();

import appUtil from "../../utils/application.util";
import supertest from "supertest";
import {get} from "lodash";
import algebraService from "../../services/algebra.service";

const URI = "/api/algebra/solve";
const app = appUtil.createServer();

const payload = {
    "equation": "2x + 6 = 4x + 5/8",
};
const payloadWrongFormat = {
    "equation": "2x (+ 6 = 4x + 5/8",
};
const payloadNoRes = {
    "equation": "2x + 6 = 2x + 6",
};

describe("equation", () => {

    describe("find solution", () => {

        describe("without API_KEY", () => {
            it("should return status code 403", async () => {
                const {statusCode} = await supertest(app).post(URI).send(payload);
                expect(statusCode).toBe(403);
            });
        });

        describe("with empty API_KEY", () => {
            it("should return status code 403", async () => {
                const {statusCode} = await supertest(app).post(URI).set("Authorization", "Bearer ").send(payload);
                expect(statusCode).toBe(403);
            });
        });

        describe("with invalid API_KEY", () => {
            it("should return status code 403", async () => {
                const {statusCode} = await supertest(app).post(URI).set("Authorization", "Bearer 123").send(payload);
                expect(statusCode).toBe(403);
            });
        });

        describe("with valid API_KEY", () => {
            const authKey = `Bearer ${appUtil.apiKey}`;

            it("should return status code 200 and correct solution", async () => {
                const {statusCode, body} = await supertest(app).post(URI).set("Authorization", authKey).send(payload);

                expect(statusCode).toBe(200);
                expect(Object.keys(body)).toEqual(["code", "message", "errors", "result"]);
                expect(get(body, "result")).toHaveLength(9);
            });

            it("should call supporting methods", async () => {
                const _solveEquation = jest.spyOn(algebraService, "solveEquation");
                const _isFirstDegreeEq = jest.spyOn(algebraService, "isFirstDegreeEq");
                const _hasEqualSign = jest.spyOn(algebraService as any, "hasEqualSign");
                const _hasSingleUnknown = jest.spyOn(algebraService as any, "hasSingleUnknown");

                await supertest(app).post(URI).set("Authorization", authKey).send(payload);

                expect(_solveEquation).toHaveBeenCalledTimes(1);
                expect(_isFirstDegreeEq).toHaveBeenCalled();
                expect(_hasEqualSign).toHaveBeenCalled();
                expect(_hasSingleUnknown).toHaveBeenCalled();
            });

            describe("wrongly formatted equation", () => {
                it("should return status code 422 with errors", async () => {
                    const {statusCode, body} = await supertest(app)
                        .post(URI)
                        .set("Authorization", authKey)
                        .send(payloadWrongFormat);

                    expect(statusCode).toBe(422);
                    expect(get(body, "result")).toEqual([]);
                    expect(get(body, "errors").length).toBeGreaterThan(0);
                });
            });

            describe("no solution equation", () => {
                it("should return status code 422", async () => {

                    const {statusCode, body} = await supertest(app)
                        .post(URI)
                        .set("Authorization", authKey)
                        .send(payloadNoRes);

                    expect(statusCode).toBe(422);
                    expect(get(body, "result")).toEqual([]);
                    expect(get(body, "errors")).toEqual([]);
                });
            });

        });

    });
});
