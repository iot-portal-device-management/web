import { useField, useFormikContext } from 'formik';
import { Autocomplete, CircularProgress } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Optional } from '../../libs/utilityTypes';
import { AutocompleteValue } from '@mui/base/AutocompleteUnstyled/useAutocomplete';

interface FullWidthAutoCompleteProps<T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined> extends Optional<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  required?: boolean;
  name: string;
  label?: string;
  isLoading?: boolean;
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
      ...rest
    }: FullWidthAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleOptionChange = <T,
    Multiple,
    DisableClearable,
    FreeSolo>(event: SyntheticEvent, value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>): void => {
    setFieldValue(name, value);
  };

  return (
    <Autocomplete
      sx={{ my: 1, ...sx }}
      fullWidth
      autoComplete
      disablePortal
      onChange={handleOptionChange}
      renderInput={(params) => {
        return (<TextField
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
        />)
      }}
      {...rest}
    />
  );
};

export default FullWidthAutoComplete;
