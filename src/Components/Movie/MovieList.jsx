import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  Grid, 
  Skeleton,
  Paper,
  Chip,
  Container
} from '@mui/material'
import { 
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Upcoming as UpcomingIcon
} from '@mui/icons-material'
import MovieCard from './MovieCard'

const MovieList = () => {
  const [movieList, setMovieList] = useState([])
  const [loading, setLoading] = useState(true)
  const { type } = useParams()

  useEffect(() => {
    getData()
  }, [type])

  const getData = () => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setMovieList(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching movies:', error)
        setLoading(false)
      })
  }

  const getTypeInfo = (type) => {
    switch(type) {
      case 'popular':
        return {
          title: 'Popular Movies',
          icon: <TrendingIcon />,
          color: '#f5c518',
          description: 'Most popular movies right now'
        }
      case 'top_rated':
        return {
          title: 'Top Rated Movies',
          icon: <StarIcon />,
          color: '#ffd700',
          description: 'Highest rated movies of all time'
        }
      case 'upcoming':
        return {
          title: 'Upcoming Movies',
          icon: <UpcomingIcon />,
          color: '#00ff88',
          description: 'Movies coming soon to theaters'
        }
      default:
        return {
          title: 'Popular Movies',
          icon: <TrendingIcon />,
          color: '#f5c518',
          description: 'Most popular movies right now'
        }
    }
  }

  const typeInfo = getTypeInfo(type)

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        {/* Header Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            mb: 4,
            background: `linear-gradient(135deg, ${typeInfo.color}15 0%, rgba(26, 26, 26, 0.8) 100%)`,
            border: `1px solid ${typeInfo.color}30`,
            textAlign: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ 
              color: typeInfo.color, 
              mr: 3,
              p: 1.5,
              borderRadius: '50%',
              backgroundColor: `${typeInfo.color}20`
            }}>
              {React.cloneElement(typeInfo.icon, { sx: { fontSize: 40 } })}
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${typeInfo.color}, ${typeInfo.color}dd)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '3rem'
              }}
            >
              {typeInfo.title}
            </Typography>
          </Box>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 3, fontSize: '1.5rem' }}
          >
            {typeInfo.description}
          </Typography>
          
          <Chip
            label={`${movieList.length} movies`}
            size="large"
            sx={{ 
              backgroundColor: `${typeInfo.color}20`,
              color: typeInfo.color,
              border: `1px solid ${typeInfo.color}40`,
              fontWeight: 600,
              fontSize: '1.1rem',
              height: '40px'
            }}
          />
        </Paper>

        {/* Movies Grid */}
        {loading ? (
          <Grid container spacing={3} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Skeleton 
                  variant="rectangular" 
                  height={450} 
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
            {movieList.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* No Results */}
        {!loading && movieList.length === 0 && (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
              No movies found
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Try refreshing the page or check back later
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  )
}

export default MovieList