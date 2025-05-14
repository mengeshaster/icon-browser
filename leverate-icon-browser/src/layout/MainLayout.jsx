import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

export default function MainLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Icon Browser</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
