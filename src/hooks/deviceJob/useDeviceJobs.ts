import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceJobs = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: '/api/device/jobs', params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceJobs),
  );

  return {
    deviceJobs: data?.data,
    deviceJobsMeta: data?.meta,
    isDeviceJobsLoading: !error && !data,
    isDeviceJobsError: error,
    isDeviceJobsValidating: isValidating,
    mutateDeviceJobs: mutate,
  };
};
