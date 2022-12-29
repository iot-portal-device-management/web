/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

// Generic type to make property optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Generic type to make optional property to be required
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// Generic type to make members of 'Record' optional
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

// Generic type to make Type nullable
export type Nullable<T> = T | null;
