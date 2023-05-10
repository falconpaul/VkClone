import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const SimpleLayout: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box
        bgcolor="#4b75a5"
        py={2}
        color="white"
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ userSelect: 'none' }}>
              Моя соц. сеть
            </Box>
            <Box>
              <Link to="/">Войти</Link>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{
        paddingTop: '15px',
        paddingBottom: '15px'
      }}>
        <Outlet />
      </Container>
    </>
  );
}

export default SimpleLayout
