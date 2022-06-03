import { toast } from 'react-hot-toast';
import * as React from 'react';
import { Alert, AlertColor, CircularProgress } from '@mui/material';

type ToastMessage = string;
type ToastId = string;

const toastHelper = {
  loading: (message: ToastMessage) => {
    return toast.custom((t) => (
      <Alert
        sx={{ maxWidth: 600 }}
        icon={<CircularProgress size="1em"/>}
        severity="info"
        color={"primary" as AlertColor}
        onClose={() => toast.dismiss(t.id)}
      >
        {message}
      </Alert>
    ));
  },
  success: (message: ToastMessage, toastId?: ToastId) => {
    return toast.custom((t) => (
      <Alert sx={{ maxWidth: 600 }} severity="success" onClose={() => toast.dismiss(t.id)}>
        {message}
      </Alert>
    ), {
      ...(toastId && { id: toastId }),
    });
  },
  error: (message: ToastMessage, toastId?: ToastId) => {
    return toast.custom((t) => (
      <Alert sx={{ maxWidth: 600 }} severity="error" onClose={() => toast.dismiss(t.id)}>
        {message}
      </Alert>
    ), {
      ...(toastId && { id: toastId }),
    });
  }
};

export default toastHelper;
