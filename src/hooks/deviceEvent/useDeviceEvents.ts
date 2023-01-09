/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceEvents = (deviceId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/deviceEvents`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceEvents),
  );

  return {
    deviceEvents: data?.data,
    deviceEventsMeta: data?.meta,
    deviceEventsError: error,
    isDeviceEventsLoading: !error && !data,
    isDeviceEventsValidating: isValidating,
    mutateDeviceEvents: mutate,
  };
};
