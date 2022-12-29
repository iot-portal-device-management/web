/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { KeyedMutator } from 'swr/dist/types';
import { FormFormikActions } from '../../types/formik';
import { CreateDeviceCategoryFormFormikValues, EditDeviceCategoryFormFormikValues } from '../../types/deviceCategory';

export interface DeviceCategoryData {
  name: string;
  deviceIds?: string[];
}

export const useDeviceCategoryCRUD = () => {
  const router = useRouter();

  const createDeviceCategory = (data: DeviceCategoryData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<CreateDeviceCategoryFormFormikValues>) => {
    return axios
      .post('/api/device/categories', data)
      .then(() => {
        toastHelper.success('Device category created successfully');
        router.push('/device/categories');
      })
      .catch(error => {
        toastHelper.error(`Failed to create device category: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const updateDeviceCategory = (id: string, data: DeviceCategoryData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<EditDeviceCategoryFormFormikValues>) => {
    return axios
      .patch(`/api/device/categories/${id}`, data)
      .then(() => {
        toastHelper.success('Device category updated successfully');
        router.push('/device/categories');
      })
      .catch(error => {
        toastHelper.error(`Failed to update device category: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const deleteDeviceCategories = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting device categories');

    return axios
      .delete('/api/device/categories', { data })
      .then(() => {
        mutate();
        toastHelper.success('Device categories deleted successfully', toastId);

        if (redirectToListing)
          router.push('/device/categories');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete device categories: ${error.message}`, toastId);
      });
  };

  return {
    createDeviceCategory,
    updateDeviceCategory,
    deleteDeviceCategories,
  };
};
