import React from 'react'
import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Rating, 
  Chip,
  Skeleton,
  Container
} from '@mui/material'
import { Star as StarIcon, PlayArrow as PlayIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import Search from '../Components/Search/Search'

const Home = () => {
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scroll(0, 0)
    fetchData()
  }, [])

  function fetchData() {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setPopular(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }

  const items = popular.map(movie => (
    <Box key={movie.id} sx={{ px: 1 }}>
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
            '&:hover .play-overlay': {
              opacity: 1,
            },
            '&:hover .card-content': {
              transform: 'translateY(0)',
            }
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
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
            <PlayIcon sx={{ fontSize: 80, color: 'white' }} />
          </Box>

          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
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
              transform: 'translateY(20px)',
              transition: 'transform 0.3s ease',
              zIndex: 3,
              background: 'transparent',
              p: 3,
              pb: 4,
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: '1.8rem',
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {movie.original_title || movie.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating 
                value={movie.vote_average / 2} 
                precision={0.5} 
                readOnly 
                size="large"
                sx={{ '& .MuiRating-iconFilled': { color: '#f5c518' } }}
              />
              <Typography variant="h6" sx={{ color: '#f5c518', fontWeight: 600, fontSize: '1.2rem' }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>

            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
                fontSize: '1rem',
                mb: 2,
                minHeight: '2.8em'
              }}
            >
              {movie.overview}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={movie.release_date?.split('-')[0] || 'N/A'}
                size="medium"
                sx={{ 
                  backgroundColor: 'rgba(245, 197, 24, 0.2)',
                  color: '#f5c518',
                  border: '1px solid rgba(245, 197, 24, 0.3)',
                  fontSize: '1rem',
                  height: '32px'
                }}
              />
              {movie.genre_ids && movie.genre_ids.length > 0 && (
                <Chip
                  label={`${movie.genre_ids.length} genres`}
                  size="medium"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '1rem',
                    height: '32px'
                  }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  ))

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    960: { items: 3 },
    1200: { items: 4 },
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 3,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #f5c518, #ffd700)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '3rem'
          }}
        >
          Popular Movies
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
            {[1, 2, 3, 4].map((item) => (
              <Skeleton 
                key={item} 
                variant="rectangular" 
                width={350} 
                height={500} 
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        ) : (
          <AliceCarousel
            responsive={responsive}
            disableButtonsControls
            disableDotsControls
            autoPlay={true}
            autoPlayInterval={4000}
            mouseTracking
            infinite
            items={items}
            animationDuration={800}
            animationType="fadeout"
          />
        )}
      </Box>
      
      <Search />
    </Container>
  )
}

export default Home
