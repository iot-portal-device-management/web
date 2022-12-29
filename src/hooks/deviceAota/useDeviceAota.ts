/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { DeviceAotaFormFormikValues, DeviceAotaPayload } from '../../types/deviceAota';

export const useDeviceAota = () => {
  const submitDeviceAota = (id: string, payload: DeviceAotaPayload, { setSubmitting }: FormFormikActions<DeviceAotaFormFormikValues>) => {
    const toastId = toastHelper.loading('Submitting AOTA command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'AOTA', payload: payload };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted AOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`AOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceAota,
  };
};
