import useSWR from 'swr';
import axios from '../../libs/axios';
import { useRef } from 'react';

export const useDeviceJobProgressStatus = (id: string) => {
  const pollRef = useRef(true);

  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(
    id ? `/api/device/jobs/${id}/progressStatus` : null,
    (url) => axios.get(url).then(res => res.data.result.progressStatus),
    pollRef.current ? { refreshInterval: 3000 } : undefined,
  );

  if (data?.progress >= 100) {
    pollRef.current = false;
  }

  return {
    deviceJobProgressStatus: data,
    isDeviceJobProgressStatusLoading: !error && !data,
    isDeviceJobProgressStatusError: error,
    isDeviceJobProgressStatusValidating: isValidating,
    mutateDeviceJobProgressStatus: mutate,
  };
};
