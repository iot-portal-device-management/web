/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevices = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: '/api/devices', params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.devices),
  );

  return {
    devices: data?.data,
    devicesMeta: data?.meta,
    devicesError: error,
    isDevicesLoading: !error && !data,
    isDevicesValidating: isValidating,
    mutateDevices: mutate,
  };
};
