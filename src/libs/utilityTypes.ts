// Generic type to make property optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Generic type to make optional property to be required
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
