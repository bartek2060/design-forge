import TokenConfig from "../TokenConfig";

export type ThemeTokens = {
    readonly bg: TokenConfig["values"];
    readonly text: TokenConfig["values"];
    [key: string]: TokenConfig["values"];
};

export type Themes = Record<string, ThemeTokens>;
