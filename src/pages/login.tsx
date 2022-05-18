import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Card, Container, Link, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createLoginValidationSchema from '../validationSchemas/auth/createLoginValidationSchema';
import LabelCheckbox from '../components/LabelCheckbox';
import { LoadingButton } from '@mui/lab';
import FormSuccessStatus from '../components/FormSuccessStatus';
import { useRouter } from 'next/router';

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

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

const ControlWrapper = styled(Box)(
  ({ theme }) => `
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
`
);

const SignInButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  useEffect(() => {
    // @ts-ignore
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset as string))
    } else {
      setStatus(null)
    }
  })

  const validationSchema = createLoginValidationSchema();

  return (
    <>
      <MainContent>
        <Container maxWidth="sm">
          <LogoBox>
            <BaseLayoutLogo/>
          </LogoBox>
          <SignInCard>
            <Box>
              <SignInTitle variant="h2">Sign in</SignInTitle>
              <SignInDescription variant="h4">Fill in the fields below to sign into your account.</SignInDescription>
            </Box>
            <FormSuccessStatus message={status}/>
            <FormValidationErrors errors={errors}/>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: '',
                password: '',
                remember: false
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                login({ ...values, setSubmitting, setErrors, setStatus });
              }}
            >
              {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <FullWidthTextField
                    required
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Enter email address"
                  />
                  <FullWidthTextField
                    required
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                  <ControlWrapper>
                    {/*TODO: Implement remember me feature*/}
                    <LabelCheckbox
                      name="remember"
                      label="Remember me"
                    />
                    <Link href="/forgot-password" underline="hover">
                      <b>Forgot your password?</b>
                    </Link>
                  </ControlWrapper>
                  <SignInButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Sign in
                  </SignInButton>
                </Box>
              )}
            </Formik>
            <Box sx={{ my: 4 }}>
              <Typography component="span" variant="subtitle2">
                Don’t have an account, yet?
              </Typography>
              {' '}
              <Link href="/register" underline="hover">
                <b>Sign up here</b>
              </Link>
            </Box>
          </SignInCard>
        </Container>
      </MainContent>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Login', page);
};

export default LoginPage;
