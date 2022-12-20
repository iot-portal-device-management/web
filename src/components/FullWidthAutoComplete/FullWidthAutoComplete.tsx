import { useField, useFormikContext } from 'formik';
import { Autocomplete, AutocompleteValue, CircularProgress } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { SyntheticEvent, useEffect } from 'react';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { isValidObject } from '../../utils/utils';
import { useTranslation } from 'next-i18next';
import { FieldHelperProps, FieldInputProps } from 'formik/dist/types';
import { Optional } from '../../libs/utilityTypes';
import { TranslationFieldMetaProps } from '../../types/formik';

interface FullWidthAutoCompleteProps<T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined> extends Optional<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  required?: boolean;
  name: string;
  label?: string;
  isLoading?: boolean;
  errors?: any;
  hidden?: boolean;
  optionChangeCallback?: (name: string, option: any) => void;
}

const FullWidthAutoComplete = <T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
  >({
      sx,
      required,
      name,
      label,
      placeholder,
      isLoading,
      errors,
      hidden = false,
      optionChangeCallback,
      ...rest
    }: FullWidthAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [fieldInputProps, fieldMetaProps, fieldHelperProps]: [FieldInputProps<any>, TranslationFieldMetaProps<any>,
    FieldHelperProps<any>] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { t } = useTranslation('validation');

  useEffect(() => {
    if (errors && errors.hasOwnProperty(name)) {
      fieldHelperProps.setError(errors[name]);
    }
  }, [errors])

  const { onChange, multiple, ...restFieldInputProps } = fieldInputProps;

  const handleOnChange = <T,
    Multiple,
    DisableClearable,
    FreeSolo>(event: SyntheticEvent, value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>): void => {
    setFieldValue(name, value);

    if (optionChangeCallback) {
      optionChangeCallback(name, value);
    }
  };

  const renderErrorMessage = () => {
    if (isString(fieldMetaProps.error)) {
      return fieldMetaProps.error;
    } else if (isValidObject(fieldMetaProps.error)
      && fieldMetaProps.error!.hasOwnProperty('key')
      && fieldMetaProps.error!.hasOwnProperty('values')) {
      return t(fieldMetaProps.error!.key, fieldMetaProps.error!.values);
    } else if (isValidObject(fieldMetaProps.error)
      && fieldMetaProps.error!.hasOwnProperty('label')
      && fieldMetaProps.error!.label.hasOwnProperty('key')
      && fieldMetaProps.error!.label.hasOwnProperty('values')) {
      return t(fieldMetaProps.error!.label.key, fieldMetaProps.error!.label.values);
    } else if (isValidObject(fieldMetaProps.error)
      && fieldMetaProps.error!.hasOwnProperty('label')
      && isString(fieldMetaProps.error!.label)) {
      return fieldMetaProps.error!.label;
    } else if (isArray(fieldMetaProps.error)
      && isString(fieldMetaProps.error[0])) {
      return fieldMetaProps.error[0];
    }

    return null;
  };

  // @ts-ignore
  return hidden ? null : (
    <Autocomplete
      sx={{ mt: 2, mb: 1, ...sx }}
      fullWidth
      autoComplete
      disablePortal
      onChange={handleOnChange}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            required={required}
            name={name}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            {...(fieldMetaProps.touched && fieldMetaProps.error && { error: true, helperText: renderErrorMessage() })}
          />
        )
      }}
      multiple={multiple as Multiple}
      {...restFieldInputProps}
      isOptionEqualToValue={(option: T, value: T) =>
        // @ts-ignore
        option?.value === value?.value
      }
      {...rest}
    />
  );
};

export default FullWidthAutoComplete;
