import {object, string} from "zod";
import algebraService from "../../services/algebra.service";

const payload = {
    body: object({
        equation: string({
            required_error: "Equation is required.",
            invalid_type_error: "Equation must be a string",
        })
            .min(4, "An equation can not be that short.")
            .refine(algebraService?.isFirstDegreeEq, "Only VALID first degree equations are allowed.")
    }),
};

export const solveEquationSchema = object({
    ...payload,
});
