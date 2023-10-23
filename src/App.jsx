import Search from './components/Search';
import { Box, Container, Typography } from '@mui/material';

function App() {

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{mt:2}}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom>
            Weather App
        </Typography>
        <Box
          sx={{display: "grid", gap: 2}}
        >
        <Search/>
        </Box>
      </Container>
    </>
  )
}

export default App
