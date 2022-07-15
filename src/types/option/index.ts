interface Option<Label, Value> {
  label: Label;
  value: Value;
}

export type BaseOption<Label extends string = string, Value extends string = string> = Option<Label, Value>;
