/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { KeyedMutator } from 'swr/dist/types';
import { QueryOptions } from '../../types/dataGrid';
import { getDeviceStatusLabel } from '../../utils/deviceStatus';
import { getDeviceCommandStatusLabel } from '../../utils/deviceCommandStatus';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface DeviceJobDeviceCommandsDataGridProps {
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceCommands: any;
  deviceCommandsMeta: any;
  isDeviceCommandsLoading: boolean;
  mutateDeviceCommands: KeyedMutator<any>;
}

const DeviceJobDeviceCommandsDataGrid = ({
                                           queryOptions,
                                           setQueryOptions,
                                           deviceCommands,
                                           deviceCommandsMeta,
                                           isDeviceCommandsLoading,
                                           mutateDeviceCommands
                                         }: DeviceJobDeviceCommandsDataGridProps) => {
  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device command ID', hide: true, },
    {
      field: 'deviceCommandType.device.name', type: 'string', headerName: 'Device name', flex: 0.5,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCommandType.device.name || '',
    },
    {
      field: 'deviceCommandType.device.deviceCategory.name', type: 'string', headerName: 'Device category', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCommandType.device.deviceCategory.name || '',
    },
    {
      field: 'deviceCommandType.device.deviceStatus.name',
      type: 'string',
      headerName: 'Device status',
      flex: 0.1,
      align: 'right',
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCommandType.device.deviceStatus.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceStatusLabel(params.value)}
        </>
      ),
    },
    {
      field: 'deviceCommandStatus.name', type: 'string', headerName: 'Device command status', flex: 0.2, align: 'right',
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCommandStatus.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceCommandStatusLabel(params.value)}
        </>
      ),
    },
  ], []);

  return (
    <ServerSideDataGrid
      queryOptions={queryOptions}
      setQueryOptions={setQueryOptions}
      columns={columns}
      rows={deviceCommands}
      meta={deviceCommandsMeta}
      loading={isDeviceCommandsLoading}
    />
  );
};

export default DeviceJobDeviceCommandsDataGrid;
