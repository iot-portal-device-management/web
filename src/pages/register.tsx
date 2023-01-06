/*
 * Copyright (C) 2021-2022 Intel Corporation
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
import registerValidationSchema from '../validationSchemas/auth/registerValidationSchema';
import BaseLayoutMainContentWrapper from '../components/BaseLayoutMainContentWrapper';
import BaseLayoutLogoWrapper from '../components/BaseLayoutLogoWrapper';
import BaseLayoutCardTitle from '../components/BaseLayoutCardTitle';
import BaseLayoutCardDescription from '../components/BaseLayoutCardDescription';
import BaseLayoutCardButton from '../components/BaseLayoutCardButton';
import BaseLayoutCard from '../components/BaseLayoutCard';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

  const validationSchema = registerValidationSchema();

  return (
    <>
      <BaseLayoutMainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoWrapper>
            <BaseLayoutLogo/>
          </BaseLayoutLogoWrapper>
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
                register({ setSubmitting, setErrors, ...values });
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
                    autoComplete="off"
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                  <FullWidthTextField
                    required
                    autoComplete="off"
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Password confirmation"
                    placeholder="Enter password confirmation"
                  />
                  <BaseLayoutCardButton type="submit" loading={isSubmitting}>
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
      </BaseLayoutMainContentWrapper>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Register', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default RegisterPage;
