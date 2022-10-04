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
    isOnlineDevicesAvailableMemoryStatisticsLoading: !error && !data,
    isOnlineDevicesAvailableMemoryStatisticsError: error,
    isOnlineDevicesAvailableMemoryStatisticsValidating: isValidating,
    mutateOnlineDevicesAvailableMemoryStatistics: mutate
  };
};
