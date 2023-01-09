/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceGroupDevices = (deviceGroupId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/device/groups/${deviceGroupId}/devices`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.devices),
  );

  return {
    deviceGroupDevices: data?.data,
    deviceGroupDevicesMeta: data?.meta,
    deviceGroupDevicesError: error,
    isDeviceGroupDevicesLoading: !error && !data,
    isDeviceGroupDevicesValidating: isValidating,
    mutateDeviceGroupDevices: mutate,
  };
};
