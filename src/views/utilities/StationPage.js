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

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// =============================|| TABLER ICONS ||============================= //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [createData('station1', 'loading...', 'loading...', 'loading...', 'loading...')];

const StationPage = () => {
    const { id } = useParams();
    const [RelaysHwState, setRelaysHwState] = useState(['-', '-', '-', '-', '-', '-']);
    const [Command, setCommand] = useState(['-', '-', '-', '-', '-', '-']);
    const [ReceivedRelayArray, setReceivedRelayArray] = useState([]);
    const [ReceivedDataArray, setReceivedDataArray] = useState([]);
    const [ReceivedDigitalArray, setReceivedDigitalArray] = useState(['loading...', 'loading...', 'loading...', 'loading...']);
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
        let publishString = Command.join(',');
        publishString += ',';
        console.log('pulished value', publishString);
        brokerRef.current.publish(
            `station${id}/DEV_command`,
            JSON.stringify(publishString) // convert number to string
        );
    }

    const PublisherTimerRef = useRef(null);
    const startPublishing = (timeInterval) => {
        PublisherTimerRef.current = setInterval(publisherFunction, timeInterval, 100, 200);
    };
    const stopPublishing = () => {
        clearInterval(PublisherTimerRef.current);
    };

    const isSendingCommand = () => {
        const oneExists = Command.indexOf('1') !== -1;
        const zeroExists = Command.indexOf('0') !== -1;
        return oneExists || zeroExists;
    };

    useEffect(() => {
        if (isSendingCommand()) {
            stopPublishing();
            startPublishing(3000);
        }
        return () => {
            stopPublishing();
        };
    }, [Command]);

    const removeUnwantedChars = (inputString) => {
        const forbiddenChars = ['"'];

        // eslint-disable-next-line no-restricted-syntax
        for (const char of forbiddenChars) {
            inputString = inputString.split(char).join('');
        }
        return inputString;
    };

    const isEqual = (ReceivedRelayArray, command) => {
        for (let index = 0; index < ReceivedRelayArray.length; index++) {
            if (command[index] === '1' || command[index] === '0') {
                if (command[index] !== ReceivedRelayArray[index]) {
                    return false;
                }
            }
        }
        return true;
    };

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
                stopPublishing();
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
            // console.log('reading', reading);
            const graphArray = [...GraphsData[index]];
            graphArray.shift();
            graphArray.push(parseFloat(reading));
            graphsDataCopy[index] = graphArray;
        }
        setGraphsData(graphsDataCopy);
    }, [ReceivedDataArray]);

    // Subscribe to all topics and define the call back functions
    useEffect(() => {
        // subscribe to hardware state
        brokerRef.current.unsubscribe(`station${id}/DEV_hwState`);
        brokerRef.current.subscribe(`station${id}/DEV_hwState`);
        // define the call back function
        brokerRef.current.on('message', (topic, payload) => {
            const payloadString = new TextDecoder().decode(payload);
            const cleanPayloadString = removeUnwantedChars(payloadString);
            const payloadArray = cleanPayloadString.split(',');
            console.log('payloadArray', payloadArray);
            // get relays values
            const receivedRelayArray = payloadArray.slice(8, 14);
            setReceivedRelayArray(receivedRelayArray);

            const receivedDigitalArray = payloadArray.slice(14, 18);
            setReceivedDigitalArray(receivedDigitalArray);

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
                        <ChartCard title="V1" unit="V" data2={GraphsData[0]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="V2" unit="V" data2={GraphsData[1]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="V3" unit="V" data2={GraphsData[2]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="F" unit="Hz" data2={GraphsData[3]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="I1" unit="A" data2={GraphsData[4]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="I2" unit="A" data2={GraphsData[5]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="I3" unit="A" data2={GraphsData[6]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="AP" unit="VA" data2={GraphsData[7]} />
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

                <Divider sx={{ my: 3 }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Digital Values</StyledTableCell>
                                <StyledTableCell align="right">Value1</StyledTableCell>
                                <StyledTableCell align="right">Value2</StyledTableCell>
                                <StyledTableCell align="right">Value3</StyledTableCell>
                                <StyledTableCell align="right">Value4</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{ReceivedDigitalArray[0]}</StyledTableCell>
                                    <StyledTableCell align="right">{ReceivedDigitalArray[1]}</StyledTableCell>
                                    <StyledTableCell align="right">{ReceivedDigitalArray[2]}</StyledTableCell>
                                    <StyledTableCell align="right">{ReceivedDigitalArray[3]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </MainCard>
    );
};

export default StationPage;
