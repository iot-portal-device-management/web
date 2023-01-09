/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseOnlineDevicesAvailableMemoryStatisticsParams {
  timeRange: string | number;
}

export const useOnlineDevicesAvailableMemoryStatistics = (params: UseOnlineDevicesAvailableMemoryStatisticsParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/statistics/devices/online/memory/availables`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.availableMemories),
  );

  return {
    onlineDevicesAvailableMemoryStatistics: data || [],
    onlineDevicesAvailableMemoryStatisticsError: error,
    isOnlineDevicesAvailableMemoryStatisticsLoading: !error && !data,
    isOnlineDevicesAvailableMemoryStatisticsValidating: isValidating,
    mutateOnlineDevicesAvailableMemoryStatistics: mutate,
  };
};
