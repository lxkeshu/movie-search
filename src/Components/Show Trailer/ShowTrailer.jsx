import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { 
  Box, 
  Typography, 
  Paper, 
  Skeleton,
  Container,
  Alert
} from '@mui/material'
import { PlayArrow as PlayIcon } from '@mui/icons-material'

const ShowTrailer = ({ id }) => {
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        getVideo()
    }, [id])

    function getVideo() {
        setLoading(true)
        setError(false)
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US`)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(video => 
                    video.type === 'Trailer' && video.site === 'YouTube'
                ) || data.results[0]
                setVideo(trailer?.key || null)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching video:', error)
                setError(true)
                setLoading(false)
            })
    }

    const opts = {
        height: '400',
        width: '100%',
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            controls: 1,
            color: 'white',
        },
    }

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Skeleton variant="text" height={60} sx={{ mb: 3 }} />
                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                </Box>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert 
                    severity="error" 
                    sx={{ mb: 4 }}
                >
                    Failed to load trailer. Please try again later.
                </Alert>
            </Container>
        )
    }

    if (!video) {
        return (
            <Container maxWidth="lg">
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        background: 'rgba(26, 26, 26, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <PlayIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No Trailer Available
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This movie doesn't have a trailer available at the moment.
                    </Typography>
                </Paper>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
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
                    Watch Trailer
                </Typography>
                
                <Paper 
                    elevation={8}
                    sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        background: 'rgba(26, 26, 26, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <YouTube 
                            videoId={video} 
                            opts={opts}
                            iframeClassName="youtube-iframe"
                            style={{
                                width: '100%',
                                height: '400px',
                                border: 'none',
                                borderRadius: '12px',
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default ShowTrailer