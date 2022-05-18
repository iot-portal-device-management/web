import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Container, Link, Typography } from '@mui/material';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createLoginValidationSchema from '../validationSchemas/auth/createLoginValidationSchema';
import LabelCheckbox from '../components/LabelCheckbox';
import FormSuccessStatus from '../components/FormSuccessStatus';
import { useRouter } from 'next/router';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCard from '../components/BaseLayoutCard';
import BaseLayoutLogoWrapper from '../components/BaseLayoutLogoWrapper';
import ControlWrapper from '../components/ControlWrapper';
import MainContentWrapper from '../components/MainContentWrapper';

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

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
      <MainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoWrapper>
            <BaseLayoutLogo/>
          </BaseLayoutLogoWrapper>
          <BaseLayoutCard>
            <Box>
              <BaseLayoutCardTitle variant="h2">Sign in</BaseLayoutCardTitle>
              <BaseLayoutCardDescription variant="h4">
                Fill in the fields below to sign into your account.
              </BaseLayoutCardDescription>
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
                  <BaseLayoutCardButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Sign in
                  </BaseLayoutCardButton>
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
          </BaseLayoutCard>
        </Container>
      </MainContentWrapper>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Login', page);
};

export default LoginPage;
