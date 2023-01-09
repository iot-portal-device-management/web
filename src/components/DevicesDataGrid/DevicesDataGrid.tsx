/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import {
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
  GridSelectionModel,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConnectDeviceDialog from '../ConnectDeviceDialog';
import { useDeviceCRUD } from '../../hooks/device/useDeviceCRUD';
import { QueryOptions } from '../../types/dataGrid';
import { getDeviceStatusLabel } from '../../utils/deviceStatus';
import ServerSideDataGrid from '../ServerSideDataGrid';
import DeleteDeviceAlertDialog from '../DeleteDeviceAlertDialog';

interface DevicesDataGridProps {
  selectionModel?: GridSelectionModel;
  setSelectionModel?: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  devices: any;
  devicesMeta: any;
  isDevicesLoading: boolean;
  mutateDevices: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const DevicesDataGrid = ({
                           selectionModel,
                           setSelectionModel,
                           queryOptions,
                           setQueryOptions,
                           devices,
                           devicesMeta,
                           isDevicesLoading,
                           mutateDevices,
                           hideActionsColumn = undefined,
                           ...rest
                         }: DevicesDataGridProps) => {
  const router = useRouter();

  const [device, setDevice] = useState<GridRowModel>(null);
  const [openConnectDeviceAlertDialog, setOpenConnectDeviceAlertDialog] = useState(false);
  const [openDeleteDeviceAlertDialog, setOpenDeleteDeviceAlertDialog] = useState(false);

  const { deleteDevices } = useDeviceCRUD();

  const handleClickConnectDevice = useCallback((row: GridRowModel) =>
    () => {
      setDevice(row);
      setOpenConnectDeviceAlertDialog(true);
    }, []);

  const confirmDeleteDevice = useCallback((row: GridRowModel) =>
    () => {
      setDevice(row);
      setOpenDeleteDeviceAlertDialog(true);
    }, []);

  const deleteDevice = useCallback(() => {
    deleteDevices([device?.id], false, mutateDevices);
    setOpenDeleteDeviceAlertDialog(false);
    setDevice(null);
  }, [device?.id, mutateDevices]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Device name', flex: 0.3, },
    { field: 'biosVendor', type: 'string', headerName: 'BIOS vendor', flex: 0.2, },
    { field: 'biosVersion', type: 'string', headerName: 'BIOS version', flex: 0.1, },
    {
      field: 'deviceCategory.name', headerName: 'Device category', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceCategory.name || '',
    },
    {
      field: 'deviceStatus.name', headerName: 'Device status', flex: 0.1, align: 'right',
      valueGetter: (params: GridValueGetterParams) => params.row.deviceStatus.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceStatusLabel(params.value)}
        </>
      )
    },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<VpnKeyTwoToneIcon/>}
          label="Connect"
          onClick={handleClickConnectDevice(params.row)}
        />,
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/devices/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<EditTwoToneIcon/>}
          label="Edit"
          showInMenu
          onClick={() => router.push(`/devices/${params.row.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          showInMenu
          onClick={confirmDeleteDevice(params.row)}
        />
      ]
    }
  ], [hideActionsColumn]);

  return (
    <>
      <ServerSideDataGrid
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
        columns={columns}
        rows={devices}
        meta={devicesMeta}
        loading={isDevicesLoading}
        {...rest}
      />
      {!hideActionsColumn && (
        <>
          <ConnectDeviceDialog
            deviceId={device?.id}
            open={openConnectDeviceAlertDialog}
            handleClose={() => setOpenConnectDeviceAlertDialog(false)}
          />
          <DeleteDeviceAlertDialog
            device={device}
            open={openDeleteDeviceAlertDialog}
            handleClose={() => setOpenDeleteDeviceAlertDialog(false)}
            handleConfirm={deleteDevice}
          />
        </>
      )}
    </>
  );
};

export default DevicesDataGrid;
