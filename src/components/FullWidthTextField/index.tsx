import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import { WithRequired } from '../../libs/utilityTypes';
import { useEffect } from 'react';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

type FullWidthTextFieldProps = WithRequired<TextFieldProps, 'name'> & { errors?: any };

const FullWidthTextField = ({ name, errors, ...rest }: FullWidthTextFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField(name);

  useEffect(() => {
    if (errors && errors.hasOwnProperty(name)) {
      fieldHelperProps.setError(errors[name]);
    }
  }, [errors])

  const renderErrorMessage = () => {
    if (isString(fieldMetaProps.error)) {
      return fieldMetaProps.error;
    } else if (isArray(fieldMetaProps.error)
      && isString(fieldMetaProps.error[0])) {
      return fieldMetaProps.error[0];
    }

    return null;
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      {...(fieldMetaProps.touched && fieldMetaProps.error && { error: true, helperText: renderErrorMessage() })}
      {...fieldInputProps}
      {...rest}
    />
  );
};

export default FullWidthTextField;
