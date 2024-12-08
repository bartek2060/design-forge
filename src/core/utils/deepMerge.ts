function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
    const result = { ...target };

    for (const key in source) {
        // Handle arrays specially
        if (Array.isArray(source[key])) {
            // If target also has an array at this key, concatenate them
            result[key] = Array.isArray(target[key]) ? [...target[key], ...source[key]] : [...source[key]];
            continue;
        }

        // Handle nested objects
        if (source[key] instanceof Object && key in target && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

export default deepMerge;
