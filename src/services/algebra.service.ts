import logUtil from "../utils/logger.util";
// @ts-ignore
import math from "mathjs";
import stringUtil from "../utils/string.util";
import MathService from "./math.service";
import {ISanitizedMathStep} from "../types/types";

class AlgebraService extends MathService {

    /**
     * Solve passed equation and return all steps
     * @param equation
     */
    public solveEquation = (equation: string): ISanitizedMathStep[] => {
        try {
            equation = stringUtil.removeWhiteSpace(equation).toLowerCase();
            if (!this.isFirstDegreeEq(equation)) throw Error("only first degree equations allowed");
            const mathSolution = this.doTheMath(equation);

            return this.sanitizeEqSteps(mathSolution);

        } catch (e: any) {
            logUtil?.error(e, `[AlgebraService.solveEquation] failed :: `);
            return [];
        }
    }

    /**
     * Split equation by equal sign, into left and right parts
     * @param equation
     * @private
     */
    private eqSplitToNodes = (equation: string): string[] => {
        const splitEq = equation.split("=");
        const leftNode = splitEq[0];
        const rightNode = splitEq[1];

        return [leftNode, rightNode];
    }

    /**
     * Check if equation is first degree i.e: only a single unknown raised to the power of 1
     * @param equation
     */
    public isFirstDegreeEq = (equation: string): boolean => {
        try {
            if (!this.hasEqualSign(equation) || !this.hasSingleUnknown(equation)) return false;

            const _nodes = this.eqSplitToNodes(equation);
            for (const node of _nodes) {
                const simplified = math.simplify(node).toString();
                if (simplified.includes("^")) return false;
            }

            return true;
        } catch (e: any) {
            logUtil?.error(e, `[AlgebraService.isFirstDegreeEq] failed :: `);
            return false;
        }
    }

    /**
     * Check if only a single equal sign exists in equation, otherwise it's an expression or malformed
     * @param equation
     */
    private hasEqualSign = (equation: string): boolean => {
        const matchedEqualSigns = [...equation].filter(char => char == "=");
        return matchedEqualSigns.length == 1;
    }

    /**
     * Check if only a single unknown exists, otherwise it's not a first degree linear equation
     * @param equation
     */
    private hasSingleUnknown = (equation: string): boolean => {
        const regex = /[a-z]/gi;
        const unknowns = equation.match(regex);
        const uniqUnknowns = [...new Set(unknowns)];

        return uniqUnknowns.length == 1;
    }
}

const algebraService = new AlgebraService;

export default algebraService;
