import PageTitle from '../../../components/PageTitle';
import { ReactElement, useRef, useState } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import Footer from '../../../components/Footer';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { Form, Formik, FormikProps } from 'formik';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import CardActionsLoadingButton from '../../../components/CardActionsLoadingButton';
import { CreateDeviceJobFormFormikValues } from '../../../types/deviceJob';
import createDeviceJobValidationSchema from '../../../validationSchemas/deviceJob/createDeviceJobValidationSchema';
import { FormikHelpers } from 'formik/dist/types';
import CreateDeviceJobDetailsForm from '../../../components/CreateDeviceJobDetailsForm';
import ReviewCreateDeviceJob from '../../../components/ReviewCreateDeviceJob';
import CardActionsButton from '../../../components/CardActionsButton';
import { sanitizeFormValues } from '../../../utils/utils';
import { DeviceJobData, useDeviceJobCRUD } from '../../../hooks/deviceJob/useDeviceJobCRUD';

const steps = [
  'Enter device job details',
  'Confirmation',
];

const CreateDeviceJobPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateDeviceJobFormFormikValues>>(null);

  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const { createDeviceJob } = useDeviceJobCRUD();

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CreateDeviceJobDetailsForm/>;
      case 1:
        return (
          <ReviewCreateDeviceJob
            deviceJobName={formRef.current?.values.name as string}
            deviceGroupId={formRef.current?.values.deviceGroupId?.value as string}
            savedDeviceCommandId={formRef.current?.values.savedDeviceCommandId?.value as string}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  const submitForm = (values: CreateDeviceJobFormFormikValues, formikHelpers: FormikHelpers<CreateDeviceJobFormFormikValues>) => {
    const { setErrors, setSubmitting } = formikHelpers;
    createDeviceJob(sanitizeFormValues(values) as DeviceJobData, { setErrors, setSubmitting })
  };

  const handleSubmit = (values: CreateDeviceJobFormFormikValues, formikHelpers: FormikHelpers<CreateDeviceJobFormFormikValues>) => {
    if (isLastStep) {
      submitForm(values, formikHelpers);
    } else {
      setActiveStep(activeStep + 1);
      formikHelpers.setTouched({});
      formikHelpers.setSubmitting(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const validationSchema = createDeviceJobValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device job"
          subHeading="To create a new device job, enter a job name, select a device group and saved device command to proceed."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Create new device job"/>
              <Divider/>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  deviceGroupId: null,
                  savedDeviceCommandId: null,
                } as CreateDeviceJobFormFormikValues
                }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }: FormikProps<CreateDeviceJobFormFormikValues>) => (
                  <>
                    <Form>
                      <CardContent>
                        <Stepper activeStep={activeStep}>
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        <Box sx={{ p: 1 }}>
                          {renderStepContent(activeStep)}
                        </Box>
                      </CardContent>
                      <Divider/>
                      <CardActions>
                        {activeStep !== 0 && (
                          <CardActionsButton onClick={handleBack}>
                            Back
                          </CardActionsButton>
                        )}
                        <CardActionsLoadingButton
                          loading={isSubmitting}
                          type="submit"
                        >
                          {isLastStep ? 'Run' : 'Next'}
                        </CardActionsLoadingButton>
                      </CardActions>
                    </Form>
                  </>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

CreateDeviceJobPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device job', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDeviceJobPage;
