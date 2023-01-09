/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Card } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';
import { useDeviceEvents } from '../../hooks/deviceEvent/useDeviceEvents';
import DeviceEventsDataGrid from '../DeviceEventsDataGrid';

interface DeviceEventsTabProps {
  deviceId: string;
}

const DeviceEventsTab = ({ deviceId }: DeviceEventsTabProps) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: [{ field: 'createdAt', sort: 'desc' }],
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    deviceEvents,
    deviceEventsMeta,
    isDeviceEventsLoading,
    mutateDeviceEvents
  } = useDeviceEvents(deviceId, {
    ...queryOptions,
    page: queryOptions.page + 1
  });

  return (
    <Card>
      <LargeCardHeader
        title="Device events"
        subheader="List of past device events"
      />
      <Box sx={{ width: '100%' }}>
        <DeviceEventsDataGrid
          queryOptions={queryOptions}
          setQueryOptions={setQueryOptions}
          deviceEvents={deviceEvents}
          deviceEventsMeta={deviceEventsMeta}
          isDeviceEventsLoading={isDeviceEventsLoading}
          mutateDeviceEvents={mutateDeviceEvents}
        />
      </Box>
    </Card>
  );
};

export default DeviceEventsTab;
