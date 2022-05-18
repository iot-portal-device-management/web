import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Card, Container, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import FormSuccessStatus from '../components/FormSuccessStatus';

const MainContent = styled(Box)(
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

const LogoBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top:  ${theme.spacing(5)};
    -webkit-box-align: center;
    align-items: center;
`
);

const SignInCard = styled(Card)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
    padding: ${theme.spacing(5)} ${theme.spacing(4)} ${theme.spacing(3)};
`
);

const SignInTitle = styled(Typography)(
  ({ theme }) => `
    margin: 0 0 ${theme.spacing(1)};
`
);

const SignInDescription = styled(Typography)(
  ({ theme }) => `
    margin: 0 0 ${theme.spacing(3)};
    color: ${theme.colors.alpha.black[70]};
    font-weight: normal;
`
);

const SignInButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

const VerifyEmailPage: NextPageWithLayout = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);

  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
  });

  return (
    <>
      <MainContent>
        <Container maxWidth="sm">
          <LogoBox>
            <BaseLayoutLogo/>
          </LogoBox>
          <SignInCard>
            <Box>
              <SignInTitle variant="h2">Verify Email</SignInTitle>
              <SignInDescription variant="h4">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
              </SignInDescription>
            </Box>
            {status === 'verification-link-sent' && (
              <FormSuccessStatus
                message="A new verification link has been sent to the email address you provided during registration."
              />
            )}
            <SignInButton
              fullWidth
              variant="contained"
              size="large"
              loading={submitting}
              onClick={() => resendEmailVerification({ setSubmitting, setStatus })}
            >
              Resend verification email
            </SignInButton>
            <SignInButton fullWidth variant="contained" color="error" size="large" onClick={logout}>
              Logout
            </SignInButton>
          </SignInCard>
        </Container>
      </MainContent>
    </>
  );
};

VerifyEmailPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Verify Email', page);
};

export default VerifyEmailPage;
