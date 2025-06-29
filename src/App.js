import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import MovieList from './Components/Movie/MovieList';
import MovieDetail from './Pages/MovieDetail';
// import Header from './Components/Header';
// import Home from './Pages/Home';
// import MovieDetail from './Pages/MovieDetail';
// import MovieList from './Components/MovieList';

// Create a dark theme for the movie app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5c518', // IMDB yellow
    },
    secondary: {
      main: '#e50914', // Netflix red for contrast
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16, // Base font size increased
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.9rem',
    },
    overline: {
      fontSize: '0.85rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '1.1rem',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='app'>
        <Router>
          <Header />
          <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path='movie/:id' element={<MovieDetail />} />
              <Route path='movies/:type' element={<MovieList />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
