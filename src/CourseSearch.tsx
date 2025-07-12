import { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Paper, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Card from './components/Card/Card';
import Button from './components/Button/Button';
import { enqueueSnackbar } from 'notistack';

const fetchCourses = async (searchTerm: string) => {
    const res = await fetch(`https://coursetreesearch-service-sandbox.dev.tophat.com/?query=${searchTerm}`);
    return res.json();
};

export const CourseSearch: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const searchTermRef = useRef<HTMLInputElement>(null);

    const { data, status, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: () => { const term = searchTermRef.current?.value.trim(); if (term) return fetchCourses(term) },
        enabled: false,
    });

    useEffect(() => {
        if (data) {
            if (status === 'success') {
                setItems(data);
                enqueueSnackbar('Success!', { variant: 'success' })
            }
            else if (status === 'error') {
                setError('ERROR: Failed to fetch courses.');
                return;
            }
        }
    }, [data, status]);

    return (
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
                    <Button onClick={() => {
                        setError(null);
                        searchTermRef.current?.value?.trim()
                            ? refetch()
                            : setError('Please enter the search term.')
                    }}>
                        Search
                    </Button>
                    {error && (
                        <Box component="div" sx={{ color: 'error.main', mt: 2 }}>
                            {error}
                        </Box>
                    )}
                </form>

                <Paper sx={{ maxHeight: 500, overflow: 'auto', p: 2, width: 320}}>
                    <Paper sx={{ width: 300, boxShadow: 0 }}>
                        {items.length > 0 && (<div>{items}</div>)}
                    </Paper>
                </Paper>
            </Card>
        </Card>

    );
}

export default CourseSearch;
