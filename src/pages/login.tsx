import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Button, Card, Container, Link, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createLoginValidationSchema from '../validationSchemas/auth/createLoginValidationSchema';
import LabelCheckbox from '../components/LabelCheckbox';

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

const SignInButton = styled(Button)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

const LoginPage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
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
            <FormValidationErrors errors={errors}/>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: '',
                password: '',
                remember: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // TODO: implement set status after email validation
                login({ ...values, setErrors, setStatus });
              }}
            >
              {({ handleSubmit }: FormikProps<Values>) => (
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
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                  <ControlWrapper>
                    // TODO: Implement remember me feature
                    <LabelCheckbox
                      name="remember"
                      label="Remember me"
                    />
                    <Link href="/forgot-password" underline="hover">
                      <b>Forgot your password?</b>
                    </Link>
                  </ControlWrapper>
                  <SignInButton fullWidth variant="contained" size="large" type="submit">Sign in</SignInButton>
                </Box>
              )}
            </Formik>
            <Box sx={{ my: 4 }}>
              <Typography component="span" variant="subtitle2">
                Don’t have an account, yet?
              </Typography>
              {" "}
              <Link href="#" underline="hover">
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
