import { FILE_TYPES } from "../constants";

// Supported style file types
export type StyleFileType = keyof typeof FILE_TYPES.STYLE;
export type BasicFileType = keyof typeof FILE_TYPES.BASIC;

export interface FileDefinition<TStyles, TBasic = TStyles> {
    styles?: {
        [K in StyleFileType]?: TStyles;
    };
    basic?: {
        [K in BasicFileType]?: TBasic;
    };
}
// Definition for a style build output
export interface StyleBuildDefinition {
    selectors: {
        [selector: string]: string[];
    };
    lines: string[];
}

// Complete build output definition
export type BuildDefinition = FileDefinition<StyleBuildDefinition, string>;

export type Buildable = { build(): BuildDefinition };

export const isBuildable = (obj: unknown): obj is Buildable => {
    if (!obj || typeof obj !== "object") {
        return false;
    }

    return typeof (obj as any).build === "function";
};

export type FileConfig = {
    NAME: string;
    PRETTIER_PARSER: string;
    SKIP_DEFAULT_HEADER?: boolean;
    HEADER?: string;
};
