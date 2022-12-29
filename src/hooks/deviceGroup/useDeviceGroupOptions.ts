/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface Parameters {
  name?: string;
}

export const useDeviceGroupOptions = (name: string) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: '/api/device/groups/options',
      params: { name: name }
    }, ({ url, params }) => {
      let paramsToBeSent: Parameters = {};

      // Filter out empty string or undefined parameters
      Object.keys(params).forEach(key => {
        if (params[key as keyof Parameters] !== undefined && params[key as keyof Parameters] !== '') {
          paramsToBeSent[key as keyof Parameters] = params[key as keyof Parameters];
        }
      });

      return axios
        .get(url, { params: paramsToBeSent })
        .then(res => res.data.result.deviceGroups)
    }
  );

  return {
    deviceGroupOptions: data,
    deviceGroupOptionsError: error,
    isDeviceGroupOptionsLoading: !error && !data,
    isDeviceGroupOptionsValidating: isValidating,
    mutateDeviceGroupOptions: mutate,
  };
};
