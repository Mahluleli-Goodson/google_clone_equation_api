export interface IMathStep {
    oldEquation: { ascii: () => string; };
    changeType: string;
    newEquation: { ascii: () => string; };
    substeps: { length: string; };
}

export interface ISanitizedMathStep {
    description: string;
    before: string;
    after: string;
}
