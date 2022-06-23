/* eslint-disable no-plusplus */
import { Card, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import VILightCard from './RelayLightCard';

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

function createData(name, value) {
    return { name, value };
}

function getBits(value) {
    const base2Serve = value.toString(2).split('').reverse().join('');
    const baseLServe = new Array(16 - base2Serve.length).join('0');
    const base2 = base2Serve + baseLServe;
    const stringBase2 = base2.toString();
    const arraryBase2 = stringBase2?.split('') ?? '00000000000000000';
    return arraryBase2;
}

const rows = [
    createData('DI 1', 'loading...'),
    createData('DI 2', 'loading...'),
    createData('DI 3', 'loading...'),
    createData('DI 4', 'loading...'),
    createData('DI 5', 'loading...'),
    createData('DI 6', 'loading...'),
    createData('DI 7', 'loading...'),
    createData('DI 8', 'loading...'),
    createData('DI 9', 'loading...'),
    createData('DI 10', 'loading...'),
    createData('DI 11', 'loading...'),
    createData('DI 12', 'loading...'),
    createData('DI 13', 'loading...'),
    createData('DI 14', 'loading...'),
    createData('DI 15', 'loading...'),
    createData('DI 16', 'loading...')
];

const MediumVoltageStationPage = () => {
    const { id } = useParams();
    // const [VIsHwState, setVIsHwState] = useState(['-', '-', '-', '-']);
    const [Command, setCommand] = useState(['-', '-', '-', '-']);
    const [ReceivedVIArray, setReceivedVIArray] = useState([]);
    const [ReceivedDataArray, setReceivedDataArray] = useState([]);
    const [ReceivedDigitalArray, setReceivedDigitalArray] = useState([
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...',
        'loading...'
    ]);
    const [GraphsData, setGraphsData] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
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

    // ----------------------------------------------| utils |--------------------------------------------
    const PublisherTimerRef = useRef(null);
    function publisherFunction() {
        let publishString = Command.join(',');
        publishString += ',';
        console.log('pulished value', publishString);
        brokerRef.current.publish(
            `medium/station${id}/command`,
            JSON.stringify(publishString) // convert number to string
        );
    }
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

    const removeUnwantedChars = (inputString) => {
        const forbiddenChars = ['"'];

        // eslint-disable-next-line no-restricted-syntax
        for (const char of forbiddenChars) {
            inputString = inputString.split(char).join('');
        }
        return inputString;
    };

    const isEqual = (ReceivedVIArray, command) => {
        for (let index = 0; index < ReceivedVIArray.length; index++) {
            if (command[index] === '1' || command[index] === '0') {
                if (command[index] !== ReceivedVIArray[index]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleArrivedVISignals = (VIHWStateArray, VICommandArray) => {
        // HW STATE 1 -> arudino received the command and will not apply any other commands until you send it another 0
        // HW STATE 0 -> arduino waiting for commands and will apply a new command if you send it.

        // 1- if a hw sate is 1 set the corresponding command to 0 to to inform the arduino the hardware state arrived here and allow it to process further commands
        // 2- if a hw state is 0 && command is 0 -> stop sending the command ( this means you were telling the arduino to start accepting new commands and it received this so no need for further)
        // 3-if a hw state is 0 && command is 1 -> do nothing (a command is being sent to the  arduino .. arduino should respond with hw state 1 soon).
        const commandArrayCopy = [...Command];

        for (let i = 0; i < VIHWStateArray.length; i++) {
            if (VIHWStateArray[i] === '1') {
                commandArrayCopy[i] = '0';
            } else if (VIHWStateArray[i] === '0' && Command[i] === '0') {
                commandArrayCopy[i] = '-';
            }
        }

        if (!isEqual(commandArrayCopy, Command)) {
            setCommand(commandArrayCopy);
        }
    };

    // --------------------------------------------| Effects |--------------------------------------------

    // on: start => connect to broker
    useEffect(() => {
        brokerRef.current = mqtt.connect('ws://ec2-52-28-144-120.eu-central-1.compute.amazonaws.com:8000', {
            // open connection with your broker in AWS via websocket
            // username: 'ganam', //authenticate your broker with username and password
            // password: '123123',
        });

        return () => {};
    }, []);
    // on: start => subscribe to the topic and define callback function
    useEffect(() => {
        // subscribe to hardware state
        brokerRef.current.unsubscribe(`medium/station${id}/hwState`);
        brokerRef.current.subscribe(`medium/station${id}/hwState`);
        // define the call back function
        brokerRef.current.on('message', (topic, payload) => {
            const payloadString = new TextDecoder().decode(payload);
            const cleanPayloadString = removeUnwantedChars(payloadString);
            const payloadArray = cleanPayloadString.split(',');

            const receivedDataArray = payloadArray.slice(0, 11);
            setReceivedDataArray(receivedDataArray);

            const receivedVIArray = payloadArray.slice(11, 15);
            setReceivedVIArray(receivedVIArray);

            const receivedDigitalArray = payloadArray.slice(15, 31);
            setReceivedDigitalArray(receivedDigitalArray);
        });
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // unregister old pulisher and register a new one whenever the Commands state change
    useEffect(() => {
        if (isSendingCommand()) {
            stopPublishing();
            startPublishing(3000);
        }
        return () => {
            stopPublishing();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Command]);

    useEffect(() => {
        handleArrivedVISignals(ReceivedVIArray, Command);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ReceivedVIArray]);
    useEffect(() => {
        const graphsDataCopy = [...GraphsData];
        for (let index = 0; index < ReceivedDataArray.length; index++) {
            const DI = ReceivedDataArray[index];
            // console.log('DI ', DI );
            const graphArray = [...GraphsData[index]];
            graphArray.shift();
            graphArray.push(parseFloat(DI));
            graphsDataCopy[index] = graphArray;
        }
        setGraphsData(graphsDataCopy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ReceivedDataArray]);

    return (
        <MainCard
            title={`Station ${id}`}
            secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />}
        >
            <Card sx={{ overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="line to line voltage 1" unit="V" data2={GraphsData[0]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="line to line voltage 2" unit="V" data2={GraphsData[1]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="line to line voltage 3" unit="V" data2={GraphsData[2]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="Frequency" unit="Hz" data2={GraphsData[3]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="phase 1 current" unit="A" data2={GraphsData[4]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="phase 2 current" unit="A" data2={GraphsData[5]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="phase 3 current" unit="A" data2={GraphsData[6]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="Power factor" unit="" data2={GraphsData[7]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="Active power" unit="kW" data2={GraphsData[8]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="Reactive power" unit="kVAR" data2={GraphsData[9]} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ pt: '16px !important' }}>
                        <ChartCard title="Apparent power" unit="kVA" data2={GraphsData[10]} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} p={1}>
                        <Grid item sm={6} xs={12} md={3}>
                            <VILightCard
                                isLoading={ReceivedVIArray[0] !== '1' && ReceivedVIArray[0] !== '0'}
                                RelaysHwState={ReceivedVIArray}
                                setCommand={setCommand}
                                Command={Command}
                                index={0}
                                title="VI 1"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3}>
                            <VILightCard
                                isLoading={ReceivedVIArray[0] !== '1' && ReceivedVIArray[0] !== '0'}
                                RelaysHwState={ReceivedVIArray}
                                setCommand={setCommand}
                                Command={Command}
                                index={1}
                                title="VI 2"
                            />
                        </Grid>{' '}
                        <Grid item sm={6} xs={12} md={3}>
                            <VILightCard
                                isLoading={ReceivedVIArray[0] !== '1' && ReceivedVIArray[0] !== '0'}
                                RelaysHwState={ReceivedVIArray}
                                setCommand={setCommand}
                                Command={Command}
                                index={2}
                                title="VI 3"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3}>
                            <VILightCard
                                isLoading={ReceivedVIArray[0] !== '1' && ReceivedVIArray[0] !== '0'}
                                RelaysHwState={ReceivedVIArray}
                                setCommand={setCommand}
                                Command={Command}
                                index={3}
                                title="VI 4"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Digital input</StyledTableCell>
                                <StyledTableCell align="center">State</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{getBits(Math.trunc(ReceivedDigitalArray[0]))[index]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </MainCard>
    );
};

export default MediumVoltageStationPage;
