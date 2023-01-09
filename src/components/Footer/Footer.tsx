/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: 0;
    margin: ${theme.spacing(3)} 0;
`
);

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; 2021-2022 - IoT Portal Device Management
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
