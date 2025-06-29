import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  Rating, 
  Chip, 
  Skeleton,
  Container,
  Paper,
  Divider
} from '@mui/material'
import { 
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Language as LanguageIcon
} from '@mui/icons-material'
import MovieCredits from '../Components/credits/MovieCredits'
import ShowTrailer from '../Components/Show Trailer/ShowTrailer'

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    getData()
    window.scroll(0, 0)
  }, [id])

  function getData() {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setMovieDetail(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching movie details:', error)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Skeleton variant="rectangular" height={500} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="text" height={80} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" />
      </Container>
    )
  }

  if (!movieDetail) {
    return (
      <Container maxWidth="xl">
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h4" color="text.secondary">
            Movie not found
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box sx={{ position: 'relative', mb: 4, borderRadius: 3, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="600"
          image={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
          }}
        />

        {/* Hero content */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 5,
            color: 'white',
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontSize: { xs: '2.5rem', md: '4rem' }
            }}
          >
            {movieDetail.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating 
                value={movieDetail.vote_average / 2} 
                precision={0.5} 
                readOnly 
                size="large"
                sx={{ '& .MuiRating-iconFilled': { color: '#f5c518' } }}
              />
              <Typography variant="h4" sx={{ color: '#f5c518', fontWeight: 600, fontSize: '1.8rem' }}>
                {movieDetail.vote_average.toFixed(1)}
              </Typography>
            </Box>
            
            {movieDetail.release_date && (
              <Chip
                icon={<CalendarIcon />}
                label={movieDetail.release_date}
                size="large"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '1.1rem',
                  height: '40px'
                }}
              />
            )}
            
            {movieDetail.runtime && (
              <Chip
                icon={<TimeIcon />}
                label={`${movieDetail.runtime} min`}
                size="large"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '1.1rem',
                  height: '40px'
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Movie Info */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5,
          mb: 6,
          background: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            fontWeight: 700,
            mb: 4,
            color: 'primary.main',
            fontSize: '2.5rem'
          }}
        >
          {movieDetail.title}
        </Typography>

        {/* Overview */}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 5,
            lineHeight: 1.8,
            color: 'text.secondary',
            fontSize: '1.3rem'
          }}
        >
          {movieDetail.overview}
        </Typography>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Movie Stats */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {movieDetail.genres && (
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontSize: '1.8rem' }}>
                Genres
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {movieDetail.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="large"
                    sx={{ 
                      backgroundColor: 'rgba(245, 197, 24, 0.2)',
                      color: '#f5c518',
                      border: '1px solid rgba(245, 197, 24, 0.3)',
                      fontSize: '1.1rem',
                      height: '40px'
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}

          {movieDetail.production_companies && movieDetail.production_companies.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontSize: '1.8rem' }}>
                Production Companies
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {movieDetail.production_companies.slice(0, 5).map((company) => (
                  <Chip
                    key={company.id}
                    label={company.name}
                    size="large"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1.1rem',
                      height: '40px'
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}

          {movieDetail.spoken_languages && (
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontSize: '1.8rem' }}>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {movieDetail.spoken_languages.map((language) => (
                  <Chip
                    key={language.iso_639_1}
                    icon={<LanguageIcon />}
                    label={language.name}
                    size="large"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1.1rem',
                      height: '40px'
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Trailer and Credits */}
      <Box sx={{ mt: 8 }}>
        <ShowTrailer id={id} />
      </Box>
      
      <Box sx={{ mt: 8 }}>
        <MovieCredits id={id} />
      </Box>
    </Container>
  )
}

export default MovieDetail