import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContentWrapper = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default MainContentWrapper;
