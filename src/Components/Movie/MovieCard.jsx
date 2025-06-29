import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Rating, 
  Chip,
  Skeleton
} from '@mui/material'
import { Star as StarIcon, PlayArrow as PlayIcon } from '@mui/icons-material'

const MovieCard = ({ movie }) => {
  if (!movie) {
    return (
      <Card sx={{ height: 500, position: 'relative' }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    )
  }

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card 
        sx={{ 
          height: 500,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 25px rgba(245, 197, 24, 0.3)',
          },
          '&:hover .play-overlay': {
            opacity: 1,
          },
          '&:hover .card-content': {
            transform: 'translateY(-10px)',
          }
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title || movie.name}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Play overlay */}
        <Box
          className="play-overlay"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}
        >
          <PlayIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            zIndex: 1,
          }}
        />

        {/* Content overlay */}
        <CardContent
          className="card-content"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            color: 'white',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            zIndex: 3,
            background: 'transparent',
            p: 2,
            pb: 3,
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.2,
              fontSize: '1.3rem'
            }}
          >
            {movie.title || movie.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Rating 
              value={movie.vote_average / 2} 
              precision={0.5} 
              readOnly 
              size="medium"
              sx={{ 
                '& .MuiRating-iconFilled': { color: '#f5c518' },
                '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.3)' }
              }}
            />
            <Typography variant="h6" sx={{ color: '#f5c518', fontWeight: 600, fontSize: '1.1rem' }}>
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {movie.release_date && (
              <Chip
                label={movie.release_date.split('-')[0]}
                size="medium"
                sx={{ 
                  backgroundColor: 'rgba(245, 197, 24, 0.2)',
                  color: '#f5c518',
                  border: '1px solid rgba(245, 197, 24, 0.3)',
                  fontSize: '0.9rem',
                  height: '28px'
                }}
              />
            )}
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <Chip
                label={`${movie.genre_ids.length} genres`}
                size="medium"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.9rem',
                  height: '28px'
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default MovieCard