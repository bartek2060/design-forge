import { DesignTokens } from "./index";

export type BreakpointProp<T> = T | BreakpointObject<T>;

export type BreakpointObject<T> = { base: T } & {
    [key in DesignTokens["breakpoint"]]?: T;
};
