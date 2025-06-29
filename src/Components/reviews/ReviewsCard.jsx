import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Chip,
  Button,
  Rating
} from '@mui/material'
import { 
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material'

const ReviewsCard = ({ review }) => {
  const [isReadMode, setIsReadMode] = useState(true)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase()
  }

  return (
    <Card 
      elevation={3}
      sx={{ 
        height: '100%',
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(245, 197, 24, 0.2)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Author Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              mr: 2,
              width: 48,
              height: 48,
              fontSize: '1.2rem',
              fontWeight: 600
            }}
          >
            {getInitials(review.author)}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600,
                mb: 0.5,
                color: 'text.primary'
              }}
            >
              {review.author}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(review.created_at)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Rating */}
        {review.author_details?.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={review.author_details.rating / 2} 
              precision={0.5} 
              readOnly 
              size="small"
              sx={{ 
                mr: 1,
                '& .MuiRating-iconFilled': { color: '#f5c518' },
                '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.3)' }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {review.author_details.rating}/10
            </Typography>
          </Box>
        )}

        {/* Review Content */}
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: 1.6,
            color: 'text.secondary',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: isReadMode ? 4 : 'none',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {review.content}
        </Typography>

        {/* Read More/Less Button */}
        {review.content.length > 200 && (
          <Button
            variant="text"
            size="small"
            onClick={() => setIsReadMode(!isReadMode)}
            endIcon={isReadMode ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            sx={{ 
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 600,
              p: 0,
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
            {isReadMode ? 'Read more' : 'Show less'}
          </Button>
        )}

        {/* Review Stats */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`${review.content.length} characters`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(245, 197, 24, 0.1)',
                color: '#f5c518',
                border: '1px solid rgba(245, 197, 24, 0.2)',
                fontSize: '0.7rem',
              }}
            />
            {review.updated_at !== review.created_at && (
              <Chip
                label="Updated"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: '#00ff88',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  fontSize: '0.7rem',
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReviewsCard
