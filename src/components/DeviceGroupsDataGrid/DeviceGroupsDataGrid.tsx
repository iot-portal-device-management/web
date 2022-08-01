import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridFilterModel,
  GridRowModel,
  GridRowParams,
  GridRowsProp,
  GridSelectionModel,
  GridSortModel,
  GridToolbar
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { QueryOptions } from '../../types/dataGrid';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { useDeviceGroupCRUD } from '../../hooks/deviceGroup/useDeviceGroupCRUD';
import DeleteDeviceGroupAlertDialog from '../DeleteDeviceGroupAlertDialog';

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

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [deviceGroup, setDeviceGroup] = useState<GridRowModel>(null);
  const [openDeleteDeviceGroupAlertDialog, setOpenDeleteDeviceGroupAlertDialog] = useState(false);

  const { deleteDeviceGroups } = useDeviceGroupCRUD();

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      deviceGroupsMeta?.total !== undefined ? deviceGroupsMeta?.total : prevTotalRowCount,
    );
  }, [deviceGroupsMeta?.total]);

  const relations: string[] = [];

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    const sortModelFieldMapper = (sortModel: GridSortModel) => sortModel.map(sortField => {
      return relations.includes(sortField.field)
        ? ({ ...sortField, field: `${sortField.field}.name` })
        : sortField;
    });

    setQueryOptions({ ...queryOptions, sortModel: sortModelFieldMapper(sortModel) });
  }, [relations, queryOptions]);

  const handleFilterModelChange = useCallback((filterModel: GridFilterModel) => {
    const filterModelItemMapper = (items: GridFilterItem[]) => items.map(item => {
      return relations.includes(item.columnField)
        ? ({ ...item, columnField: `${item.columnField}.name` })
        : item;
    });

    setQueryOptions({
      ...queryOptions,
      filterModel: { ...filterModel, items: filterModelItemMapper(filterModel.items) }
    });
  }, [relations, queryOptions]);

  const handleSelectionModelChange = useCallback((selectionModel: GridSelectionModel) => {
    setSelectionModel(selectionModel);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setQueryOptions({ ...queryOptions, page: page });
  }, [queryOptions]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setQueryOptions({ ...queryOptions, pageSize: pageSize });
  }, [queryOptions]);

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
      <DataGrid
        autoHeight
        checkboxSelection
        keepNonExistentRowsSelected
        loading={isDeviceGroupsLoading}
        columns={columns}
        rows={(deviceGroups ?? []) as GridRowsProp}
        rowCount={totalRowCount}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        filterMode="server"
        onFilterModelChange={handleFilterModelChange}
        rowsPerPageOptions={[25, 50, 100]}
        pagination
        paginationMode="server"
        page={queryOptions.page}
        pageSize={queryOptions.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
      <DeleteDeviceGroupAlertDialog
        deviceGroup={deviceGroup}
        open={openDeleteDeviceGroupAlertDialog}
        handleClose={() => setOpenDeleteDeviceGroupAlertDialog(false)}
        handleConfirm={deleteDeviceGroup}
      />
    </>
  );
};

export default DeviceGroupsDataGrid;
