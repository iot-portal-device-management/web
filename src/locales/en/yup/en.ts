import {
  ArrayLocale,
  BooleanLocale,
  DateLocale,
  LocaleObject,
  MixedLocale,
  NumberLocale,
  ObjectLocale,
  StringLocale
} from 'yup/lib/locale';

export let mixed: Required<MixedLocale> = {
  default: '${path} is invalid.',
  required: 'The ${path} field is required.',
  oneOf: 'The selected ${path} is invalid.',
  notOneOf: 'The selected ${path} is invalid.',
  notType: '${path} must be a ${type} type.',
  defined: '${path} must be defined.'
};

export let string: Required<StringLocale> = {
  length: 'The ${path} must be ${length} characters.',
  min: 'The ${path} must be at least ${min} characters.',
  max: 'The ${path} may not be greater than ${max} characters.',
  matches: 'The ${path} format is invalid.',
  email: 'The ${path} must be a valid email address.',
  url: 'The ${path} format is invalid.',
  uuid: 'The ${path} must be a valid UUID.',
  trim: '${path} must be a trimmed string.',
  lowercase: '${path} must be a lowercase string.',
  uppercase: '${path} must be a upper case string.'
};

export let number: Required<NumberLocale> = {
  min: 'The ${path} must be at least ${min}.',
  max: 'The ${path} may not be greater than ${max}.',
  lessThan: 'The ${path} must be less than ${less}.',
  moreThan: 'The ${path} must be greater than ${more}.',
  positive: '${path} must be a positive number.',
  negative: '${path} must be a negative number.',
  integer: 'The ${path} must be an integer.'
};

export let date: Required<DateLocale> = {
  min: 'The ${path} must be a date after ${min}.',
  max: 'The ${path} must be a date before  ${max}.'
};

export let boolean: BooleanLocale = {
  isValue: '${path} field must be ${value}.'
};

export let object: Required<ObjectLocale> = {
  noUnknown: '${path} field has unspecified keys: ${unknown}.'
};

export let array: Required<ArrayLocale> = {
  min: '${path} field must have at least ${min} items.',
  max: '${path} field must have less than or equal to ${max} items.',
  length: '${path} must have ${length} items.'
};

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
}) as LocaleObject;
