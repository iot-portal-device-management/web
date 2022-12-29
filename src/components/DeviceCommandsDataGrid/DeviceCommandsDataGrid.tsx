/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { KeyedMutator } from 'swr/dist/types';
import { QueryOptions } from '../../types/dataGrid';
import JsonDataGridCellExpand from '../JsonDataGridCellExpand';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface DeviceCommandsDataGridProps {
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceCommands: any;
  deviceCommandsMeta: any;
  isDeviceCommandsLoading: boolean;
  mutateDeviceCommands: KeyedMutator<any>;
}

const DeviceCommandsDataGrid = ({
                                  queryOptions,
                                  setQueryOptions,
                                  deviceCommands,
                                  deviceCommandsMeta,
                                  isDeviceCommandsLoading,
                                  mutateDeviceCommands
                                }: DeviceCommandsDataGridProps) => {
  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand header="Payload" width={params.colDef.computedWidth} value={params.value || ''}/>
    );
  }

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device command ID', hide: true, },
    {
      field: 'payload', type: 'string', headerName: 'Payload', flex: 0.4, sortable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'deviceCommandType.name', type: 'string', headerName: 'Device command type', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCommandType.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {params.value}
        </>
      ),
    },
    {
      field: 'respondedAt', type: 'dateTime', headerName: 'Responded at', flex: 0.2, filterable: false,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'createdAt', type: 'dateTime', headerName: 'Created at', flex: 0.2, filterable: false,
      valueGetter: ({ value }) => value && new Date(value),
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

export default DeviceCommandsDataGrid;
