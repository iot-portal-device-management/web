import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Card, Container, Link, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createRegisterValidationSchema from '../validationSchemas/auth/createRegisterValidationSchema';
import { LoadingButton } from '@mui/lab';

interface Values {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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

const SignInButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
`
);

const RegisterPage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const validationSchema = createRegisterValidationSchema();

  return (
    <>
      <MainContent>
        <Container maxWidth="sm">
          <LogoBox>
            <BaseLayoutLogo/>
          </LogoBox>
          <SignInCard>
            <Box>
              <SignInTitle variant="h2">Create account</SignInTitle>
              <SignInDescription variant="h4">Fill in the fields below to sign up for an account.</SignInDescription>
            </Box>
            <FormValidationErrors errors={errors}/>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirmation: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                register({ ...values, setSubmitting, setErrors });
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
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                  />
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
                  <FullWidthTextField
                    required
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Password confirmation"
                    placeholder="Enter password confirmation"
                  />
                  <SignInButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Register
                  </SignInButton>
                </Box>
              )}
            </Formik>
            <Box sx={{ my: 4 }}>
              <Typography component="span" variant="subtitle2">
                Already have an account?
              </Typography>
              {' '}
              <Link href="/login" underline="hover">
                <b>Sign in here</b>
              </Link>
            </Box>
          </SignInCard>
        </Container>
      </MainContent>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Register', page);
};

export default RegisterPage;
