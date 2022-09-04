import { Box, Divider, Grid, Typography } from '@mui/material';
import Text from '../Text';
import JSONView from '../JSONView';
import DevicesDataGrid from '../DevicesDataGrid';
import { useState } from 'react';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../types/dataGrid';
import { useDeviceGroupDevices } from '../../hooks/deviceGroup/useDeviceGroupDevices';
import { useDeviceGroup } from '../../hooks/deviceGroup/useDeviceGroup';
import { useSavedDeviceCommand } from '../../hooks/savedDeviceCommand/useSavedDeviceCommand';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface ReviewCreateDeviceJobProps {
  deviceJobName: string;
  deviceGroupId: string;
  savedDeviceCommandId: string;
}

const ReviewCreateDeviceJob = ({
                                 deviceJobName,
                                 deviceGroupId,
                                 savedDeviceCommandId
                               }: ReviewCreateDeviceJobProps) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    deviceGroup,
    isDeviceGroupLoading,
    isDeviceGroupError
  } = useDeviceGroup(deviceGroupId);

  const {
    savedDeviceCommand,
    isSavedDeviceCommandLoading,
    isSavedDeviceCommandError
  } = useSavedDeviceCommand(savedDeviceCommandId);

  const {
    deviceGroupDevices,
    deviceGroupDevicesMeta,
    isDeviceGroupDevicesLoading,
    mutateDeviceGroupDevices
  } = useDeviceGroupDevices(deviceGroupId, { ...queryOptions, page: queryOptions.page + 1 });

  return (
    <>
      <Typography sx={{ py: 2 }} variant="subtitle2">
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
              Device job:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            Device job name:
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Text color="black">
              <b>{deviceJobName}</b>
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
              Selected device group:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            Device group name:
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Text color="black">
              <b>{deviceGroup?.name}</b>
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
              Selected saved device command:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            Saved device command name:
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Text color="black">
              <b>{savedDeviceCommand?.name}</b>
            </Text>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            Device command type name:
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Text color="black">
              <b>{savedDeviceCommand?.deviceCommandTypeName}</b>
            </Text>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            Payload:
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <JSONView data={savedDeviceCommand?.payload}/>
          </Grid>
        </Grid>
      </Typography>
      <Divider/>
      <Typography sx={{ color: 'common.black', py: 2 }} variant="h5" gutterBottom>
        Devices under this device group:
      </Typography>
      <Box sx={{ width: '100%' }}>
        <DevicesDataGrid
          queryOptions={queryOptions}
          setQueryOptions={setQueryOptions}
          devices={deviceGroupDevices}
          devicesMeta={deviceGroupDevicesMeta}
          isDevicesLoading={isDeviceGroupDevicesLoading}
          mutateDevices={mutateDeviceGroupDevices}
         />
      </Box>
    </>
  );
};

export default ReviewCreateDeviceJob;
