/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { MouseEvent, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import OverviewListColumn from '../OverviewListColumn';
import OverviewListRow from '../OverviewListRow';

const DashboardOverview = () => {
  const [tabs, setTab] = useState<string | null>('overview_list_row');

  const handleViewOrientation = (
    event: MouseEvent<HTMLElement>,
    newOrientation: string | null
  ) => {
    if (newOrientation !== null) {
      setTab(newOrientation);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Overview</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="overview_list_column">
            <ViewWeekTwoToneIcon/>
          </ToggleButton>
          <ToggleButton disableRipple value="overview_list_row">
            <TableRowsTwoToneIcon/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {tabs === 'overview_list_column' && <OverviewListColumn/>}
      {tabs === 'overview_list_row' && <OverviewListRow/>}
    </>
  );
};

export default DashboardOverview;
