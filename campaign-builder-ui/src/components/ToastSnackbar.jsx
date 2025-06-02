import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastSnackbar = ({ toast, setToast }) => {
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={4000}
      onClose={() => setToast({ ...toast, open: false })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
        sx={{ width: '100%' }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastSnackbar;
