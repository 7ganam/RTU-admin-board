import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import { gridSpacing } from 'store/constant';
import TotalIncomeLightCard from './TotalIncomeLightCard';


// assets
import LinkIcon from '@mui/icons-material/Link';
import BajajAreaChartCard from './BajajAreaChartCard';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
    height: 'calc(100vh - 210px)',
    border: '1px solid',
    borderColor: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const StationPage = () => {
    let { id } = useParams();
    return (
        <MainCard title={`Station ${id}`} secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />}>
            <Card sx={{ overflow: 'hidden' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Voltage I' value='220v' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Voltage II' value='220v' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Voltage III' value='220v' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Current I' value='500A' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Current II' value='520A' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='RMS Current III' value='200A' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='Approximate Power' value='200VA' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='Frequency' value='333Hz' />
                    </Grid>
                    <Grid item xs={12} xs={4} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard title='Power Factor' value='3' />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} p={1}>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={3} >
                            <TotalIncomeLightCard isLoading={false} />
                        </Grid>
                    </Grid>
                </Grid>

            </Card>
        </MainCard>
    );

};

export default StationPage;
