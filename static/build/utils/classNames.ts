type ClassValue = string | null | undefined | boolean | { [key: string]: boolean } | ClassValue[];

/**
 * Combines multiple class names into a single string.
 *
 * @example
 * classNames('foo', 'bar') // => 'foo bar'
 * classNames('foo', { bar: true, baz: false }) // => 'foo bar'
 * classNames(['foo', 'bar'], 'baz') // => 'foo bar baz'
 * classNames(null, undefined, 'foo', false) // => 'foo'
 */
export default function classNames(...classes: ClassValue[]): string {
    const result: string[] = [];

    classes.forEach((cls) => {
        if (!cls) return;

        if (typeof cls === "string") {
            result.push(cls);
        } else if (Array.isArray(cls)) {
            const innerClasses = classNames(...cls);
            if (innerClasses) {
                result.push(innerClasses);
            }
        } else if (typeof cls === "object") {
            Object.entries(cls).forEach(([key, value]) => {
                if (value) {
                    result.push(key);
                }
            });
        }
    });

    return result.join(" ");
}
