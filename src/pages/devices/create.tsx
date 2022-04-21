import PageTitle from '../../components/PageTitle';
import { ReactElement, useState } from 'react';

import PageTitleWrapper from '../../components/PageTitleWrapper';
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid
} from '@mui/material';
import Footer from '../../components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { NextPageWithLayout } from "../_app";
import { getSidebarLayout } from "../../layouts";

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const CreateDevicePage: NextPageWithLayout = () => {

  const [currency, setCurrency] = useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];

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
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    createDeviceStartAsync(getSanitizedValues(values), history);
                  }}
                >
                  {({ values }) => (
                    <Box
                      component="form"
                      sx={{
                        p: 1,
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        sx={{ my: 1 }}
                        required
                        fullWidth
                        id="name"
                        label="Device name"
                        placeholder="Enter device name"
                        helperText="Enter device name"
                      />
                      <Autocomplete
                        disablePortal
                        fullWidth
                        id="device_category"
                        options={top100Films}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            label="Device category"
                            placeholder="Select a device category"
                          />
                        }
                      />
                    </Box>
                  )}
                </Formik>
              </CardContent>
              <Divider/>
              <CardActions>
                <Button sx={{ margin: 1 }} variant="contained">Create</Button>
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
