import { Box, Card, Grid } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';
import { useCommandHistories } from '../../hooks/commandHistory/useCommandHistories';
import CommandHistoriesDataGrid from '../CommandHistoriesDataGrid';

interface DeviceCommandHistoriesTabProps {
  deviceId: string;
}

const DeviceCommandHistoriesTab = ({ deviceId }: DeviceCommandHistoriesTabProps) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    commandHistories,
    commandHistoriesMeta,
    isCommandHistoriesLoading,
    mutateCommandHistories
  } = useCommandHistories(deviceId, {
    ...queryOptions,
    page: queryOptions.page + 1
  });

  return (
    <Grid item xs={12}>
      <Card>
        <LargeCardHeader
          title="Command Histories"
          subheader="Commands that you have triggered in the past"
        />
        <Box sx={{ width: '100%' }}>
          <CommandHistoriesDataGrid
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
            commandHistories={commandHistories}
            commandHistoriesMeta={commandHistoriesMeta}
            isCommandHistoriesLoading={isCommandHistoriesLoading}
            mutateCommandHistories={mutateCommandHistories}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default DeviceCommandHistoriesTab;
