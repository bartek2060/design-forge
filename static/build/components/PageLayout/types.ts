import { HTMLAttributes } from "react";
import type { DesignTokens, DesignUtilities } from "@/@design/build/types";
import { BreakpointProp } from "../../types";

export type RowGap = DesignUtilities["spacing"]["gap"];
export type JustifyContent = DesignUtilities["layout"]["justifyContent"];
export type AlignItems = DesignUtilities["layout"]["alignItems"];

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    gap?: RowGap;
    gapX?: RowGap;
    gapY?: RowGap;
    alignItems?: BreakpointProp<AlignItems>;
    justifyContent?: BreakpointProp<JustifyContent>;
    wrap?: boolean;
    direction?: DesignUtilities["layout"]["flexDirection"];
}

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
    width?: BreakpointProp<number | "auto">;
    grow?: boolean;
    shrink?: boolean;
    order?: number;
}

export type ContainerSize = DesignTokens["breakpoint"] | "full";
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxSize?: ContainerSize;
}
