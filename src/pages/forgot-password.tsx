/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { getBaseLayout } from '../layouts';
import { Box, Container, Link, Typography } from '@mui/material';
import FullWidthTextField from '../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../components/BaseLayoutLogo';
import { useAuth } from '../hooks/useAuth';
import FormValidationErrors from '../components/FormValidationErrors';
import forgotPasswordValidationSchema from '../validationSchemas/auth/forgotPasswordValidationSchema';
import FormSuccessStatus from '../components/FormSuccessStatus';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import BaseLayoutMainContentWrapper from '../components/BaseLayoutMainContentWrapper';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCard from '../components/BaseLayoutCard';
import BaseLayoutLogoWrapper from '../components/BaseLayoutLogoWrapper';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Values {
  email: string;
}

const ForgotPasswordPage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const { forgotPassword } = useAuth({ middleware: 'guest' });

  const validationSchema = forgotPasswordValidationSchema();

  return (
    <>
      <BaseLayoutMainContentWrapper>
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
                forgotPassword({ setSubmitting, setErrors, setStatus, ...values });
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
                  <BaseLayoutCardButton type="submit" loading={isSubmitting}>
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
      </BaseLayoutMainContentWrapper>
    </>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Forgot Password', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ForgotPasswordPage;
