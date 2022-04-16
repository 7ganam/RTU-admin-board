import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BoltIcon from '@mui/icons-material/Bolt';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading, ...props }) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Link to={`/low-voltage-stations/${props.id}`}>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.largeAvatar,
                                                    backgroundColor: theme.palette.primary[800],
                                                    color: '#fff',
                                                    mt: 1
                                                }}
                                            >
                                                <BoltIcon fontSize="inherit" />
                                            </Avatar>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, true)}
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, false)}
                                        >
                                            Year
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                {timeValue ? (
                                                    <Typography sx={{ fontSize: '1.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                        STATION {props?.id ?? '1'}
                                                    </Typography>
                                                ) : (
                                                    <Typography sx={{ fontSize: '1.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                        STATION {props?.id ?? '1'}
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                    Station {props?.id ?? '1'} data and contorls
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6}>
                                        <Grid container xs={12} alignItems="center" justifyContent="center">
                                            <Grid item xs={2}>
                                                {' '}
                                                <div>V1</div>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {' '}
                                                {timeValue ? (
                                                    <Chart {...ChartDataMonth} />
                                                ) : (
                                                    <Chart {...ChartDataYear} height={10} width="100%" margin="auto" />
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container xs={12} alignItems="center" justifyContent="center">
                                            <Grid item xs={2}>
                                                {' '}
                                                <div>V1</div>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {' '}
                                                {timeValue ? (
                                                    <Chart {...ChartDataMonth} />
                                                ) : (
                                                    <Chart {...ChartDataYear} height={10} width="100%" margin="auto" />
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container xs={12} alignItems="center" justifyContent="center">
                                            <Grid item xs={2}>
                                                {' '}
                                                <div>V1</div>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {' '}
                                                {timeValue ? (
                                                    <Chart {...ChartDataMonth} />
                                                ) : (
                                                    <Chart {...ChartDataYear} height={10} width="100%" margin="auto" />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
