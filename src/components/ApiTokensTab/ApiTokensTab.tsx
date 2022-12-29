/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ShowApiKeyDialog from '../ShowApiKeyDialog';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const ApiTokensTab = () => {
  const [apiKeyLabel, setApiKeyLabel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [openShowApiKeyDialog, setOpenShowApiKeyDialog] = useState(false);

  const { user } = useAuth({
    middleware: 'auth',
  });

  const handleClickViewApiKey = (label: string, apiKey: string) =>
    () => {
      setApiKeyLabel(label);
      setApiKey(apiKey);
      setOpenShowApiKeyDialog(true);
    };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">API Keys</Typography>
            <Typography variant="subtitle2">
              Manage your API keys
            </Typography>
          </Box>
          <Card>
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <VpnKeyTwoToneIcon/>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Unique ID"
                  secondary="Unique ID for your account"
                />
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  onClick={handleClickViewApiKey('Unique ID', user?.id)}
                >
                  View
                </Button>
              </ListItem>
              <Divider component="li"/>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <VpnKeyTwoToneIcon/>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Device connection key"
                  secondary="Device connection key for your account"
                />
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  onClick={handleClickViewApiKey('Device connection key', user?.deviceConnectionKey)}
                >
                  View
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <ShowApiKeyDialog
        label={apiKeyLabel}
        apiKey={apiKey}
        open={openShowApiKeyDialog}
        handleClose={() => setOpenShowApiKeyDialog(false)}
      />
    </>
  );
};

export default ApiTokensTab;
