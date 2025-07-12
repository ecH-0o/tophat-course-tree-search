import { useState, useEffect, useRef, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Paper, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { fetchCourses } from '../utilities';
import { StyledPage } from './StyledPage';
import { DefaultPage } from './DefaultPage';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

interface CourseSearchProps { mode: 'default' | 'styled' }

export const CourseSearch: React.FC<CourseSearchProps> = ({ mode }) => {
    const [error, setError] = useState<string | null>(null);
    const searchTermRef = useRef<HTMLInputElement>(null);

    const { data, status, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: () => { const term = searchTermRef.current?.value.trim(); if (term) return fetchCourses(term) },
        enabled: false,
    });

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
            <header>
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
                <Card sx={{ width: 500, height: 700, minHeight: 700 }}>
                    <form noValidate autoComplete="off">
                        <FormControl sx={{ width: '25ch' }}>
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
                        {error && (
                            <Box component="div" sx={{ color: 'error.main', mt: 2 }}>
                                {error}
                            </Box>
                        )}
                    </form>

                    <Paper sx={{ maxHeight: 500, overflow: 'auto', p: 2, width: 320 }}>
                        <Paper sx={{ width: 300, boxShadow: 0 }}>
                            {data ? mode === 'default' ?
                                (<DefaultPage data={data} />) :
                                (<StyledPage data={data} />) :
                                null
                            }
                        </Paper>
                    </Paper>
                </Card>
            </Card>
        </>

    );
}

export default CourseSearch;
