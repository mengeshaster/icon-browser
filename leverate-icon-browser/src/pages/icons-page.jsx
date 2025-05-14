import React, { useState } from 'react';
import { fetchIcons } from '../services/iconsService';
import {
    Grid,
    TextField,
    Button,
    Card,
    CardMedia,
    Alert,
    Box,
    Stack,
} from '@mui/material';

export default function IconsPage() {
    const [search, setSearch] = useState('');
    const [searchTouched, setSearchTouched] = useState(false);

    const [limit, setLimit] = useState(10);
    const [limitTouched, setLimitTouched] = useState(false);

    const [offset, setOffset] = useState(0);
    const [offsetTouched, setOffsetTouched] = useState(false);

    const [icons, setIcons] = useState([]);
    const [error, setError] = useState('');

    const isSearchValid = Boolean(search.trim());
    const isLimitValid = Number.isInteger(limit) && limit > 0;
    const isOffsetValid = Number.isInteger(offset) && offset >= 0;
    const isFormValid = isSearchValid && isLimitValid && isOffsetValid;

    const load = async () => {
        if (!isFormValid) return;

        setError('');
        try {
            const data = await fetchIcons(search, limit, offset);
            setIcons(data.icons);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Stack spacing={2}>
                <TextField
                    required
                    fullWidth
                    label="Search term"
                    value={search}
                    onChange={e => {
                        if (!searchTouched) setSearchTouched(true);
                        setSearch(e.target.value);
                    }}
                    error={searchTouched && !isSearchValid}
                    helperText={
                        searchTouched && !isSearchValid
                            ? 'Please enter a search term'
                            : ''
                    }
                />

                <Stack direction="row" spacing={2}>
                    <TextField
                        required
                        type="number"
                        label="Limit"
                        value={limit}
                        onChange={e => {
                            if (!limitTouched) setLimitTouched(true);
                            setLimit(parseInt(e.target.value, 10) || 0);
                        }}
                        error={limitTouched && !isLimitValid}
                        helperText={
                            limitTouched && !isLimitValid
                                ? 'Limit must be greater than 0'
                                : ''
                        }
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        required
                        type="number"
                        label="Offset"
                        value={offset}
                        onChange={e => {
                            if (!offsetTouched) setOffsetTouched(true);
                            setOffset(parseInt(e.target.value, 10) || 0);
                        }}
                        error={offsetTouched && !isOffsetValid}
                        helperText={
                            offsetTouched && !isOffsetValid
                                ? 'Offset must be 0 or higher'
                                : ''
                        }
                        inputProps={{ min: 0 }}
                    />
                </Stack>

                <Button
                    variant="contained"
                    onClick={load}
                    disabled={!isFormValid}
                >
                    Search
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </Stack>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {icons.map(icon => (
                    <Grid item xs={3} key={icon.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="100"
                                image={icon.thumbnail_url}
                                alt={icon.attribution}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
