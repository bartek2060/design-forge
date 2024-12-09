import path from "path";
import { FileDefinition, FileConfig } from "./types";

export const FILE_TYPES = {
    STYLE: {
        TOKENS: "TOKENS",
        GLOBAL: "GLOBAL",
        UTILITIES: "UTILITIES",
    },
    BASIC: {
        CONFIG_JSON: "CONFIG_JSON",
        CLASSES_JSON: "CLASSES_JSON",
        TOKENS_JSON: "TOKENS_JSON",
        TYPES: "TYPES",
    },
} as const;

export const STYLE_GENERATION = {
    VARIABLE_KEY_SEPARATOR: "-",

    ARRAY_KEY: "keys",
    MAP_KEY: "values",

    SCSS_VARIABLE_PREFIX: "$",
    CSS_VARIABLE_PREFIX: "--",
} as const;

export const BUILD_FOLDER_NAME = "build";
export const BUILD_CLASSES_BREAKPOINT_KEY = "bp";

export const STATIC_PATH = {
    init: path.join(__dirname, "../static/init"),
    build: path.join(__dirname, "../static/build"),
} as const;

export const FILES: Required<FileDefinition<FileConfig>> = {
    styles: {
        [FILE_TYPES.STYLE.TOKENS]: {
            NAME: "tokens.scss",
            PRETTIER_PARSER: "scss",
        },
        [FILE_TYPES.STYLE.GLOBAL]: {
            NAME: "globals.scss",
            PRETTIER_PARSER: "scss",
            HEADER: ["@import './tokens.scss';", "@import './themes.scss';", "@import './utilities.scss';"].join("\n"),
        },
        [FILE_TYPES.STYLE.UTILITIES]: {
            NAME: "utilities.scss",
            PRETTIER_PARSER: "scss",
            HEADER: ["@import './tokens.scss';", "@import './mixins/createUtility.scss';"].join("\n"),
        },
    },
    basic: {
        [FILE_TYPES.BASIC.CONFIG_JSON]: {
            NAME: "config.json",
            PRETTIER_PARSER: "json",
            SKIP_DEFAULT_HEADER: true,
        },
        [FILE_TYPES.BASIC.CLASSES_JSON]: {
            NAME: "classes.json",
            PRETTIER_PARSER: "json",
            SKIP_DEFAULT_HEADER: true,
        },
        [FILE_TYPES.BASIC.TOKENS_JSON]: {
            NAME: "tokens.json",
            PRETTIER_PARSER: "json",
            SKIP_DEFAULT_HEADER: true,
        },
        [FILE_TYPES.BASIC.TYPES]: {
            NAME: "types/config.ts",
            PRETTIER_PARSER: "typescript",
        },
    },
} as const;
