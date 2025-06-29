import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Typography, 
  Grid, 
  Skeleton,
  Container,
  Paper,
  Divider
} from '@mui/material'
import { RateReview as ReviewIcon } from '@mui/icons-material'
import ReviewsCard from './ReviewsCard'

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCredits()
  }, [id])

  function getCredits() {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching reviews:', error)
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            mb: 4,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #f5c518, #ffd700)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Movie Reviews
        </Typography>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3,
                    background: 'rgba(26, 26, 26, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                  <Skeleton variant="text" sx={{ mb: 1 }} />
                  <Skeleton variant="text" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" />
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : reviews.length <= 0 ? (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <ReviewIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No Reviews Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Be the first to share your thoughts about this movie!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reviews will appear here once they become available.
            </Typography>
          </Paper>
        ) : (
          <>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''} Available
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            </Box>
            
            <Grid container spacing={3}>
              {reviews.map(review => (
                <Grid item xs={12} md={6} lg={4} key={review.id}>
                  <ReviewsCard review={review} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  )
}

export default Reviews
