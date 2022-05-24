import { Alert, AlertTitle } from '@mui/material';

interface FormSuccessStatusProps {
  title?: string;
  message?: string;
}

const FormSuccessStatus = ({ title, message, ...rest }: FormSuccessStatusProps) => {
  return (
    <>
      {(title || message) && (
        <Alert severity="success" {...rest}>
          {title && (<AlertTitle>{title}</AlertTitle>)}
          {message}
        </Alert>
      )}
    </>
  );
};

export default FormSuccessStatus;
