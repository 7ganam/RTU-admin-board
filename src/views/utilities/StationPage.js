/* eslint-disable no-plusplus */
import { Card, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import RelayLightCard from './RelayLightCard';

// assets
import LinkIcon from '@mui/icons-material/Link';
import ChartCard from './ChartCard';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import * as mqtt from 'mqtt'; // import everything inside the mqtt module and give it the namespace "mqtt"

// =============================|| TABLER ICONS ||============================= //

const useMqtt = () => {};

const StationPage = () => {
    const { id } = useParams();
    const [checked1, setchecked1] = useState(false);
    const [RelaysHwState, setRelaysHwState] = useState(['-', '-', '-', '-', '-', '-']);
    const [Command, setCommand] = useState(['-', '-', '-', '-', '-', '-']);
    const [ReceivedRelayArray, setReceivedRelayArray] = useState([]);
    const [ReceivedDataArray, setReceivedDataArray] = useState([]);
    const [GraphsData, setGraphsData] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]);

    // connect to broker
    const brokerRef = useRef();
    useEffect(() => {
        brokerRef.current = mqtt.connect('ws://ec2-52-28-144-120.eu-central-1.compute.amazonaws.com:8000', {
            // open connection with your broker in AWS via websocket
            // username: 'ganam', //authenticate your broker with username and password
            // password: '123123',
        });

        return () => {};
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function publisherFunction() {
        brokerRef.current.publish(
            `station${id}/command`,
            JSON.stringify(checked1 ? 1 : 0) // convert number to string
        );
    }

    const PublisherTimerRef = useRef(null);
    const startPublishing = (timeInterval) => {
        PublisherTimerRef.current = setInterval(publisherFunction, timeInterval, 100, 200);
    };
    const stopPublishing = () => {
        clearInterval(PublisherTimerRef.current);
    };
    useEffect(
        () => () => {
            stopPublishing();
        },
        []
    );

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
    const [ChartData1, setChartData1] = useState({
        type,
        height,
        options,
        series: [
            {
                data: [0, 0, 0, 0, 0, 0, 0]
            }
        ]
    });

    const removeUnwantedChars = (inputString) => {
        const forbiddenChars = ['/', '?', '&', '=', '.', '"'];

        // eslint-disable-next-line no-restricted-syntax
        for (const char of forbiddenChars) {
            inputString = inputString.split(char).join('');
        }
        return inputString;
    };

    const isSendingCommand = () => {
        const oneExists = Command.indexOf('1') !== -1;
        const zeroExists = Command.indexOf('0') !== -1;

        return oneExists || zeroExists;
    };
    const isEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

    const setIndividualStates = (receivedRelayArray, commandArray) => {
        for (let i = 0; i < receivedRelayArray.length; i++) {
            if ((commandArray[i] === '1' || commandArray[i] === '0') && commandArray[i] === receivedRelayArray[i]) {
                const commandArrayCopy = [...commandArray];
                commandArrayCopy[i] = '-';
                setCommand(commandArrayCopy); // reset the command
                const RelaysHwStateCopy = [...RelaysHwState];
                RelaysHwStateCopy[i] = receivedRelayArray[i];
                setRelaysHwState(RelaysHwStateCopy); // set the single relay state to the received the data
            }
        }
    };

    useEffect(() => {
        if (isSendingCommand()) {
            if (isEqual(ReceivedRelayArray, Command)) {
                // if received hardware state is the same as the command being send .. reset the command and change the in app hardware states
                setCommand(['-', '-', '-', '-', '-', '-']);
                setRelaysHwState(ReceivedRelayArray);
            } else {
                // to make for the case if another client set a state while this client is setting.
                setIndividualStates(ReceivedRelayArray, Command);
            }
        } else {
            setRelaysHwState(ReceivedRelayArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ReceivedRelayArray]);

    useEffect(() => {
        // console.log('ReceivedDataArray', ReceivedDataArray);
        const graphsDataCopy = [...GraphsData];
        for (let index = 0; index < ReceivedDataArray.length; index++) {
            const reading = ReceivedDataArray[index];
            const graphArray = [...GraphsData[index]];
            graphArray.shift();
            graphArray.push(+reading);
            graphsDataCopy[index] = graphArray;
        }
        setGraphsData(graphsDataCopy);
    }, [ReceivedDataArray]);

    // Subscribe to all topics and define the call back functions
    useEffect(() => {
        // subscribe to hardware state
        brokerRef.current.unsubscribe(`station${id}/hwState`);
        brokerRef.current.subscribe(`station${id}/hwState`);
        // define the call back function
        brokerRef.current.on('message', (topic, payload) => {
            const payloadString = new TextDecoder().decode(payload);
            const cleanPayloadString = removeUnwantedChars(payloadString);
            const payloadArray = cleanPayloadString.split(',');
            // get relays values
            const receivedRelayArray = payloadArray.slice(8);
            setReceivedRelayArray(receivedRelayArray);

            const receivedDataArray = payloadArray.slice(0, 8);
            setReceivedDataArray(receivedDataArray);
        });
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard
            title={`Station ${id}`}
            secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />}
        >
            <Card sx={{ overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[0]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[1]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[2]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[3]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[4]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[5]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[6]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="RMS Voltage I" value="220v" data2={GraphsData[7]} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} p={1}>
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={0}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={1}
                            />
                        </Grid>{' '}
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={2}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={3}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={4}
                            />
                        </Grid>{' '}
                        <Grid item sm={6} xs={12} md={3}>
                            <RelayLightCard
                                isLoading={RelaysHwState[0] !== '1' && RelaysHwState[0] !== '0'}
                                RelaysHwState={RelaysHwState}
                                setCommand={setCommand}
                                Command={Command}
                                index={5}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </MainCard>
    );
};

export default StationPage;
