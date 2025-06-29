import React from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Movie as MovieIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Upcoming as UpcomingIcon
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navItems = [
    { path: 'movies/popular', label: 'Popular', icon: <TrendingIcon /> },
    { path: 'movies/top_rated', label: 'Top Rated', icon: <StarIcon /> },
    { path: 'movies/upcoming', label: 'Upcoming', icon: <UpcomingIcon /> }
  ]

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MovieIcon sx={{ color: theme.palette.primary.main, fontSize: 40 }} />
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #f5c518, #ffd700)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}
              >
                Movie Search
              </Typography>
            </Box>
          </NavLink>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="text"
                  startIcon={!isMobile ? item.icon : null}
                  sx={{
                    color: 'white',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(245, 197, 24, 0.1)',
                      color: theme.palette.primary.main,
                    },
                    '&.active': {
                      backgroundColor: 'rgba(245, 197, 24, 0.2)',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                    minWidth: isMobile ? 'auto' : '140px',
                    px: isMobile ? 1 : 2,
                  }}
                >
                  {isMobile ? item.icon : item.label}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header