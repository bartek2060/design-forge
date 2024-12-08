export type NestedRecord<T> = {
    [key: string]: T | NestedRecord<T>;
};

export type Lowercase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Lowercase<Rest>}` : T;
