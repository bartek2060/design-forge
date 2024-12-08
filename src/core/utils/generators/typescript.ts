/**
 * Generates a TypeScript union type string from an object's keys or array of strings
 * @param values - An object whose keys will form the union, or an array of strings, or undefined
 * @returns A string representation of the TypeScript union type (e.g., "'option1' | 'option2'")
 * @example
 * generateUnionType({ foo: 1, bar: 2 }) // returns "'foo' | 'bar'"
 * generateUnionType(['foo', 'bar']) // returns "'foo' | 'bar'"
 * generateUnionType(undefined) // returns "never"
 */
export const generateUnionType = (values: Record<string, unknown> | string[] | undefined): string => {
    if (!values) return "never";

    let keys: string[] = Object.keys(values);
    if (Array.isArray(values)) {
        keys = values;
    }

    if (keys.length === 0) return "never";
    return keys
        .map((key) => {
            let typeToAdd = `'${key}'`;
            // if the key is a valid number, also add the number type
            if (!isNaN(Number(key))) {
                typeToAdd += ` | ${key}`;
            }
            return typeToAdd;
        })
        .join(" | ");
};

/**
 * Converts a JavaScript object into a formatted string representation
 * @param obj - The object to convert to string
 * @returns A string representation of the object with proper formatting and indentation
 * @example
 * convertObjectToString({ foo: 1, bar: { baz: 2 } }) returns "foo: 1,\nbar: {\nbaz: 2\n}"
 */
const checkKeyForSpecialCharacters = (key: string) =>
    /[^a-zA-Z0-9_$]|^[0-9]/.test(key) ||
    /^(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)$/.test(
        key,
    );
export const convertObjectToString = (obj: any): string => {
    return Object.entries(obj)
        .map(([key, value]) => {
            const needsQuotes = checkKeyForSpecialCharacters(key);
            const formattedKey = needsQuotes ? `'${key}'` : key;

            if (typeof value === "object") {
                return `${formattedKey}: {\n${convertObjectToString(value)}\n}`;
            }
            return `${formattedKey}: ${value}`;
        })
        .join(",\n");
};
