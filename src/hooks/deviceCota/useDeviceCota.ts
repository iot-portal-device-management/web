/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { DeviceCotaFormFormikValues, DeviceCotaPayload } from '../../types/deviceCota';

export const useDeviceCota = () => {
  const submitDeviceCota = (id: string, payload: DeviceCotaPayload, { setSubmitting }: FormFormikActions<DeviceCotaFormFormikValues>) => {
    const toastId = toastHelper.loading('Submitting COTA command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'COTA', payload: payload };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted COTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`COTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceCota,
  };
};
