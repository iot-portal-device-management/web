import { styled } from '@mui/material/styles';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

const CardButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

const BaseLayoutCardButton = ({ children, ...rest }: LoadingButtonProps) => {
  return (
    <CardButton
      fullWidth
      variant="contained"
      size="large"
      {...rest}
    >
      {children}
    </CardButton>
  );
};

export default BaseLayoutCardButton;
