import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import DeviceJobDeviceCommandsDataGrid from '../DeviceJobDeviceCommandsDataGrid';
import { useDeviceJobDeviceCommands } from '../../hooks/deviceJob/useDeviceJobDeviceCommands';
import { useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';

interface DeviceJobDeviceCommandsCardProps {
  deviceJobId: string;
}

const DeviceJobDeviceCommandsCard = ({ deviceJobId }: DeviceJobDeviceCommandsCardProps) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    deviceJobDeviceCommands,
    deviceJobDeviceCommandsMeta,
    isDeviceJobDeviceCommandsLoading,
    mutateDeviceJobDeviceCommands
  } = useDeviceJobDeviceCommands(deviceJobId, { ...queryOptions, page: queryOptions.page + 1 });

  return (
    <Card>
      <CardHeader title="Device commands"/>
      <Divider/>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <DeviceJobDeviceCommandsDataGrid
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
            deviceCommands={deviceJobDeviceCommands}
            deviceCommandsMeta={deviceJobDeviceCommandsMeta}
            isDeviceCommandsLoading={isDeviceJobDeviceCommandsLoading}
            mutateDeviceCommands={mutateDeviceJobDeviceCommands}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceJobDeviceCommandsCard;
