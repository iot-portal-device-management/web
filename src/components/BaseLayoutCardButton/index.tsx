import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

const BaseLayoutCardButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

export default BaseLayoutCardButton;
