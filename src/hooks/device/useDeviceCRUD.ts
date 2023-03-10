/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { KeyedMutator } from 'swr/dist/types';
import { FormFormikActions } from '../../types/formik';
import { CreateDeviceFormFormikValues, EditDeviceFormFormikValues } from '../../types/device';

export interface DeviceData {
  name: string;
  deviceCategoryId: string;
}

export const useDeviceCRUD = () => {
  const router = useRouter();

  const createDevice = (data: DeviceData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<CreateDeviceFormFormikValues>) => {
    return axios
      .post('/api/devices', data)
      .then(() => {
        toastHelper.success('Device created successfully');
        router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to create device: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const updateDevice = (id: string, data: DeviceData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<EditDeviceFormFormikValues>) => {
    return axios
      .patch(`/api/devices/${id}`, data)
      .then(() => {
        toastHelper.success('Device updated successfully');
        router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to update device: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const deleteDevices = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting devices');

    return axios
      .delete('/api/devices', { data })
      .then(() => {
        mutate();
        toastHelper.success('Device deleted successfully', toastId);

        if (redirectToListing)
          router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete device: ${error.message}`, toastId);
      });
  };

  return {
    createDevice,
    updateDevice,
    deleteDevices,
  };
};
