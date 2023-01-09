/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { SetSubmitting } from '../../types/formik';

export const useDeviceReboot = () => {
  const submitDeviceReboot = (id: string, setSubmitting: SetSubmitting) => {
    const toastId = toastHelper.loading('Submitting reboot command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'REBOOT' };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted reboot command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`Reboot failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceReboot,
  };
};
