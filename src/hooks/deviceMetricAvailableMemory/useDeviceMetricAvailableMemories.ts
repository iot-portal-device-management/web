/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseDeviceMetricAvailableMemoriesParams {
  timeRange: string | number;
}

export const useDeviceMetricAvailableMemories = (deviceId: string, params: UseDeviceMetricAvailableMemoriesParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/metrics/memory/availables`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.availableMemories),
  );

  return {
    availableMemories: data || [],
    availableMemoriesError: error,
    isAvailableMemoriesLoading: !error && !data,
    isAvailableMemoriesValidating: isValidating,
    mutateAvailableMemories: mutate,
  };
};
