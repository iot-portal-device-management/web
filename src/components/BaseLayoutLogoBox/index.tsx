import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BaseLayoutLogoBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top:  ${theme.spacing(5)};
    -webkit-box-align: center;
    align-items: center;
`
);

export default BaseLayoutLogoBox;
