import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PageTitleBox = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(4, 0)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper = ({ children }: PageTitleWrapperProps) => {
  return (
    <>
      <PageTitleBox>
        <Container maxWidth="lg">
          {children}
        </Container>
      </PageTitleBox>
    </>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
