/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceCommands = (deviceId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/deviceCommands`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceCommands),
  );

  return {
    deviceCommands: data?.data,
    deviceCommandsMeta: data?.meta,
    deviceCommandsError: error,
    isDeviceCommandsLoading: !error && !data,
    isDeviceCommandsValidating: isValidating,
    mutateDeviceCommands: mutate,
  };
};
