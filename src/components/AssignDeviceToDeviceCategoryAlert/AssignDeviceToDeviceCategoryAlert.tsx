/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Alert } from '@mui/material';

declare module "@mui/material/Alert" {
  export interface AlertPropsColorOverrides {
    primary: true;
  }
}

const AssignDeviceToDeviceCategoryAlert = () => {
  return (
    <Alert
      sx={{ mb: 1 }}
      severity="error"
      color="primary"
    >
      Assign devices to this device category by selecting them below.
    </Alert>
  );
};

export default AssignDeviceToDeviceCategoryAlert;
