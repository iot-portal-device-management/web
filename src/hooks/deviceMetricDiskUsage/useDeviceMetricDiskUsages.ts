import useSWR from 'swr';
import axios from '../../libs/axios';

interface UseDeviceMetricDiskUsagesParams {
  timeRange: string | number;
}

export const useDeviceMetricDiskUsages = (deviceId: string, params: UseDeviceMetricDiskUsagesParams) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/devices/${deviceId}/metrics/disk/usages`,
      params
    }, ({ url, params }) =>
      axios
        .get(url, { params })
        .then(res => res.data.result.diskUsages)
  );

  return {
    diskUsages: data || [],
    isDiskUsagesLoading: !error && !data,
    isDiskUsagesError: error,
    isDiskUsagesValidating: isValidating,
    mutateDiskUsages: mutate
  };
};
