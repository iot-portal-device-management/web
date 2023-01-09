/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

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
    deviceJobsError: error,
    isDeviceJobsLoading: !error && !data,
    isDeviceJobsValidating: isValidating,
    mutateDeviceJobs: mutate,
  };
};
