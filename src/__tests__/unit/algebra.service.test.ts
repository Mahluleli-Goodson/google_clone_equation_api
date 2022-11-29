import dotenv from "dotenv";

dotenv.config();

import algebraService from "../../services/algebra.service";

const equationWrong = "2x * x + 6 = 4";
const expression = "2x * x + 6";
const brokenEquation = "2x= 2x * ((x + 6";

describe("AlgebraService", () => {

    describe("solveEquation", () => {

        describe("with second degree equation", () => {
            it("should reject equation and return empty array", () => {
                const _result = algebraService.solveEquation(equationWrong);
                expect(_result.length).toEqual(0);
            });
        });
    });

    describe("isFirstDegree", () => {

        describe("with NO equal sign i.e: an expression", () => {
            it("should reject and return false", () => {
                const _result = algebraService.isFirstDegreeEq(expression);
                expect(_result).toBeFalsy();
            });
        });
    });

    describe("doTheMath", () => {

        it("should return an empty array", () => {
            const _result = algebraService.doTheMath(brokenEquation);
            expect(_result.length).toBe(0);
        });
    });

});
