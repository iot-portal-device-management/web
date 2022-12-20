import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const BaseLayoutCardTitle = styled(Typography)(
  ({ theme }) => `
    margin: 0 0 ${theme.spacing(1)};
`
);

export default BaseLayoutCardTitle;
