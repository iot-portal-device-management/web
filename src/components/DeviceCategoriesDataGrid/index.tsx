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
import { useDeviceCategoryCRUD } from '../../hooks/deviceCategory/useDeviceCategoryCRUD';
import DeleteDeviceCategoryAlertDialog from '../DeleteDeviceCategoryAlertDialog';

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

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [deviceCategory, setDeviceCategory] = useState<GridRowModel>(null);
  const [openDeleteDeviceCategoryAlertDialog, setOpenDeleteDeviceCategoryAlertDialog] = useState(false);

  const { deleteDeviceCategories } = useDeviceCategoryCRUD();

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      deviceCategoriesMeta?.total !== undefined ? deviceCategoriesMeta?.total : prevTotalRowCount,
    );
  }, [deviceCategoriesMeta?.total]);

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
      <DataGrid
        autoHeight
        checkboxSelection
        keepNonExistentRowsSelected
        loading={isDeviceCategoriesLoading}
        columns={columns}
        rows={(deviceCategories ?? []) as GridRowsProp}
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
      <DeleteDeviceCategoryAlertDialog
        deviceCategory={deviceCategory}
        open={openDeleteDeviceCategoryAlertDialog}
        handleClose={() => setOpenDeleteDeviceCategoryAlertDialog(false)}
        handleConfirm={deleteDeviceCategory}
      />
    </>
  );
};

export default DeviceCategoriesDataGrid;
