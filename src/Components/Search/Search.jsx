import React, { useState, useEffect } from 'react'
import { 
  Box, 
  TextField, 
  Typography, 
  Grid, 
  InputAdornment,
  Paper,
  Skeleton,
  Alert
} from '@mui/material'
import { Search as SearchIcon, Movie as MovieIcon } from '@mui/icons-material'
import MovieCard from '../Movie/MovieCard'

const Search = () => {
    const [movie, setMovie] = useState([])
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Function to check if movie has complete information
    const hasCompleteInfo = (movie) => {
        return movie && 
               movie.id && 
               (movie.title || movie.name) && 
               movie.poster_path && 
               movie.vote_average !== undefined && 
               movie.vote_average !== null
    }

    const handleOnChange = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        clearInterval(time)
        const timeOut = setTimeout(() => searchMovie(query), 500)
        setTime(timeOut)
    }

    function searchMovie(name) {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/${name ? "search/movie" : "movie/upcoming"}?api_key=dfac79bf601a1c8766457c868e28203e&language=en-US&query=${name}`)
            .then(res => res.json())
            .then(data => {
                // Filter out movies with incomplete information
                const filteredMovies = data.results.filter(hasCompleteInfo)
                setMovie(filteredMovies)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error searching movies:', error)
                setLoading(false)
            })
    }

    useEffect(() => {
        searchMovie()
    }, [])

    return (
        <Box sx={{ mt: 4 }}>
            {/* Search Section */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    mb: 4,
                    background: 'linear-gradient(135deg, rgba(245, 197, 24, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%)',
                    border: '1px solid rgba(245, 197, 24, 0.2)'
                }}
            >
                <Typography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                        mb: 3,
                        fontWeight: 700,
                        textAlign: 'center',
                        color: 'primary.main',
                        fontSize: '2.5rem'
                    }}
                >
                    Discover Movies
                </Typography>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            fontSize: '1.2rem',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(245, 197, 24, 0.3)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                fontSize: '1.2rem',
                                '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    opacity: 1,
                                },
                            },
                        },
                    }}
                />
            </Paper>

            {/* Results Section */}
            <Box>
                {loading ? (
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
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
                ) : movie.length <= 0 ? (
                    <Paper 
                        elevation={2} 
                        sx={{ 
                            p: 6, 
                            textAlign: 'center',
                            background: 'rgba(26, 26, 26, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <MovieIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
                        <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
                            No Results Found
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Try searching for a different movie or check your spelling
                        </Typography>
                    </Paper>
                ) : (
                    <>
                        <Typography 
                            variant="h4" 
                            component="h3" 
                            sx={{ 
                                mb: 3,
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '2rem'
                            }}
                        >
                            {searchQuery ? `Search Results for "${searchQuery}"` : 'Upcoming Movies'}
                            <Typography 
                                component="span" 
                                variant="h6" 
                                sx={{ ml: 2, color: 'text.secondary', fontSize: '1.2rem' }}
                            >
                                ({movie.length} movies found)
                            </Typography>
                        </Typography>
                        
                        <Grid container spacing={3} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                            {movie.map(movie => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                    <MovieCard movie={movie} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default Search