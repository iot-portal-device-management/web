/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { DeviceSotaFormFormikValues, DeviceSotaPayload } from '../../types/deviceSota';
import { useDeviceSota } from '../../hooks/deviceSota/useDeviceSota';
import DeviceSotaFormCard from '../DeviceSotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceSotaTabProps {
  deviceId: string;
}

const DeviceSotaTab = ({ deviceId }: DeviceSotaTabProps) => {
  const { submitDeviceSota } = useDeviceSota();

  const onSubmit = (data: DeviceSotaPayload, formFormikActions: FormFormikActions<DeviceSotaFormFormikValues>) => {
    submitDeviceSota(deviceId, data, formFormikActions);
  };

  return (
    <DeviceSotaFormCard
      onSubmit={onSubmit}
    />
  );
};

export default DeviceSotaTab;
