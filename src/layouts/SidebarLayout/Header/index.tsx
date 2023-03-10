/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useContext } from 'react';

import { Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SidebarContext } from '../../../contexts/SidebarContext';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import HeaderUserBox from './UserBox';
import Logo from '../../../components/Logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 5;
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};
    position: fixed;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      left: ${theme.sidebar.width};
      width: auto;
    }
`
);

const Header = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Logo/>
        </Box>
        {/*<Box sx={{ display: { xs: 'none', md: 'block' } }}>*/}
        {/*  <HeaderMenu/>*/}
        {/*</Box>*/}
      </Box>
      <Box display="flex" alignItems="center">
        {/*<HeaderButtons/>*/}
        <HeaderUserBox/>
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon/> : <CloseTwoToneIcon/>}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
