import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseOnlineDevicesCpuUsageStatisticsParams {
  timeRange: string | number;
}

export const useOnlineDevicesCpuUsageStatistics = (params: UseOnlineDevicesCpuUsageStatisticsParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/statistics/devices/online/cpu/usages`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.cpuUsages),
  );

  return {
    onlineDevicesCpuUsageStatistics: data || [],
    isOnlineDevicesCpuUsageStatisticsLoading: !error && !data,
    isOnlineDevicesCpuUsageStatisticsError: error,
    isOnlineDevicesCpuUsageStatisticsValidating: isValidating,
    mutateOnlineDevicesCpuUsageStatistics: mutate
  };
};
