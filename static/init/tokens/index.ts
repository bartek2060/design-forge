import type { TokenGeneratorInput } from "@mogielski/design-forge";

import * as baseTokens from "./base";
import * as colorTokens from "./colors";

const tokens: TokenGeneratorInput = {
    // Preset tokens, to get you started faster.
    spacing: baseTokens.spacing,
    breakpoint: baseTokens.breakpoints,
    typography: baseTokens.typography,
    baseColors: colorTokens.baseColors,

    themes: {
        light: colorTokens.lightTheme,
        dark: colorTokens.darkTheme,
    },

    custom: {
        borders: baseTokens.borders,
        effects: baseTokens.effects,
        /* You can have any structure you want, as long as the final value is a TokenConfig.
        eg.
        animation: {
            speed: new TokenConfig({ ... }),
            easing: new TokenConfig({ ... }),
            preset: {
                easeOut: new TokenConfig({ ... }),
            },
        },
        */
    },
};

export default tokens;
