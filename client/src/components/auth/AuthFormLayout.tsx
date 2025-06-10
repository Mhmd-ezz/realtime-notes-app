import { Box, Paper, Typography } from '@mui/material';
import { type ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function AuthFormLayout({ title, children }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2} 
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,            
          width: '100%',
          maxWidth: 520,
          minWidth: { xs: '100%', sm: 360 },
          borderRadius: 2,  
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
}
