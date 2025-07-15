/**
 * Renders a search form to fetch CourseItem data from the API, and
 * displays results via either DefaultPage or StyledPage based on
 * the `mode` prop.
 * 
 * 
 * @param {CourseSearchProps} props - Component props specifying rendering mode.
 * @returns {JSX.Element} Rendered course search form and results.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, CircularProgress, Paper, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { fetchCourses } from '../../utilities/utilities';
import { StyledPage } from '../StyledPage';
import { DefaultPage } from '../DefaultPage';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './CourseSearch.css';

interface CourseSearchProps { mode: 'default' | 'styled' }

export const CourseSearch: React.FC<CourseSearchProps> = ({ mode }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchTermRef = useRef<HTMLInputElement>(null);

    // Fetch course items using react-query
    const { data, status, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: () => { const term = searchTermRef.current?.value.trim(); if (term) return fetchCourses(term) },
        enabled: false,
    });

    // Handle data changes and status updates
    useEffect(() => {
        if (status === 'success') {
            if (data) {
                enqueueSnackbar('Success!', { variant: 'success' })
            }
        }
        else if (status === 'error') {
            setError('ERROR: Failed to fetch courses.');
        }
        setIsLoading(false);
    }, [data, status]);

    // Handle search button click
    const handleSearch = useCallback(() => {
        setError(null);
        const term = searchTermRef.current?.value.trim();
        if (term) {
            setIsLoading(true);
            refetch();
        } else {
            setError("Please enter the search term.");
        }
    }, [refetch]);

    return (
        <>
            <header className="search-header">
                <a href="https://tophat.com/">
                    <Box
                        component="img"
                        src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/logo.svg"
                        className='logo-card'
                        alt="Top Hat Logo" />
                </a>
            </header>
            <Card className='search-body'>
                <Card className='search-card'>
                    <form noValidate autoComplete="off" className="form-control">
                        <FormControl>
                            <TextField
                                required
                                id="outlined-required"
                                label="Search"
                                inputRef={searchTermRef}
                            />
                        </FormControl>
                        <Button onClick={handleSearch}>
                            Search
                        </Button>
                    </form>
                    {error && (
                        <Box component="div" sx={{ color: 'error.main' }}>
                            {error}
                        </Box>
                    )}
                    <Paper className='data-card'>
                        {isLoading && <Box component="div" className='loading-card'>
                            <CircularProgress />
                        </Box>}
                        {!isLoading && !error && data ? mode === 'default' ?
                            (<DefaultPage data={data} />) :     // Render DefaultPage if mode is 'default'
                            (<StyledPage data={data} />) :      // or StyledPage if mode is 'styled'
                            null
                        }
                    </Paper>
                </Card>
            </Card>
        </>
    );
}

export default CourseSearch;
