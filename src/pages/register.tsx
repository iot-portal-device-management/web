import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Container, Link, Typography } from '@mui/material';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createRegisterValidationSchema from '../validationSchemas/auth/createRegisterValidationSchema';
import MainContentWrapper from '../components/MainContentWrapper';
import BaseLayoutLogoBox from '../components/BaseLayoutLogoBox';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import BaseLayoutCard from '../components/BaseLayoutCard';

interface Values {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const validationSchema = createRegisterValidationSchema();

  return (
    <>
      <MainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoBox>
            <BaseLayoutLogo/>
          </BaseLayoutLogoBox>
          <BaseLayoutCard>
            <Box>
              <BaseLayoutCardTitle variant="h2">Create account</BaseLayoutCardTitle>
              <BaseLayoutCardDescription variant="h4">
                Fill in the fields below to sign up for an account.
              </BaseLayoutCardDescription>
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
                  <BaseLayoutCardButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Register
                  </BaseLayoutCardButton>
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
          </BaseLayoutCard>
        </Container>
      </MainContentWrapper>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Register', page);
};

export default RegisterPage;
