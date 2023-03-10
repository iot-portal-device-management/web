/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useContext } from 'react';
import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SidebarContext } from '../../../contexts/SidebarContext';
import SidebarMenu from './SidebarMenu';
import Logo from '../../../components/Logo';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    color: ${theme.sidebar.textColor};
    background: ${theme.sidebar.background};
    box-shadow: ${theme.sidebar.boxShadow};
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      position: fixed;
      z-index: 10;
      border-top-right-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
    display: flex;
    height: 88px;
    align-items: center;
    margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  return (
    <>
      <SidebarWrapper sx={{ display: { xs: 'none', lg: 'block' }, overflow: 'auto' }}>
        <TopSection>
          <Logo/>
        </TopSection>
        <SidebarMenu/>
      </SidebarWrapper>
      <Drawer
        sx={{ display: { xs: 'block', lg: 'none' } }}
        anchor="left"
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <TopSection>
            <Logo/>
          </TopSection>
          <SidebarMenu/>
        </SidebarWrapper>
      </Drawer>
    </>
  );
};

export default Sidebar;
