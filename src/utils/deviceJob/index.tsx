/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import moment from 'moment';

export const calculateStartTimeEndTimeDuration = (startTime: string, endTime?: string) => {
  if (startTime && endTime) {
    return moment.duration(moment(endTime).diff(moment(startTime)));
  } else if (startTime) {
    return moment.duration(moment().diff(moment(startTime)));
  }

  return moment.duration();
};
