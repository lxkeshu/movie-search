import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Skeleton,
  Container,
  Paper,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'
import AliceCarousel from 'react-alice-carousel'
import Reviews from '../reviews/Reviews'

const MovieCredits = ({ id }) => {
    const [casteDetails, setCasteDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        getCredits()
    }, [id])

    function getCredits() {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setCasteDetails(data.cast.slice(0, 20)) // Limit to first 20 cast members
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching credits:', error)
                setLoading(false)
            })
    }

    const items = casteDetails.map(cast => (
        <Box key={cast.id} sx={{ px: { xs: 0.5, sm: 1 } }}>
            <Card 
                sx={{ 
                    width: { xs: '100%', sm: '100%', md: 280, lg: 300 },
                    maxWidth: { xs: 350, sm: 400, md: 280, lg: 300 },
                    minHeight: { xs: 280, sm: 300, md: 320 },
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 25px rgba(245, 197, 24, 0.3)',
                    }
                }}
            >
                {cast.profile_path ? (
                    <CardMedia
                        component="img"
                        height={{ xs: 180, sm: 200, md: 220 }}
                        image={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                        alt={cast.name}
                        sx={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Box 
                        sx={{ 
                            height: { xs: 180, sm: 200, md: 220 }, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <PersonIcon sx={{ fontSize: { xs: 48, sm: 56, md: 64 }, color: 'text.secondary' }} />
                    </Box>
                )}
                
                <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', flex: 1 }}>
                    <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                            lineHeight: 1.3,
                            minHeight: { xs: '2.4em', sm: '2.5em', md: '2.6em' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            wordBreak: 'break-word',
                            hyphens: 'auto',
                        }}
                    >
                        {cast.name}
                    </Typography>
                    
                    <Chip
                        label={cast.character}
                        size="small"
                        sx={{ 
                            backgroundColor: 'rgba(245, 197, 24, 0.2)',
                            color: '#f5c518',
                            border: '1px solid rgba(245, 197, 24, 0.3)',
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            maxWidth: '100%',
                            height: 'auto',
                            '& .MuiChip-label': {
                                whiteSpace: 'normal',
                                textAlign: 'center',
                                lineHeight: 1.2,
                                padding: { xs: '2px 6px', sm: '3px 7px', md: '4px 8px' },
                                wordBreak: 'break-word',
                            }
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    ))

    const responsive = {
        0: { items: 1, itemsFit: 'contain' },
        480: { items: 1, itemsFit: 'contain' },
        768: { items: 2, itemsFit: 'contain' },
        1024: { items: 3, itemsFit: 'contain' },
        1200: { items: 4, itemsFit: 'contain' },
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
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                >
                    Cast & Crew
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, overflow: 'hidden', justifyContent: 'center' }}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <Skeleton 
                                key={item} 
                                variant="rectangular" 
                                width={{ xs: 350, sm: 400, md: 280, lg: 300 }} 
                                height={{ xs: 280, sm: 300, md: 320 }} 
                                sx={{ borderRadius: 2 }}
                            />
                        ))}
                    </Box>
                ) : casteDetails.length > 0 ? (
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: { xs: 2, sm: 3 },
                            background: 'rgba(26, 26, 26, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <AliceCarousel
                            disableButtonsControls={false}
                            disableDotsControls={true}
                            autoPlay={!isMobile}
                            autoPlayInterval={3000}
                            mouseTracking
                            responsive={responsive}
                            infinite
                            animationType='slide'
                            animationDuration={600}
                            animationEasingFunction='ease-in-out'
                            items={items}
                            paddingLeft={isMobile ? 16 : 24}
                            paddingRight={isMobile ? 16 : 24}
                            renderPrevButton={({ isDisabled }) => (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: { xs: 8, sm: 16 },
                                        top: 'calc(50% - 20px)',
                                        zIndex: 10,
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 },
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(245, 197, 24, 0.9)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        opacity: isDisabled ? 0.3 : 1,
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(245, 197, 24, 1)',
                                            transform: 'scale(1.1)',
                                        },
                                        '&:active': {
                                            transform: 'scale(0.95)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 0,
                                            height: 0,
                                            borderTop: '6px solid transparent',
                                            borderBottom: '6px solid transparent',
                                            borderRight: '8px solid #1a1a1a',
                                            ml: 0.5
                                        }}
                                    />
                                </Box>
                            )}
                            renderNextButton={({ isDisabled }) => (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: { xs: 8, sm: 16 },
                                        top: 'calc(50% - 20px)',
                                        zIndex: 10,
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 },
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(245, 197, 24, 0.9)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        opacity: isDisabled ? 0.3 : 1,
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(245, 197, 24, 1)',
                                            transform: 'scale(1.1)',
                                        },
                                        '&:active': {
                                            transform: 'scale(0.95)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 0,
                                            height: 0,
                                            borderTop: '6px solid transparent',
                                            borderBottom: '6px solid transparent',
                                            borderLeft: '8px solid #1a1a1a',
                                            mr: 0.5
                                        }}
                                    />
                                </Box>
                            )}
                        />
                    </Paper>
                ) : (
                    <Paper 
                        elevation={2} 
                        sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            background: 'rgba(26, 26, 26, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            No Cast Information Available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Cast details for this movie are not available at the moment.
                        </Typography>
                    </Paper>
                )}
            </Box>
            
            <Reviews id={id} />
        </Container>
    )
}

export default MovieCredits

