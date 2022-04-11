import {useEffect, useState} from 'react';

// material-ui
import {Grid} from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import {gridSpacing} from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item container xs={12} md={8} spacing={gridSpacing}>
            <Grid item lg={6} sm={6} xs={12} px='2'>
              <TotalOrderLineChartCard id='1' />
            </Grid>
            {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard id='2' />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12} px='2' >
                            <TotalOrderLineChartCard id='3' />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard id='4' />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12} px='2' >
                            <TotalOrderLineChartCard id='5' />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard id='6' />
                        </Grid> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
