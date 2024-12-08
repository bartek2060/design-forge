import React from "react";
import type { ColumnProps } from "../types";

import classNames from "@/@design/build/utils/classNames";
import { getResponsiveClasses } from "@/@design/build/utils/responsive";

import styles from "./Column.module.scss";

export default function Column({ children, className, width = { base: "auto" }, grow, shrink, order, ...props }: ColumnProps) {
    const widthClasses = getResponsiveClasses(width, (value) => `w-${value}`, { cssModule: styles });

    return (
        <div
            className={classNames(
                styles.item,
                widthClasses,
                grow && styles.grow,
                shrink && styles.shrink,
                order !== undefined && `order-${order}`,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
