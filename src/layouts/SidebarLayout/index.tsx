import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: React.ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
    flex: 1 1 auto;
    display: flex;
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      padding-left: ${theme.sidebar.width};
    }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
    margin-top: ${theme.header.height};
    flex: 1 1 auto;
    overflow: auto;
`
);

const SidebarLayout = (props: SidebarLayoutProps) => {
  return (
    <>
      <Sidebar/>
      <MainWrapper>
        <Header/>
        <MainContent>
          {props.children}
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
