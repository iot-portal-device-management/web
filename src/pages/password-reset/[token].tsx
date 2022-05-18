import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { getBaseLayout } from '../../layouts';
import { Box, Card, Container, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import FullWidthTextField from '../../components/FullWidthTextField';
import { Formik, FormikProps } from 'formik';
import BaseLayoutLogo from '../../components/BaseLayoutLogo';
import { useAuth } from '../../hooks/useAuth';
import FormValidationErrors from '../../components/FormValidationErrors';
import createResetPasswordValidationSchema from '../../validationSchemas/auth/createResetPasswordValidationSchema';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

interface Values {
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

const ResetPasswordPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const validationSchema = createResetPasswordValidationSchema();

  return (
    <>
      <MainContent>
        <Container maxWidth="sm">
          <LogoBox>
            <BaseLayoutLogo/>
          </LogoBox>
          <SignInCard>
            <Box>
              <SignInTitle variant="h2">Reset password</SignInTitle>
              <SignInDescription variant="h4">Fill in the fields below to reset your password.</SignInDescription>
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
                resetPassword({ ...values, setSubmitting, setErrors });
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
                  <SignInButton fullWidth variant="contained" size="large" type="submit" loading={isSubmitting}>
                    Reset password
                  </SignInButton>
                </Box>
              )}
            </Formik>
          </SignInCard>
        </Container>
      </MainContent>
    </>
  );
};

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return getBaseLayout('Reset Password', page);
};

export default ResetPasswordPage;
