/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { DeviceCotaFormFormikValues, DeviceCotaPayload } from '../../types/deviceCota';
import { useDeviceCota } from '../../hooks/deviceCota/useDeviceCota';
import DeviceCotaFormCard from '../DeviceCotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceCotaTabProps {
  deviceId: string;
}

const DeviceCotaTab = ({ deviceId }: DeviceCotaTabProps) => {
  const { submitDeviceCota } = useDeviceCota();

  const onSubmit = (data: DeviceCotaPayload, formFormikActions: FormFormikActions<DeviceCotaFormFormikValues>) => {
    submitDeviceCota(deviceId, data, formFormikActions);
  };

  return (
    <DeviceCotaFormCard
      onSubmit={onSubmit}
    />
  );
};

export default DeviceCotaTab;
