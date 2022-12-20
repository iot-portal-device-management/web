import { useField } from 'formik';
import { WithRequired } from '../../libs/utilityTypes';
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material';

interface LabelCheckboxProps extends WithRequired<CheckboxProps, 'name'> {
  label: string;
  formControlLabelProps?: FormControlLabelProps;
  checkboxProps?: CheckboxProps;
}

const LabelCheckbox = ({ name, label, formControlLabelProps, checkboxProps, ...rest }: LabelCheckboxProps) => {
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField(name);

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          inputProps={{ 'name': name, 'aria-label': label }}
          {...fieldInputProps}
          {...checkboxProps}
          {...rest}
        />
      }
      {...formControlLabelProps}
    />
  );
};

export default LabelCheckbox;
