import { STYLE_GENERATION } from "../../../constants";

/**
 * Ensures a SCSS variable has the correct prefix, adding it only if not already present
 * @param variable The variable name to check/modify
 * @returns Variable name with correct prefix
 * @example
 * ensurePrefix('color') => '$color'
 * ensurePrefix('$color') => '$color'
 */
export function ensurePrefix(variable: string, prefix: string): string {
    return variable.startsWith(prefix) ? variable : `${prefix}${variable}`;
}

/**
 * Generates a SCSS variable name with prefix and separator
 * @param name Base name for the variable
 * @param key Variable key/identifier
 * @param buildSettings Optional build settings for customization
 * @returns Formatted SCSS variable name
 * @example generateScssVariableName('color', 'primary') => '$base-color-primary'
 */
export function generateScssVariableName(...keys: string[]): string {
    const name = keys.join(STYLE_GENERATION.VARIABLE_KEY_SEPARATOR);
    return ensurePrefix(name, STYLE_GENERATION.SCSS_VARIABLE_PREFIX);
}

/**
 * Generates a SCSS map name with prefix and separator
 * @param name Base name for the map
 * @param buildSettings Optional build settings for customization
 * @returns Formatted SCSS map name
 * @example generateScssMapName('colors') => '$colors-map'
 */
export function generateScssMapName(...varParts: string[]): string {
    const keys = [...varParts, STYLE_GENERATION.MAP_KEY];
    const fullName = keys.join(STYLE_GENERATION.VARIABLE_KEY_SEPARATOR);

    return ensurePrefix(fullName, STYLE_GENERATION.SCSS_VARIABLE_PREFIX);
}

/**
 * Generates a CSS custom property name with prefix and separator
 * @param name Base name for the variable
 * @param key Variable key/identifier
 * @param buildSettings Optional build settings for customization
 * @returns Formatted CSS variable name
 * @example generateCssVariableName('color', 'primary') => '--color-primary'
 */
export function generateCssVariableName(...keys: string[]): string {
    const fullName = keys.join(STYLE_GENERATION.VARIABLE_KEY_SEPARATOR);
    return ensurePrefix(fullName, STYLE_GENERATION.CSS_VARIABLE_PREFIX);
}

/**
 * Generates a nested SCSS map declaration
 * @param obj The nested object to convert to SCSS map
 * @param indent Current indentation level
 * @returns Formatted nested SCSS map string
 */
export function generateNestedScssMap(obj: any, indent = ""): string {
    const entries = Object.entries(obj);
    if (entries.length === 0) return "()";

    const lines = entries.map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
            return `${indent}    "${key}": ${generateNestedScssMap(value, indent + "    ")}`;
        }
        return `${indent}    "${key}": ${value}`;
    });

    return `(\n${lines.join(",\n")}\n${indent})`;
}

/**
 * Generates a SCSS map declaration that can handle both flat and nested structures
 * @param name Base name for the map
 * @param values Values to include in the map
 * @param isNested Whether to treat the values as a nested structure
 * @returns Formatted SCSS map declaration
 */
export function generateScssMapDeclaration(name: string, values: Record<string, any>, options: { isNested?: boolean; generateMapName?: boolean }): string {
    const { isNested = false, generateMapName = true } = options;

    const mapName = generateMapName ? generateScssMapName(name) : generateScssVariableName(name);
    const mapContent = isNested ? generateNestedScssMap(values) : generateFlatScssMap(values);
    return generateVariableDeclaration(mapName, mapContent);
}

/**
 * Generates a flat SCSS map structure
 * @param values Key-value pairs for the map
 * @returns Formatted flat SCSS map string
 */
function generateFlatScssMap(values: Record<string, any>): string {
    const entries = Object.entries(values)
        .map(([key, value]) => `"${key}": ${value}`)
        .join(",\n    ");

    return `(\n    ${entries}\n)`;
}

/**
 * Generates a SCSS map keys declaration
 * @param name Base name for the map
 * @param buildSettings Build settings for customization
 * @returns Formatted SCSS map keys declaration
 * @example generateScssMapKeysDeclaration('colors') => '--colors-array: map-keys($colors-map)'
 */
export function generateScssMapKeysDeclaration(name: string): string {
    const arrayName = generateCssVariableName(name, STYLE_GENERATION.ARRAY_KEY);
    const mapName = generateScssMapName(name);
    return generateVariableDeclaration(arrayName, `map-keys(${mapName})`);
}

/**
 * Generates a SCSS array declaration with quoted values
 * @param name Base name for the array
 * @param values Array of strings to be included in the SCSS array
 * @returns Formatted SCSS array declaration
 * @example generateScssArray('colors', ['blue', 'red']) => '--colors-array: ("blue", "red")'
 */
export function generateScssArray(name: string, values: string[]): string {
    const arrayName = generateScssVariableName(name, STYLE_GENERATION.ARRAY_KEY);
    return generateVariableDeclaration(arrayName, `(${values.map((v) => `"${v}"`).join(", ")})`);
}

/**
 * Generates a variable declaration
 * @param variableName Name of the variable
 * @param value Value to assign to the variable
 * @returns Formatted variable declaration
 * @example generateVariableDeclaration('$base-color-primary', '#123456') => '$base-color-primary: #123456'
 */
export function generateVariableDeclaration(variableName: string, value: string): string {
    return `${variableName}: ${value}`;
}

/**
 * Generates a SCSS mixin include statement
 * @param mixinName Name of the mixin to include
 * @param config Configuration object containing mixin parameters
 * @returns Formatted mixin include statement
 */
export function generateIncludeMixin(mixinName: string, params: any[]): string {
    return `@include ${generateScssFunctionCall(mixinName, params)};`;
}

export function generateScssFunctionCall(functionName: string, params: any[]): string {
    const formattedParams = params.map((param) => {
        if (typeof param === "string") {
            if (param.includes(STYLE_GENERATION.SCSS_VARIABLE_PREFIX)) {
                return param;
            }
            return param.startsWith("$") ? param : `"${param}"`;
        }
        if (typeof param === "object" && param !== null) {
            return generateNestedScssMap(param);
        }
        return param;
    });
    return `${functionName}(${formattedParams.join(", ")})`;
}
