/*
 * Copyright (C) 2021-2022 Intel Corporation
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
import { useDeviceCategoryCRUD } from '../../hooks/deviceCategory/useDeviceCategoryCRUD';
import DeleteDeviceCategoryAlertDialog from '../DeleteDeviceCategoryAlertDialog';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface DeviceCategoriesDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceCategories: any;
  deviceCategoriesMeta: any;
  isDeviceCategoriesLoading: boolean;
  mutateDeviceCategories: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const DeviceCategoriesDataGrid = ({
                                    selectionModel,
                                    setSelectionModel,
                                    queryOptions,
                                    setQueryOptions,
                                    deviceCategories,
                                    deviceCategoriesMeta,
                                    isDeviceCategoriesLoading,
                                    mutateDeviceCategories,
                                    hideActionsColumn = undefined
                                  }: DeviceCategoriesDataGridProps) => {
  const router = useRouter();

  const [deviceCategory, setDeviceCategory] = useState<GridRowModel>(null);
  const [openDeleteDeviceCategoryAlertDialog, setOpenDeleteDeviceCategoryAlertDialog] = useState(false);

  const { deleteDeviceCategories } = useDeviceCategoryCRUD();

  const confirmDeleteDeviceCategory = useCallback((row: GridRowModel) =>
    () => {
      setDeviceCategory(row);
      setOpenDeleteDeviceCategoryAlertDialog(true);
    }, []);

  const deleteDeviceCategory = useCallback(() => {
    deleteDeviceCategories([deviceCategory?.id], false, mutateDeviceCategories);
    setOpenDeleteDeviceCategoryAlertDialog(false);
    setDeviceCategory(null);
  }, [deviceCategory?.id, mutateDeviceCategories]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device category ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Device category name', flex: 0.9, },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/device/categories/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<EditTwoToneIcon/>}
          label="Edit"
          onClick={() => router.push(`/device/categories/${params.row.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          onClick={confirmDeleteDeviceCategory(params.row)}
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
        rows={deviceCategories}
        meta={deviceCategoriesMeta}
        loading={isDeviceCategoriesLoading}
      />
      {!hideActionsColumn && (
        <DeleteDeviceCategoryAlertDialog
          deviceCategory={deviceCategory}
          open={openDeleteDeviceCategoryAlertDialog}
          handleClose={() => setOpenDeleteDeviceCategoryAlertDialog(false)}
          handleConfirm={deleteDeviceCategory}
        />
      )}
    </>
  );
};

export default DeviceCategoriesDataGrid;
