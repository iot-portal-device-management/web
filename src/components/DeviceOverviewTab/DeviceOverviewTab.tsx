/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Fragment } from 'react';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Text from '../Text';
import LargeCardHeader from '../LargeCardHeader';

interface DeviceOverviewTabProps {
  device: any;
}

const DeviceOverviewTab = ({ device }: DeviceOverviewTabProps) => {
  const deviceInformationList = [
    { label: 'BIOS release date', property: 'biosReleaseDate' },
    { label: 'BIOS vendor', property: 'biosVendor' },
    { label: 'BIOS version', property: 'biosVersion' },
    { label: 'CPU', property: 'cpu' },
    { label: 'Disk information', property: 'diskInformation' },
    { label: 'OS information', property: 'osInformation' },
    { label: 'System manufacturer', property: 'systemManufacturer' },
    { label: 'System product name', property: 'systemProductName' },
    { label: 'Total memory', property: 'totalMemory' },
  ];

  return (
    <Card>
      <LargeCardHeader
        title="Device overview"
        subheader="Summary of device information"
      />
      <Divider/>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            {deviceInformationList.map((deviceInformation) => ((
              <Fragment key={deviceInformation.property}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    {deviceInformation.label}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{device?.[deviceInformation.property]}</b>
                  </Text>
                </Grid>
              </Fragment>
            )))}
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeviceOverviewTab;
