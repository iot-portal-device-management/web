/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseOnlineDevicesDiskUsageStatisticsParams {
  timeRange: string | number;
}

export const useOnlineDevicesDiskUsageStatistics = (params: UseOnlineDevicesDiskUsageStatisticsParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/statistics/devices/online/disk/usages`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.diskUsages),
  );

  return {
    onlineDevicesDiskUsageStatistics: data || [],
    onlineDevicesDiskUsageStatisticsError: error,
    isOnlineDevicesDiskUsageStatisticsLoading: !error && !data,
    isOnlineDevicesDiskUsageStatisticsValidating: isValidating,
    mutateOnlineDevicesDiskUsageStatistics: mutate,
  };
};
