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
    gapY = 8,
    alignItems = { base: "start" },
    justifyContent = { base: "between" },
    wrap = true,
    direction = "row",
    ...props
}: RowProps) {
    const gapXVal = gapX ?? gap;
    const gapYVal = gapY ?? gap;

    const alignClasses = getResponsiveClasses(alignItems, (value) => `items-${value}`);
    const justifyClasses = getResponsiveClasses(justifyContent, (value) => `justify-${value}`);

    return (
        <div
            style={
                {
                    "--gap-x": !gapXVal ? "0px" : tokens.spacing[gapXVal],
                    "--gap-y": !gapYVal ? "0px" : tokens.spacing[gapYVal],
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
