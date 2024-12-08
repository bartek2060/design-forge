import { DesignTokens, DesignUtilities, UtilityGeneratorInput } from "../../types";

export type UtilityCreatorFunction<T extends keyof DesignUtilities> = (config: UtilityGeneratorInput[T], tokens: DesignTokens) => DesignUtilities[T];
