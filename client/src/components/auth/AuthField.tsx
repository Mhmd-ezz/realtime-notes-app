import { TextField } from '@mui/material';

interface AuthFieldProps {
  label: string;
  error?: string;
  type?: string;
  register: Record<string, unknown>; 
}

export default function AuthField({ label, error, type = 'text', register }: AuthFieldProps) {
  return (
    <TextField
      {...register}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      error={!!error}
      helperText={error}
    />
  );
}

