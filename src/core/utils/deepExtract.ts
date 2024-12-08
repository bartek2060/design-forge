/**
 * Deeply extracts values from an object that match a predicate
 * @param obj The object to extract from
 * @param predicate Function that determines if a value should be extracted
 * @returns Array of extracted values
 */
const deepExtract = <T>(obj: unknown, predicate: (value: unknown, path: string[]) => value is T): T[] => {
    const results: T[] = [];

    const extract = (value: unknown, currentPath: string[] = []) => {
        if (!value) return;

        if (typeof value === "object") {
            if (predicate(value, currentPath)) {
                results.push(value);
                return;
            }

            Object.entries(value).forEach(([key, val]) => {
                extract(val, [...currentPath, key]);
            });
        }

        if (Array.isArray(value)) {
            value.forEach((item) => extract(item, currentPath));
        }
    };

    extract(obj);
    return results;
};

export default deepExtract;
