import PageTitle from '../../components/PageTitle';
import { ReactElement, useRef, useState } from 'react';

import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../components/Footer';

import Box from '@mui/material/Box';
import { NextPageWithLayout } from "../_app";
import { getSidebarLayout } from "../../layouts";
import { useDeviceCategoryOptions } from "../../hooks/useDeviceCategoryOptions";
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from "../../components/FullWidthTextField";
import FullWidthAutoComplete from "../../components/FullWidthAutoComplete";
import { useDevice } from "../../hooks/useDevice";
import { camelizeObjectPropertyAndSanitizeOptions } from "../../utils/utils";
import { FormModel } from "../../types";

export interface deviceCategoryOptions {
  label: string;
  value: string;
}

const CreateDevicePage: NextPageWithLayout = () => {
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');
  const { options, isLoading, isError } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { createDevice } = useDevice();

  const formRef = useRef<FormikProps<FormModel>>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device"
          subHeading="To create a new device, enter a device name and select a device category."
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
              <CardHeader title="Create new device"/>
              <Divider/>
              <CardContent>
                <Formik
                  enableReinitialize={true}
                  innerRef={formRef}
                  initialValues={{
                    name: '',
                    device_category: '',
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    createDevice(camelizeObjectPropertyAndSanitizeOptions(values));
                  }}
                >
                  {({
                      values, handleChange,
                      handleBlur
                    }) => (
                    <Box
                      component="form"
                      sx={{ p: 1 }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <FullWidthTextField
                        required
                        id="name"
                        name="name"
                        label="Device name"
                        placeholder="Enter device name"
                      />
                      <FullWidthAutoComplete
                        required
                        id="device_category"
                        name="device_category"
                        label="Device category"
                        placeholder="Select a device category"
                        options={options ?? []}
                        isLoading={isLoading}
                        onInputChange={(event, value) => setDeviceCategoryInputValue(value)}
                        filterOptions={(x) => x}
                        isOptionEqualToValue={(option: deviceCategoryOptions, value: deviceCategoryOptions) =>
                          option.value === value.value
                        }
                      />
                    </Box>
                  )}
                </Formik>
              </CardContent>
              <Divider/>
              <CardActions>
                <Button sx={{ margin: 1 }} variant="contained" onClick={handleSubmit}>Create</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

CreateDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export default CreateDevicePage;
