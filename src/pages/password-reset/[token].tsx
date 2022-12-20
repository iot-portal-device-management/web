import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { getBaseLayout } from '../../layouts';
import { Box, Container } from '@mui/material';
import FullWidthTextField from '../../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../../components/BaseLayoutLogo';
import { useAuth } from '../../hooks/useAuth';
import FormValidationErrors from '../../components/FormValidationErrors';
import resetPasswordValidationSchema from '../../validationSchemas/auth/resetPasswordValidationSchema';
import { useRouter } from 'next/router';
import BaseLayoutCardButton from '../../components/BaseLayoutCardButton';
import BaseLayoutMainContentWrapper from '../../components/BaseLayoutMainContentWrapper';
import BaseLayoutCardDescription from '../../components/BaseLayoutCardDescription';
import BaseLayoutCardTitle from '../../components/BaseLayoutCardTitle';
import BaseLayoutCard from '../../components/BaseLayoutCard';
import BaseLayoutLogoWrapper from '../../components/BaseLayoutLogoWrapper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Values {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const ResetPasswordPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const validationSchema = resetPasswordValidationSchema();

  return (
    <>
      <BaseLayoutMainContentWrapper>
        <Container maxWidth="sm">
          <BaseLayoutLogoWrapper>
            <BaseLayoutLogo/>
          </BaseLayoutLogoWrapper>
          <BaseLayoutCard>
            <Box>
              <BaseLayoutCardTitle variant="h2">Reset password</BaseLayoutCardTitle>
              <BaseLayoutCardDescription variant="h4">
                Fill in the fields below to reset your password.
              </BaseLayoutCardDescription>
            </Box>
            <FormValidationErrors errors={errors}/>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: (router.query.email || '') as string,
                password: '',
                passwordConfirmation: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                resetPassword({ setSubmitting, setErrors, ...values });
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
                  <FullWidthTextField
                    required
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Password confirmation"
                    placeholder="Enter password confirmation"
                  />
                  <BaseLayoutCardButton type="submit" loading={isSubmitting}>
                    Reset password
                  </BaseLayoutCardButton>
                </Box>
              )}
            </Formik>
          </BaseLayoutCard>
        </Container>
      </BaseLayoutMainContentWrapper>
    </>
  );
};

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Reset Password', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ResetPasswordPage;
