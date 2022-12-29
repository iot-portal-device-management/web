/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Label from '../../components/Label';
import { ReactNode } from 'react';
import { DeviceEventType } from '../../types/deviceEventType';

export const getDeviceEventTypeLabel = (deviceEventType: DeviceEventType): ReactNode => {
  if (!deviceEventType) {
    return null;
  }

  const deviceEventTypeMap = {
    property: {
      text: 'Property',
      color: 'info'
    },
    telemetry: {
      text: 'Telemetry',
      color: 'success'
    },
  };

  // @ts-ignore
  const { text, color }: any = deviceEventTypeMap[deviceEventType?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};
