import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function NoteSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="text" width="70%" height={30} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="85%" height={20} />
        </Stack>
      </CardContent>
    </Card>
  );
}
