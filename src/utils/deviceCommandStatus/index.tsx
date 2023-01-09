/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Label from '../../components/Label';
import { ReactNode } from 'react';
import { DeviceCommandStatus } from '../../types/deviceCommandStatus';

export const getDeviceCommandStatusLabel = (deviceCommandStatus: DeviceCommandStatus): ReactNode => {
  if (!deviceCommandStatus) {
    return null;
  }

  const deviceCommandStatusMap = {
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
  const { text, color }: any = deviceCommandStatusMap[deviceCommandStatus?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};
