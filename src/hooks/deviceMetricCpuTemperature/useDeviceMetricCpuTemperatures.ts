import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseDeviceMetricCpuTemperaturesParams {
  timeRange: string | number;
}

export const useDeviceMetricCpuTemperatures = (deviceId: string, params: UseDeviceMetricCpuTemperaturesParams) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/devices/${deviceId}/metrics/cpu/temperatures`,
      params
    }, ({ url, params }) =>
      axios
        .get(url, { params })
        .then(res => res.data.result.cpuTemperatures)
  );

  return {
    cpuTemperatures: data || [],
    isCpuTemperaturesLoading: !error && !data,
    isCpuTemperaturesError: error,
    isCpuTemperaturesValidating: isValidating,
    mutateCpuTemperatures: mutate
  };
};
