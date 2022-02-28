import React, { useState } from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Box,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";


// icons sets
import "font-awesome/css/font-awesome.min.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,

} from "recharts";
import { useTheme } from "@material-ui/styles";











export default function IconsPage() {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <>
      <PageTitle title="Icons" button="Action" />
      <Paper className={classes.iconsContainer}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Material Icons" classes={{ root: classes.tab }} />
          <Tab label="Font Awesome" classes={{ root: classes.tab }} />
        </Tabs>
        {activeTabId === 0 && (


          <Box padding={3}>

            <Grid container spacing={4} padding={4} full>
              <Grid item lg={4} md={4} xs={12}>
                <Paper                >
                  <div >
                    <Box padding={2}>
                      <Grid container full>
                        <Grid item >
                          <Typography
                            color="text"
                            colorBrightness="secondary"
                            className={classes.serverOverviewElementText}
                            variant={'h5'}
                          >
                            RMS Voltage I (v)
                          </Typography>
                        </Grid>
                        <Box item ml={'auto'}>
                          <Icons.OfflineBolt />
                        </Box>


                      </Grid>

                      <Box my={3} sx={{ display: 'flex', justifyContent: 'center', color: 'primary.light' }}>
                        50v
                        <Typography
                          variant='h3'
                          sx={{ color: 'primary.main' }}
                        >
                          50v
                        </Typography>

                      </Box>
                      <div className={classes.serverOverviewElementChartWrapper}>
                        <ResponsiveContainer height={50} width="99%">
                          {/* <AreaChart data={getRandomData(10)}> */}
                          <AreaChart data={[{ "value": 4 }, { "value": 3.5 }, { "value": 4 }, { "value": 4 }, { "value": 4 }, { "value": 4 }, { "value": 4 }, { "value": 4 }, { "value": 4 }, { "value": 4 },]}>

                            <Area
                              type="natural"
                              dataKey="value"
                              stroke={theme.palette.primary.main}
                              fill={theme.palette.primary.light}
                              strokeWidth={2}
                              fillOpacity="0.25"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Box>

                  </div>
                </Paper>
              </Grid>

            </Grid>
          </Box>

        )}

        {activeTabId === 1 && (
          <div>
            <Grid container spacing={2} className="icon-list">
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-bed" />
                <Typography className={classes.materialIconText}>Bed</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-bank" />
                <Typography className={classes.materialIconText}>Bank</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-behance" />
                <Typography className={classes.materialIconText}>
                  Behance
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-behance-square" />
                <Typography className={classes.materialIconText}>
                  Behance-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-bomb" />
                <Typography className={classes.materialIconText}>Bomb</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-building" />
                <Typography className={classes.materialIconText}>
                  Building
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-cab" />
                <Typography className={classes.materialIconText}>Cab</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-car" />
                <Typography className={classes.materialIconText}>Car</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-child" />
                <Typography className={classes.materialIconText}>
                  Child
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-circle-o-notch" />
                <Typography className={classes.materialIconText}>
                  Circle-o-notch
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-circle-thin" />
                <Typography className={classes.materialIconText}>
                  Circle-thin
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-codepen" />
                <Typography className={classes.materialIconText}>
                  Codepen
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-cube" />
                <Typography className={classes.materialIconText}>Cube</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-cubes" />
                <Typography className={classes.materialIconText}>
                  Cubes
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-database" />
                <Typography className={classes.materialIconText}>
                  Database
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-delicious" />
                <Typography className={classes.materialIconText}>
                  Delicious
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-deviantart" />
                <Typography className={classes.materialIconText}>
                  Deviantart
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-digg" />
                <Typography className={classes.materialIconText}>Digg</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-drupal" />
                <Typography className={classes.materialIconText}>
                  Drupal
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-empire" />
                <Typography className={classes.materialIconText}>
                  Empire
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-envelope-square" />
                <Typography className={classes.materialIconText}>
                  Envelope-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-fax" />
                <Typography className={classes.materialIconText}>Fax</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-archive-o" />
                <Typography className={classes.materialIconText}>
                  File-archive-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-audio-o" />
                <Typography className={classes.materialIconText}>
                  File-audio-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-code-o" />
                <Typography className={classes.materialIconText}>
                  Аile-code-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-excel-o" />
                <Typography className={classes.materialIconText}>
                  Аile-excel-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-image-o" />
                <Typography className={classes.materialIconText}>
                  File-image-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-movie-o" />
                <Typography className={classes.materialIconText}>
                  Аile-movie-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-pdf-o" />
                <Typography className={classes.materialIconText}>
                  File-pdf-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-photo-o" />
                <Typography className={classes.materialIconText}>
                  File-photo-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-picture-o" />
                <Typography className={classes.materialIconText}>
                  File-picture-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-powerpoint-o" />
                <Typography className={classes.materialIconText}>
                  File-powerpoint-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-sound-o" />
                <Typography className={classes.materialIconText}>
                  File-sound-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-video-o" />
                <Typography className={classes.materialIconText}>
                  File-video-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-word-o" />
                <Typography className={classes.materialIconText}>
                  File-word-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-file-zip-o" />
                <Typography className={classes.materialIconText}>
                  File-zip-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-ge" />
                <Typography className={classes.materialIconText}>Ge</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-git" />
                <Typography className={classes.materialIconText}>Git</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-git-square" />
                <Typography className={classes.materialIconText}>
                  Git-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-google" />
                <Typography className={classes.materialIconText}>
                  Google
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-graduation-cap" />
                <Typography className={classes.materialIconText}>
                  Graduation-cap
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-hacker-news" />
                <Typography className={classes.materialIconText}>
                  Hacker-news
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-header" />
                <Typography className={classes.materialIconText}>
                  Header
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-history" />
                <Typography className={classes.materialIconText}>
                  History
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-institution" />
                <Typography className={classes.materialIconText}>
                  Institution
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-joomla" />
                <Typography className={classes.materialIconText}>
                  Joomla
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-jsfiddle" />
                <Typography className={classes.materialIconText}>
                  Jsfiddle
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-language" />
                <Typography className={classes.materialIconText}>
                  Language
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-life-bouy" />
                <Typography className={classes.materialIconText}>
                  Life-bouy
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-life-ring" />
                <Typography className={classes.materialIconText}>
                  Life-ring
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-life-saver" />
                <Typography className={classes.materialIconText}>
                  Life-saver
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-mortar-board" />
                <Typography className={classes.materialIconText}>
                  Mortar-board
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-openid" />
                <Typography className={classes.materialIconText}>
                  Openid
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-paper-plane" />
                <Typography className={classes.materialIconText}>
                  Paper-plane
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-paper-plane-o" />
                <Typography className={classes.materialIconText}>
                  paper-plane-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-paragraph" />
                <Typography className={classes.materialIconText}>
                  Paragraph
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-paw" />
                <Typography className={classes.materialIconText}>Paw</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-pied-piper" />
                <Typography className={classes.materialIconText}>
                  Pied-piper
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-pied-piper-alt" />
                <Typography className={classes.materialIconText}>
                  Pied-piper-alt
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-pied-piper-square" />
                <Typography className={classes.materialIconText}>
                  Pied-piper-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-qq" />
                <Typography className={classes.materialIconText}>Qq</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-ra" />
                <Typography className={classes.materialIconText}>Ra</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-rebel" />
                <Typography className={classes.materialIconText}>
                  Rebel
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-recycle" />
                <Typography className={classes.materialIconText}>
                  Recycle
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-reddit" />
                <Typography className={classes.materialIconText}>
                  Reddit
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-reddit-square" />
                <Typography className={classes.materialIconText}>
                  Reddit-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-send" />
                <Typography className={classes.materialIconText}>Send</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-send-o" />
                <Typography className={classes.materialIconText}>
                  Send-o
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-share-alt" />
                <Typography className={classes.materialIconText}>
                  Share-alt
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-share-alt-square" />
                <Typography className={classes.materialIconText}>
                  Share-alt-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-slack" />
                <Typography className={classes.materialIconText}>
                  Slack
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-sliders" />
                <Typography className={classes.materialIconText}>
                  Sliders
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-soundcloud" />
                <Typography className={classes.materialIconText}>
                  Soundcloud
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-space-shuttle" />
                <Typography className={classes.materialIconText}>
                  Space-shuttle
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-spoon" />
                <Typography className={classes.materialIconText}>
                  Spoon
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-spotify" />
                <Typography className={classes.materialIconText}>
                  Spotify
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-steam" />
                <Typography className={classes.materialIconText}>
                  Steam
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-steam-square" />
                <Typography className={classes.materialIconText}>
                  Steam-square
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-stumbleupon" />
                <Typography className={classes.materialIconText}>
                  Stumbleupon
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-stumbleupon-circle" />
                <Typography className={classes.materialIconText}>
                  Stumbleupon-circle
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-support" />
                <Typography className={classes.materialIconText}>
                  Support
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-taxi" />
                <Typography className={classes.materialIconText}>Taxi</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-tencent-weibo" />
                <Typography className={classes.materialIconText}>
                  Tencent-weibo
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-tree" />
                <Typography className={classes.materialIconText}>Tree</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-university" />
                <Typography className={classes.materialIconText}>
                  University
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-vine" />
                <Typography className={classes.materialIconText}>Vine</Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-wechat" />
                <Typography className={classes.materialIconText}>
                  Wechat
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-weixin" />
                <Typography className={classes.materialIconText}>
                  Weixin
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-wordpress" />
                <Typography className={classes.materialIconText}>
                  Wordpress
                </Typography>
              </Grid>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <i className="fa fa-yahoo" />
                <Typography className={classes.materialIconText}>
                  Yahoo
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
    </>
  );
}
