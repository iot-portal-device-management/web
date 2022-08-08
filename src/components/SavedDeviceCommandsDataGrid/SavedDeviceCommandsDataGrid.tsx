import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridFilterModel,
  GridRenderCellParams,
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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSavedDeviceCommandAlertDialog from '../DeleteSavedDeviceCommandAlertDialog';
import { QueryOptions } from '../../types/dataGrid';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { useSavedDeviceCommandCRUD } from '../../hooks/savedDeviceCommand/useSavedDeviceCommandCRUD';
import JsonDataGridCellExpand from '../JsonDataGridCellExpand/JsonDataGridCellExpand';

interface SavedDeviceCommandsDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  savedDeviceCommands: any;
  savedDeviceCommandsMeta: any;
  isSavedDeviceCommandsLoading: boolean;
  mutateSavedDeviceCommands: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const SavedDeviceCommandsDataGrid = ({
                                       selectionModel,
                                       setSelectionModel,
                                       queryOptions,
                                       setQueryOptions,
                                       savedDeviceCommands,
                                       savedDeviceCommandsMeta,
                                       isSavedDeviceCommandsLoading,
                                       mutateSavedDeviceCommands,
                                       hideActionsColumn = undefined
                                     }: SavedDeviceCommandsDataGridProps) => {
  const router = useRouter();

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [savedDeviceCommand, setSavedDeviceCommand] = useState<GridRowModel>(null);
  const [openDeleteSavedDeviceCommandAlertDialog, setOpenDeleteSavedDeviceCommandAlertDialog] = useState(false);

  const { deleteSavedDeviceCommands } = useSavedDeviceCommandCRUD();

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      savedDeviceCommandsMeta?.total !== undefined ? savedDeviceCommandsMeta?.total : prevTotalRowCount,
    );
  }, [savedDeviceCommandsMeta?.total]);

  const relations: string[] = [];

  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand header="Payload" width={params.colDef.computedWidth} value={params.value || ''}/>
    );
  }

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

  const confirmDeleteSavedDeviceCommand = useCallback((row: GridRowModel) =>
    () => {
      setSavedDeviceCommand(row);
      setOpenDeleteSavedDeviceCommandAlertDialog(true);
    }, []);

  const deleteDevice = useCallback(() => {
    deleteSavedDeviceCommands([savedDeviceCommand?.id], false, mutateSavedDeviceCommands);
    setOpenDeleteSavedDeviceCommandAlertDialog(false);
    setSavedDeviceCommand(null);
  }, [savedDeviceCommand?.id, mutateSavedDeviceCommands]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Saved device command ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Saved device command name', flex: 0.3, },
    { field: 'deviceCommandTypeName', type: 'string', headerName: 'Device command type', flex: 0.2, },
    {
      field: 'payload', type: 'string', headerName: 'Payload', flex: 0.4, sortable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/device/commands/saved/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          onClick={confirmDeleteSavedDeviceCommand(params.row)}
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
        loading={isSavedDeviceCommandsLoading}
        columns={columns}
        rows={(savedDeviceCommands ?? []) as GridRowsProp}
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
      <DeleteSavedDeviceCommandAlertDialog
        savedDeviceCommand={savedDeviceCommand}
        open={openDeleteSavedDeviceCommandAlertDialog}
        handleClose={() => setOpenDeleteSavedDeviceCommandAlertDialog(false)}
        handleConfirm={deleteDevice}
      />
    </>
  );
};

export default SavedDeviceCommandsDataGrid;
