/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { KeyedMutator } from 'swr/dist/types';
import { QueryOptions } from '../../types/dataGrid';
import JsonDataGridCellExpand from '../JsonDataGridCellExpand';
import { getDeviceEventTypeLabel } from '../../utils/deviceEventType';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface DeviceEventsDataGridProps {
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceEvents: any;
  deviceEventsMeta: any;
  isDeviceEventsLoading: boolean;
  mutateDeviceEvents: KeyedMutator<any>;
}

const DeviceEventsDataGrid = ({
                                queryOptions,
                                setQueryOptions,
                                deviceEvents,
                                deviceEventsMeta,
                                isDeviceEventsLoading,
                                mutateDeviceEvents
                              }: DeviceEventsDataGridProps) => {
  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand header="Raw data" width={params.colDef.computedWidth} value={params.value || ''}/>
    );
  }

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device event ID', hide: true, },
    {
      field: 'rawData', type: 'string', headerName: 'Raw data', flex: 0.7, sortable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'deviceEventType.name', type: 'string', headerName: 'Device event type', flex: 0.1, align: 'right',
      valueGetter: (params: GridValueGetterParams) => params.row.deviceEventType.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceEventTypeLabel(params.value)}
        </>
      ),
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
      rows={deviceEvents}
      meta={deviceEventsMeta}
      loading={isDeviceEventsLoading}
    />
  );
};

export default DeviceEventsDataGrid;
