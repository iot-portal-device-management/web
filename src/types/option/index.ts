interface Option<Label, Value> {
  label: Label;
  value: Value;
}

export interface BaseOption<Label extends string = string, Value extends string | number = string> extends Option<Label, Value> {
}