/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Label from '../../components/Label';
import { DeviceStatus } from '../../types/deviceStatus';
import { ReactNode } from 'react';

export const getDeviceStatusLabel = (deviceStatus: DeviceStatus): ReactNode => {
  if (!deviceStatus) {
    return null;
  }

  const deviceStatusMap = {
    registered: {
      text: 'Registered',
      color: 'info'
    },
    online: {
      text: 'Online',
      color: 'success'
    },
    offline: {
      text: 'Offline',
      color: 'warning'
    },
  };

  // @ts-ignore
  const { text, color }: any = deviceStatusMap[deviceStatus?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};
