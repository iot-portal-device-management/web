/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';
import { useDeviceJobProgressStatus } from './useDeviceJobProgressStatus';

export const useDeviceJobDeviceCommands = (deviceJobId: string, params: any) => {
  const {
    deviceJobProgressStatus,
    deviceJobProgressStatusError,
    isDeviceJobProgressStatusLoading
  } = useDeviceJobProgressStatus(deviceJobId);

  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/device/jobs/${deviceJobId}/deviceCommands`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceCommands),
    deviceJobProgressStatus?.progress < 100 ? { refreshInterval: 5000 } : undefined,
  );

  return {
    deviceJobDeviceCommands: data?.data,
    deviceJobDeviceCommandsMeta: data?.meta,
    deviceJobDeviceCommandsError: error,
    isDeviceJobDeviceCommandsLoading: !error && !data,
    isDeviceJobDeviceCommandsValidating: isValidating,
    mutateDeviceJobDeviceCommands: mutate,
  };
};
