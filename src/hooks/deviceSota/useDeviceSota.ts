/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { DeviceSotaFormFormikValues, DeviceSotaPayload } from '../../types/deviceSota';

export const useDeviceSota = () => {
  const submitDeviceSota = (id: string, payload: DeviceSotaPayload, { setSubmitting }: FormFormikActions<DeviceSotaFormFormikValues>) => {
    const toastId = toastHelper.loading('Submitting SOTA command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'SOTA', payload: payload };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted SOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`SOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceSota,
  };
};
