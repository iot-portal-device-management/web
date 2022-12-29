/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseDeviceMetricCpuTemperaturesParams {
  timeRange: string | number;
}

export const useDeviceMetricCpuTemperatures = (deviceId: string, params: UseDeviceMetricCpuTemperaturesParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/metrics/cpu/temperatures`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.cpuTemperatures),
  );

  return {
    cpuTemperatures: data || [],
    cpuTemperaturesError: error,
    isCpuTemperaturesLoading: !error && !data,
    isCpuTemperaturesValidating: isValidating,
    mutateCpuTemperatures: mutate,
  };
};
