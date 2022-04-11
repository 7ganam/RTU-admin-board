import {styled} from '@mui/material/styles';
import {Card} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import {gridSpacing} from 'store/constant';
import TotalIncomeLightCard from './TotalIncomeLightCard';

// assets
import LinkIcon from '@mui/icons-material/Link';
import BajajAreaChartCard from './BajajAreaChartCard';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import {useParams} from 'react-router-dom';
import React, {useState, useRef, useEffect} from 'react';
import * as mqtt from 'mqtt'; // import everything inside the mqtt module and give it the namespace "mqtt"

// styles
const IFrameWrapper = styled('iframe')(({theme}) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

// =============================|| TABLER ICONS ||============================= //

const StationPage = () => {
  let {id} = useParams();
  const [checked1, setchecked1] = useState(false);

  const clientRef = useRef(
    mqtt.connect(
      'ws://ec2-52-28-144-120.eu-central-1.compute.amazonaws.com:8000',
      {
        //open connection with your broker in AWS via websocket
        // username: 'ganam', //authenticate your broker with username and password
        // password: '123123',
      }
    )
  );

  const RelayRef = useRef(null);
  function relayPublisher() {
    clientRef.current.publish(
      'yalla/relay1',
      JSON.stringify(checked1 ? 1 : 0) //convert number to string
    ); //publish sensor data to broker on topic mqtt/dht
  }

  // useEffect(() => {
  //   RelayRef.current = setInterval(relayPublisher, 10000, 100, 200);
  //   return () => {
  //     clearInterval(RelayRef.current);
  //   };
  // }, [checked1]);

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
  const [ChartData1, setChartData1] = useState({
    type,
    height,
    options,
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  // useEffect(() => {
  //   clientRef.current.subscribe('station1/v1');
  //   clientRef.current.on('message', function (topic, payload) {
  //     let myArray = ChartData1.series[0].data;
  //     myArray.shift();
  //     myArray.push(+JSON.parse(payload));
  //     setChartData1({
  //       type,
  //       height,
  //       options,
  //       series: [
  //         {
  //           data: myArray,
  //         },
  //       ],
  //     });
  //   });
  //   return () => {};
  // }, []);

  useEffect(() => {
    clientRef.current.subscribe('yalla/Data');
    clientRef.current.on('message', function (topic, payload) {
      var mystring = new TextDecoder().decode(payload);
      console.log('mystring', mystring);
      if (mystring) {
        let payloadArray = mystring.split(',');
        console.log('topic', topic);
        console.log('JSON.parse(payload)', payloadArray[0]);
        let myArray = ChartData1.series[0].data;
        myArray.shift();
        myArray.push(+payloadArray[0]);
        setChartData1({
          type,
          height,
          options,
          series: [
            {
              data: myArray,
            },
          ],
        });
      }

      //   return () => {};
    });
    return () => {};
  }, []);

  return (
    <MainCard
      title={`Station ${id}`}
      secondary={
        <SecondaryAction
          icon={<LinkIcon fontSize='small' />}
          link='https://tablericons.com/'
        />
      }>
      <Card sx={{overflow: 'hidden'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard
              title='RMS Voltage I'
              value='220v'
              ChartData1={ChartData1}
            />
          </Grid>
          {/* <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='RMS Voltage II' value='220v' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='RMS Voltage III' value='220v' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='RMS Current I' value='500A' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='RMS Current II' value='520A' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='RMS Current III' value='200A' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='Approximate Power' value='200VA' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='Frequency' value='333Hz' />
          </Grid>
          <Grid item xs={12} md={4} sx={{pt: '16px !important'}}>
            <BajajAreaChartCard title='Power Factor' value='3' />
          </Grid> */}
        </Grid>

        <Divider sx={{my: 3}} />

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} p={1}>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard
                isLoading={false}
                checked1={checked1}
                setchecked1={setchecked1}
              />
            </Grid>
            {/* <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid>
            <Grid item sm={6} xs={12} md={3}>
              <TotalIncomeLightCard isLoading={false} />
            </Grid> */}
          </Grid>
        </Grid>
      </Card>
    </MainCard>
  );
};

export default StationPage;
