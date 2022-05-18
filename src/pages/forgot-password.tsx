import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Container, Link, Typography } from '@mui/material';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import createForgotPasswordValidationSchema from '../validationSchemas/auth/createForgotPasswordValidationSchema';
import FormSuccessStatus from '../components/FormSuccessStatus';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import MainContentWrapper from '../components/MainContentWrapper';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCard from '../components/BaseLayoutCard';
import BaseLayoutLogoWrapper from '../components/BaseLayoutLogoWrapper';

interface Values {
  email: string;
}

const ForgotPasswordPage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const { forgotPassword } = useAuth({ middleware: 'guest' });

  const validationSchema = createForgotPasswordValidationSchema();

  return (
    <>
      <MainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoWrapper>
            <BaseLayoutLogo/>
          </BaseLayoutLogoWrapper>
          <BaseLayoutCard>
            <Box>
              <BaseLayoutCardTitle variant="h2">Forgot Password</BaseLayoutCardTitle>
              <BaseLayoutCardDescription variant="h4">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
              </BaseLayoutCardDescription>
            </Box>
            <FormSuccessStatus message={status}/>
            <FormValidationErrors errors={errors}/>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                forgotPassword({ ...values, setSubmitting, setErrors, setStatus });
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
                  <BaseLayoutCardButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Email password reset link
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

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Forgot Password', page);
};

export default ForgotPasswordPage;
