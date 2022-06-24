import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import RelayCard from 'ui-component/cards/Skeleton/RelayCard';

// assets
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

// styles
// eslint-disable-next-line no-unused-vars
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
        boxShadow: 4
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

// eslint-disable-next-line react/prop-types
const LocationDropDown = ({ isLoading, RelaysHwState, setCommand, Command, index, title }) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const newValue = event.target.value;
        const newCommand = [...Command];
        newCommand[index] = newValue;
        setCommand(newCommand);
    };

    return (
        <>
            {isLoading ? (
                <RelayCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    sx={{
                        boxShadow: 3,
                        my: 1,
                        '&:hover': {
                            boxShadow: 4,
                            cursor: 'pointer'
                        }
                    }}
                >
                    <Box sx={{ p: 2, position: 'relative' }}>
                        <Box
                            sx={{
                                flexDirection: { xs: 'column' },

                                display: 'flex'
                            }}
                            spacing={2}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h5">{title ?? 'Relay '}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.warning.light,
                                            color: theme.palette.warning.dark,
                                            mr: 2,
                                            mt: 0.5
                                        }}
                                    >
                                        <EditLocationAltIcon fontSize="inherit" />
                                    </Avatar>
                                </Box>

                                <Box sx={{ minWidth: 120, width: '100%' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                        <Select
                                            fullWidth
                                            disabled={Command[index] === '1' || Command[index] === '0'}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={RelaysHwState[index]}
                                            label="Location"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="0">Local</MenuItem>
                                            <MenuItem value="1">remote</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            xs={12}
                            md={3}
                            sx={{
                                width: '10px',
                                position: 'absolute',
                                top: '15px',
                                right: '25px'
                            }}
                        >
                            {(Command[index] === '1' || Command[index] === '0') && <CircularProgress color="secondary" size="20px" />}
                        </Box>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

LocationDropDown.propTypes = {
    isLoading: PropTypes.bool
};

export default LocationDropDown;
