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
    isOnlineDevicesDiskUsageStatisticsLoading: !error && !data,
    isOnlineDevicesDiskUsageStatisticsError: error,
    isOnlineDevicesDiskUsageStatisticsValidating: isValidating,
    mutateOnlineDevicesDiskUsageStatistics: mutate
  };
};
