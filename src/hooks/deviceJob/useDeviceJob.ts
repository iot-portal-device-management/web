import useSWR from 'swr';
import axios from '../../libs/axios';
import { useRef } from 'react';

export const useDeviceJob = (id: string) => {
  const pollRef = useRef(true);

  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(
    id ? `/api/device/jobs/${id}` : null,
    (url) => axios.get(url).then(res => res.data.result.deviceJob),
    pollRef.current ? { refreshInterval: 5000 } : undefined,
  );

  if (data?.completedAt) {
    pollRef.current = false;
  }

  return {
    deviceJob: data,
    isDeviceJobLoading: !error && !data,
    isDeviceJobError: error,
    isDeviceJobValidating: isValidating,
    mutateDeviceJob: mutate,
  };
};
