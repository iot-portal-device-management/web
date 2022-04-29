import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import { WithRequired } from '../../libs/utilityTypes';

type FullWidthTextFieldProps = WithRequired<TextFieldProps, 'name'>;

const FullWidthTextField = ({ name, ...rest }: FullWidthTextFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField(name);

  return (
    <TextField
      fullWidth
      margin="normal"
      {...(fieldMetaProps.touched && fieldMetaProps.error && { error: true, helperText: fieldMetaProps.error })}
      {...fieldInputProps}
      {...rest}
    />
  );
};

export default FullWidthTextField;
