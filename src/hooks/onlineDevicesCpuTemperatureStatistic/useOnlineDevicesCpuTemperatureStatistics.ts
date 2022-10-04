import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseOnlineDevicesCpuTemperatureStatisticsParams {
  timeRange: string | number;
}

export const useOnlineDevicesCpuTemperatureStatistics = (params: UseOnlineDevicesCpuTemperatureStatisticsParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/statistics/devices/online/cpu/temperatures`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.cpuTemperatures),
  );

  return {
    onlineDevicesCpuTemperatureStatistics: data || [],
    isOnlineDevicesCpuTemperatureStatisticsLoading: !error && !data,
    isOnlineDevicesCpuTemperatureStatisticsError: error,
    isOnlineDevicesCpuTemperatureStatisticsValidating: isValidating,
    mutateOnlineDevicesCpuTemperatureStatistics: mutate
  };
};
