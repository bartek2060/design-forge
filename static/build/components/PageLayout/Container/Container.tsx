import React from "react";

import type { ContainerProps } from "../types";

import classNames from "@/@design/build/utils/classNames";

import styles from "./Container.module.scss";

export default function Container({ children, className, maxSize = "xl", ...props }: ContainerProps) {
    return (
        <div className={classNames(styles.container, styles[`max-${maxSize}`], className)} {...props}>
            {children}
        </div>
    );
}
