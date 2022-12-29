/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { SetSubmitting } from '../../types/formik';

export const useDeviceDecommission = () => {
  const submitDeviceDecommission = (id: string, setSubmitting: SetSubmitting) => {
    const toastId = toastHelper.loading('Submitting decommission command. Waiting for device acknowledgement...');

    const data = { deviceCommandTypeName: 'DECOMMISSION' };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted decommission command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`Decommission failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceDecommission,
  };
};
