/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

interface Option<Label, Value> {
  label: Label;
  value: Value;
}

export interface BaseOption<Label extends string = string, Value extends string | number = string> extends Option<Label, Value> {
}
