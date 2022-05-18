import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Container } from '@mui/material';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormSuccessStatus from '../components/FormSuccessStatus';
import MainContentWrapper from '../components/MainContentWrapper';
import BaseLayoutLogoBox from '../components/BaseLayoutLogoBox';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCard from '../components/BaseLayoutCard';

const VerifyEmailPage: NextPageWithLayout = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);

  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
  });

  return (
    <>
      <MainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoBox>
            <BaseLayoutLogo/>
          </BaseLayoutLogoBox>
          <BaseLayoutCard>
            <Box>
              <BaseLayoutCardTitle variant="h2">Verify Email</BaseLayoutCardTitle>
              <BaseLayoutCardDescription variant="h4">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
              </BaseLayoutCardDescription>
            </Box>
            {status === 'verification-link-sent' && (
              <FormSuccessStatus
                message="A new verification link has been sent to the email address you provided during registration."
              />
            )}
            <BaseLayoutCardButton
              fullWidth
              variant="contained"
              size="large"
              loading={submitting}
              onClick={() => resendEmailVerification({ setSubmitting, setStatus })}
            >
              Resend verification email
            </BaseLayoutCardButton>
            <BaseLayoutCardButton fullWidth variant="contained" color="error" size="large" onClick={logout}>
              Logout
            </BaseLayoutCardButton>
          </BaseLayoutCard>
        </Container>
      </MainContentWrapper>
    </>
  );
};

VerifyEmailPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Verify Email', page);
};

export default VerifyEmailPage;
