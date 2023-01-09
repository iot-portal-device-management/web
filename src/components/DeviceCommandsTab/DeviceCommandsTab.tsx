/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Card } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';
import { useDeviceCommands } from '../../hooks/deviceCommand/useDeviceCommands';
import DeviceCommandsDataGrid from '../DeviceCommandsDataGrid';

interface DeviceCommandsTabProps {
  deviceId: string;
}

const DeviceCommandsTab = ({ deviceId }: DeviceCommandsTabProps) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: [{ field: 'createdAt', sort: 'desc' }],
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    deviceCommands,
    deviceCommandsMeta,
    isDeviceCommandsLoading,
    mutateDeviceCommands
  } = useDeviceCommands(deviceId, {
    ...queryOptions,
    page: queryOptions.page + 1
  });

  return (
    <Card>
      <LargeCardHeader
        title="Device commands"
        subheader="Commands that you have triggered in the past"
      />
      <Box sx={{ width: '100%' }}>
        <DeviceCommandsDataGrid
          queryOptions={queryOptions}
          setQueryOptions={setQueryOptions}
          deviceCommands={deviceCommands}
          deviceCommandsMeta={deviceCommandsMeta}
          isDeviceCommandsLoading={isDeviceCommandsLoading}
          mutateDeviceCommands={mutateDeviceCommands}
        />
      </Box>
    </Card>
  );
};

export default DeviceCommandsTab;
