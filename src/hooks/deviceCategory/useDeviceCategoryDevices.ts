/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceCategoryDevices = (deviceCategoryId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/device/categories/${deviceCategoryId}/devices`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.devices),
  );

  return {
    deviceCategoryDevices: data?.data,
    deviceCategoryDevicesMeta: data?.meta,
    deviceCategoryDevicesError: error,
    isDeviceCategoryDevicesLoading: !error && !data,
    isDeviceCategoryDevicesValidating: isValidating,
    mutateDeviceCategoryDevices: mutate,
  };
};
