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
import { Box, Paper, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { fetchCourses } from '../../utilities/utilities';
import { StyledPage } from '../StyledPage';
import { DefaultPage } from '../DefaultPage';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

interface CourseSearchProps { mode: 'default' | 'styled' }

export const CourseSearch: React.FC<CourseSearchProps> = ({ mode }) => {
    const [error, setError] = useState<string | null>(null);
    const searchTermRef = useRef<HTMLInputElement>(null);

    // Fetch course items using react-query
    const { data, status, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: () => { const term = searchTermRef.current?.value.trim(); if (term) return fetchCourses(term) },
        enabled: false,
    });

    // Handle data changes and status updates
    useEffect(() => {
        if (data) {
            if (status === 'success') {
                enqueueSnackbar('Success!', { variant: 'success' })
            }
            else if (status === 'error') {
                setError('ERROR: Failed to fetch courses.');
                return;
            }
        }
    }, [data, status]);

    // Handle search button click
    const handleSearch = useCallback(() => {
        setError(null);
        const term = searchTermRef.current?.value.trim();
        if (term) {
            refetch();
        } else {
            setError("Please enter the search term.");
        }
    }, [refetch]);

    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 30, alignItems: 'center', display: 'flex' }}>
                <a href="https://tophat.com/">
                    <Box
                        component="img"
                        src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/logo.svg"
                        width={125}
                        height={21.5}
                        alt="Top Hat Logo" />
                </a>
            </header>
            <Card sx={{ background: 'transparent', flex: 8 }}>
                <Card sx={{ width: 500, height: 700, p: 5 }}>
                    <form noValidate autoComplete="off" style={{ width: 320, display: 'flex', alignItems: 'center' }}>
                        <FormControl sx={{ mr: 2 }}>
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
                        <Box component="div" sx={{ width: 320, alignContent: 'start',color: 'error.main', mt: 2}}>
                            {error}
                        </Box>
                    )}
                    <Paper sx={{ height: 500, overflow: 'auto', p: 2, width: 320, boxShadow: 0 }}>
                        {data ? mode === 'default' ?
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
