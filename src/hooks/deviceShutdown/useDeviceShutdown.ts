/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { SetSubmitting } from '../../types/formik';

export const useDeviceShutdown = () => {
  const submitDeviceShutdown = (id: string, setSubmitting: SetSubmitting) => {
    const toastId = toastHelper.loading('Submitting shutdown command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'SHUTDOWN' };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted shutdown command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`Shutdown failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceShutdown,
  };
};
