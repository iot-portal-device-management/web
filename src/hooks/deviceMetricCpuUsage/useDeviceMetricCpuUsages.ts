import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseDeviceMetricCpuUsagesParams {
  timeRange: string | number;
}

export const useDeviceMetricCpuUsages = (deviceId: string, params: UseDeviceMetricCpuUsagesParams) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/metrics/cpu/usages`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.cpuUsages),
  );

  return {
    cpuUsages: data || [],
    cpuUsagesError: error,
    isCpuUsagesLoading: !error && !data,
    isCpuUsagesValidating: isValidating,
    mutateCpuUsages: mutate,
  };
};
