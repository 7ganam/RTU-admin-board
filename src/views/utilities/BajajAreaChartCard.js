import {useEffect} from 'react';
import {useSelector} from 'react-redux';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Card, Grid, Typography} from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import {useParams} from 'react-router-dom';

// project imports
import chartData from './chart-data/bajaj-area-chart';

let type = 'area';
let height = 95;
let options = {
  chart: {
    id: 'support-chart',
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 1,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: 'Ticket ',
    },
    marker: {
      show: false,
    },
  },
};

let chartData1 = {
  type,
  height,
  options,
  series: [
    {
      data: [11, 11, 11, 11, 10, 11, 11],
    },
  ],
};

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = (props) => {
  let data = props.ChartData1?.series[0].data ?? [0, 0, 0, 0, 0, 0, 0];

  let {id} = useParams();
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const {navType} = customization;

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const newSupportChart = {
      ...props.ChartData1.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light',
      },
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark, props.ChartData1]);

  return (
    <Card sx={{bgcolor: 'secondary.light'}}>
      <Grid container sx={{p: 2, pb: 0, color: '#fff'}}>
        <Grid item xs={12}>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Typography
                variant='subtitle1'
                sx={{color: theme.palette.secondary.dark}}>
                {props?.title ?? 'Voltage'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h4' sx={{color: theme.palette.grey[800]}}>
                {data[data.length - 1] + 'v' ?? '0v'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='subtitle2'
            sx={{color: theme.palette.grey[800]}}></Typography>
        </Grid>
      </Grid>
      <div style={{height: '100px'}}>
        {props.ChartData1 && <Chart {...props.ChartData1} height={100} />}{' '}
      </div>
    </Card>
  );
};

export default BajajAreaChartCard;
