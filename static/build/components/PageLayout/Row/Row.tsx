import React from "react";
import type { RowProps } from "../types";

import classNames from "@/@design/build/utils/classNames";
import tokens from "@/@design/build/tokens.json";

import { getResponsiveClasses } from "@/@design/build/utils/responsive";

import styles from "./Row.module.scss";

export default function Row({
    children,
    className,
    gap = 2,
    gapX,
    gapY,
    alignItems = { base: "start" },
    justifyContent = { base: "between" },
    wrap = true,
    direction = "row",
    ...props
}: RowProps) {
    const gapXVal = gapX ?? gap ?? "0";
    const gapYVal = gapY ?? gap ?? "0";

    const alignClasses = getResponsiveClasses(alignItems, (value) => `items-${value}`);
    const justifyClasses = getResponsiveClasses(justifyContent, (value) => `justify-${value}`);

    return (
        <div
            style={
                {
                    "--gap-x": tokens.spacing[gapXVal],
                    "--gap-y": tokens.spacing[gapYVal],
                } as React.CSSProperties
            }
            className={classNames(
                styles.row,
                alignClasses,
                justifyClasses,
                `direction-${direction}`,
                wrap ? "flex-wrap" : "flex-nowrap",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
