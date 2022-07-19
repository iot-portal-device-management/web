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
  GridToolbar,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConnectDeviceDialog from '../ConnectDeviceDialog';
import DeleteDeviceAlertDialog from '../DeleteDeviceAlertDialog';
import { useDeviceCRUD } from '../../hooks/device/useDeviceCRUD';
import { QueryOptions } from '../../types/dataGrid';
import { getDeviceStatusLabel } from '../../utils/deviceStatus';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';

interface DevicesDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  devices: any;
  devicesMeta: any;
  isDevicesLoading: boolean;
  mutateDevices: KeyedMutator<any>;
}

const DevicesDataGrid = ({
                           selectionModel,
                           setSelectionModel,
                           queryOptions,
                           setQueryOptions,
                           devices,
                           devicesMeta,
                           isDevicesLoading,
                           mutateDevices
                         }: DevicesDataGridProps) => {
  const router = useRouter();

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [device, setDevice] = useState<GridRowModel>(null);
  const [openConnectDeviceAlertDialog, setOpenConnectDeviceAlertDialog] = useState(false);
  const [openDeleteDeviceAlertDialog, setOpenDeleteDeviceAlertDialog] = useState(false);

  const { deleteDevices } = useDeviceCRUD();

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      devicesMeta?.total !== undefined ? devicesMeta?.total : prevTotalRowCount,
    );
  }, [devicesMeta?.total]);

  const relations = ['deviceCategory', 'deviceStatus'];

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
    { field: 'id', hide: true },
    { field: 'name', type: 'string', headerName: 'Device name', width: 350 },
    { field: 'biosVendor', type: 'string', headerName: 'BIOS vendor', width: 200 },
    { field: 'biosVersion', type: 'string', headerName: 'BIOS version', width: 150 },
    {
      field: 'deviceCategory', headerName: 'Device category', width: 150,
      valueFormatter: (params: GridValueFormatterParams) => params.value.name
    },
    {
      field: 'deviceStatus', headerName: 'Device status', width: 150, align: 'right',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceStatusLabel(params.value.name)}
        </>
      )
    },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1,
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
  ], [getDeviceStatusLabel, handleClickConnectDevice, confirmDeleteDevice]);

  return (
    <>
      <DataGrid
        autoHeight
        checkboxSelection
        keepNonExistentRowsSelected
        loading={isDevicesLoading}
        columns={columns}
        rows={(devices ?? []) as GridRowsProp}
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
      <ConnectDeviceDialog
        device={device}
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
  );
};

export default DevicesDataGrid;
