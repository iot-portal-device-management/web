/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { GridActionsCellItem, GridColumns, GridRowModel, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { QueryOptions } from '../../types/dataGrid';
import { useDeviceGroupCRUD } from '../../hooks/deviceGroup/useDeviceGroupCRUD';
import DeleteDeviceGroupAlertDialog from '../DeleteDeviceGroupAlertDialog';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface DeviceGroupsDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceGroups: any;
  deviceGroupsMeta: any;
  isDeviceGroupsLoading: boolean;
  mutateDeviceGroups: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const DeviceGroupsDataGrid = ({
                                selectionModel,
                                setSelectionModel,
                                queryOptions,
                                setQueryOptions,
                                deviceGroups,
                                deviceGroupsMeta,
                                isDeviceGroupsLoading,
                                mutateDeviceGroups,
                                hideActionsColumn = undefined
                              }: DeviceGroupsDataGridProps) => {
  const router = useRouter();

  const [deviceGroup, setDeviceGroup] = useState<GridRowModel>(null);
  const [openDeleteDeviceGroupAlertDialog, setOpenDeleteDeviceGroupAlertDialog] = useState(false);

  const { deleteDeviceGroups } = useDeviceGroupCRUD();

  const confirmDeleteDeviceGroup = useCallback((row: GridRowModel) =>
    () => {
      setDeviceGroup(row);
      setOpenDeleteDeviceGroupAlertDialog(true);
    }, []);

  const deleteDeviceGroup = useCallback(() => {
    deleteDeviceGroups([deviceGroup?.id], false, mutateDeviceGroups);
    setOpenDeleteDeviceGroupAlertDialog(false);
    setDeviceGroup(null);
  }, [deviceGroup?.id, mutateDeviceGroups]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device group ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Device group name', flex: 0.9, },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/device/groups/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<EditTwoToneIcon/>}
          label="Edit"
          onClick={() => router.push(`/device/groups/${params.row.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          onClick={confirmDeleteDeviceGroup(params.row)}
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
        rows={deviceGroups}
        meta={deviceGroupsMeta}
        loading={isDeviceGroupsLoading}
      />
      {!hideActionsColumn && (
        <DeleteDeviceGroupAlertDialog
          deviceGroup={deviceGroup}
          open={openDeleteDeviceGroupAlertDialog}
          handleClose={() => setOpenDeleteDeviceGroupAlertDialog(false)}
          handleConfirm={deleteDeviceGroup}
        />
      )}
    </>
  );
};

export default DeviceGroupsDataGrid;
