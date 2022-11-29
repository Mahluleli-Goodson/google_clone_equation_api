import logUtil from "../utils/logger.util";
// @ts-ignore
import mathsteps from "mathsteps";
import {IMathStep, ISanitizedMathStep} from "../types/types";

class MathService {

    /**
     * Do the math calculations and return as steps
     * @param equation
     */
    public doTheMath = (equation: string) => {
        const steps: any[] = mathsteps.solveEquation(equation);
        return steps;
    }

    /**
     * restructure math steps to proper result
     * @param mathSteps
     */
    public sanitizeEqSteps = (mathSteps: IMathStep[]): ISanitizedMathStep[] => {
        try {
            const sanitizedSteps: ISanitizedMathStep[] = [];

            for (const step of mathSteps) {
                const _body: ISanitizedMathStep = {
                    description: this.cleanStepType(step.changeType),
                    before: step.oldEquation.ascii(),
                    after: step.newEquation.ascii(),
                };
                sanitizedSteps.push(_body);
            }

            return sanitizedSteps;

        } catch (e: any) {
            logUtil?.error(e, `[MathService.sanitizeEqSteps] failed :: `);
            return [];
        }
    }

    /**
     * Change step type from underscored string to spaced string
     * @param changeType
     */
    private cleanStepType = (changeType: string) => {
        return changeType.replaceAll("_", " ");
    }
}

export default MathService;
