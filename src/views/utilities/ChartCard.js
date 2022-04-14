import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

// eslint-disable-next-line react/prop-types

const type = 'area';
const height = 95;
const options = {
    chart: {
        id: 'support-chart',
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 1
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: 'Ticket '
        },
        marker: {
            show: false
        }
    }
};
const localChartData = {
    type,
    height,
    options,
    series: [
        {
            data: [10, 0, 0, 10, 0, 0, 0]
        }
    ]
};
const ChartCard = ({ data2, title }) => {
    // eslint-disable-next-line react/prop-types
    const ChartData = localChartData;
    const data = data2;

    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            // eslint-disable-next-line react/prop-types
            ...ChartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark, ChartData]);

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                {title ?? 'Voltage'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {`${data[data.length - 1]}v` ?? '0v'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }} />
                </Grid>
            </Grid>
            <div style={{ height: '100px' }}>
                {ChartData && (
                    <Chart
                        type={type}
                        height={100}
                        options={options}
                        series={[
                            {
                                data: data2
                            }
                        ]}
                    />
                )}{' '}
            </div>
        </Card>
    );
};

export default ChartCard;
