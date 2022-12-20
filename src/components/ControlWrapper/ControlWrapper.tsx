import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ControlWrapper = styled(Box)(
  ({ theme }) => `
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
`
);

export default ControlWrapper;
