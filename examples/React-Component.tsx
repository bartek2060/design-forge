import React from "react";
import classNames from "@mogielski/design-forge/utils/classNames";

import styles from "./PageSection.module.scss";

// The rest of the imports are what `npm run design-forge:build` generates based on the config.ts file

import { DesignTokens } from "@/@design/build/types";
// baseColors: 'primary' | 'secondary' | 'tertiary'

import { DesignUtilities } from "@/@design/build/types";
// bg: 'primary' | 'secondary' | '100' | '200' | '300'

import tokens from "@/@design/build/tokens.json";
import utilClass from "@/@design/build/classes.json";
/*
"bg": {
    "100": "bg-100",
    "200": "bg-200",
    "300": "bg-300",
    "400": "bg-400",
    "500": "bg-500",
    "base": "bg-base"
}
*/

export interface PageSectionProps {
    variant: DesignTokens["baseColors"];

    background: DesignUtilities["theme"]["bg"];
    padding: DesignUtilities["spacing"]["padding"];
}

const PageSection: React.FC<PageSectionProps> = (props) => {
    const { background, padding, variant } = props;

    return (
        <div className={classNames(utilClass.bg[background], utilClass.p[padding], styles.pageSection)}>
            <h1 style={{ color: tokens["base-color"]["primary"] }}>Hello World</h1>
            <p>
                The SCSS var {`$base-color-primary`} will result in: {tokens["base-color"]["primary"]}
            </p>
            <p>
                The SCSS var {`$base-color-${variant}`} will result in: {tokens["base-color"][variant]}
            </p>
        </div>
    );
};

export default PageSection;
