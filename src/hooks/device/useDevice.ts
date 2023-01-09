/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevice = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(id ? `/api/devices/${id}` : null, (url) => axios.get(url).then(res => res.data.result.device));

  return {
    device: data,
    deviceError: error,
    isDeviceLoading: !error && !data,
    isDeviceValidating: isValidating,
    mutateDevice: mutate,
  };
};
