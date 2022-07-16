export type Nullable<T> = T | null;

export type Consumer<T> = (t: T) => void;
export type BiConsumer<T, S> = (t: T, s: S) => void;

export type IFunction<T, R> = (t: T) => R;

export type Runnable = () => void;
