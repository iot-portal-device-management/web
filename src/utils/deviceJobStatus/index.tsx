/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Label from '../../components/Label';
import { ReactNode } from 'react';
import { DeviceJobStatus } from '../../types/deviceJobStatus';

export const getDeviceJobStatusLabel = (deviceJobStatus: DeviceJobStatus): ReactNode => {
  if (!deviceJobStatus) {
    return null;
  }

  const deviceJobStatusMap = {
    pending: {
      text: 'Pending',
      color: 'info'
    },
    processing: {
      text: 'Processing',
      color: 'primary'
    },
    successful: {
      text: 'Successful',
      color: 'success'
    },
    failed: {
      text: 'Failed',
      color: 'error'
    },
  };

  // @ts-ignore
  const { text, color }: any = deviceJobStatusMap[deviceJobStatus?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};
