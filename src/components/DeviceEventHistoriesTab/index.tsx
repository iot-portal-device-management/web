import { Box, Card, Grid } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';
import { useEventHistories } from '../../hooks/eventHistory/useEventHistories';
import EventHistoriesDataGrid from '../EventHistoriesDataGrid';

interface DeviceEventHistoriesTabProps {
  deviceId: string;
}

const DeviceEventHistoriesTab = ({ deviceId }: DeviceEventHistoriesTabProps) => {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    eventHistories,
    eventHistoriesMeta,
    isEventHistoriesLoading,
    mutateEventHistories
  } = useEventHistories(deviceId, {
    ...queryOptions,
    page: queryOptions.page + 1
  });

  return (
    <Grid item xs={12}>
      <Card>
        <LargeCardHeader
          title="Event Histories"
          subheader="List of past device events"
        />
        <Box sx={{ width: '100%' }}>
          <EventHistoriesDataGrid
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
            eventHistories={eventHistories}
            eventHistoriesMeta={eventHistoriesMeta}
            isEventHistoriesLoading={isEventHistoriesLoading}
            mutateEventHistories={mutateEventHistories}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default DeviceEventHistoriesTab;
