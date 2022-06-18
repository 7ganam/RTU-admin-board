import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

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
const RelayLightCard = ({ isLoading, RelaysHwState, setCommand, Command, index, title }) => {
    const theme = useTheme();
    const handleChange = () => {
        const newCommand = [...Command];
        newCommand[index] = '1';
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
                                            mr: 2
                                        }}
                                    >
                                        <ControlCameraIcon fontSize="inherit" />
                                    </Avatar>
                                </Box>
                                <Box>
                                    {RelaysHwState[index] === '1' || RelaysHwState[index] === '0' ? (
                                        <Switch
                                            disabled={Command[index] !== '-'}
                                            checked={RelaysHwState[index] !== '-'}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div>X</div>
                                    )}
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
                            {Command[index] !== '-' && <CircularProgress color="secondary" size="20px" />}
                        </Box>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

RelayLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default RelayLightCard;
