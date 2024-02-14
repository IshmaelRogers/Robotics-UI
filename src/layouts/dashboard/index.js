/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";
import React, { useState, useEffect, Component } from 'react';


// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [apiResults, setApiResults] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [swimSpeed, setSwimSpeed] = useState('');
  const [departureWindowHours, setDepartureWindowHours] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [diveParams, setDiveParams] = useState(null);
  const [routeAlgorithm, setRouteAlgorithm] = useState('defaultAlgorithm');
  // Existing state definitions
const [userLocation, setUserLocation] = useState({ lat: '', lon: '' });
const [loading, setLoading] = useState(true);
const [chartData, setChartData] = useState([]);
  

  // Function to receive data from SatisfactionRate
  const handleDiveParamsSubmit = (params) => {
    // Update all necessary states with the received parameters
  setStartDate(params.isoTimeStart.split('T')[0]);
  setStartTime(params.isoTimeStart.split('T')[1].slice(0, -3)); // Assuming isoTimeStart is in the format 'YYYY-MM-DDTHH:MM:SS'
  setSwimSpeed(params.swimSpeed);
  setDepartureWindowHours(params.departureWindowHours);
  setRouteAlgorithm(params.routeAlgorithm);
  console.log("Received from SatisfactionRate:", params);
    // Here you can also trigger the API call with these params
  };
  
  const handleWaypointsChange = (updatedWaypoints) => {
    setWaypoints(updatedWaypoints);
    console.log(waypoints); // Here you can handle the waypoints, e.g., prepare them for an API call
  };
  // In Dashboard component
  const fetchApiData = async () => {
    setLoading(true); // Before the fetch call
    const formattedIsoTimeStart = `${startDate}T${startTime}:00`;
    const requestBody = {
      waypoints: waypoints.map(wp => ({ lat: wp.lat, lon: wp.lng })),
      iso_time_start: formattedIsoTimeStart,
      swim_speed: parseFloat(swimSpeed),
      departure_window_hours: parseInt(departureWindowHours, 10),
      route_algorithm: routeAlgorithm,
      ocean_model: "auto",
    };

    console.log('Sending API request with:', requestBody);

    try {
      const response = await fetch('http://api.current-lab.com:8000/currentroute', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-API-Key': 'b0a47781a2be71469886ff1df8d24a0e',
          'Content-Type': 'application/json',  
        },
        mode: 'cors',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResults(data);
      console.log('API response data:', data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the fetch, regardless of the outcome
    }
    
    
  };

  // Trigger fetchApiData when necessary states change
  useEffect(() => {
    if (startDate && startTime && !isNaN(swimSpeed) && !isNaN(departureWindowHours) && waypoints.length > 0) {
      fetchApiData();
    }
  }, [startDate, startTime, swimSpeed, departureWindowHours, waypoints]); 

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude.toFixed(3),
              lon: position.coords.longitude.toFixed(3),
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }
    };
  
    fetchUserLocation();
  }, []); // Empty dependency array means this effect runs once on mount
  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "weather info", fontWeight: "regular" }}
                count="Wind Speed "
                percentage={{ color: "success", text: "54 mph" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Calendar" }}
                count="Today's Date "
                percentage={{ color: "success", text: "02/18/2024" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Geographics" }}
                count={`Lat ${userLocation.lat} Lon ${userLocation.lon}`}
               //percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ocean Model" }}
                count="Model Accuracy "
                percentage={{ color: "success", text: "+95%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
            
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
            <WelcomeMark onWaypointsChange={handleWaypointsChange} 
            userPos={userLocation}/>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
          <SatisfactionRate 
          onSubmit={handleDiveParamsSubmit}
            //setSwimSpeed={setSwimSpeed} 
            //setDepartureWindowHours={setDepartureWindowHours}
            //setWaypoints={waypoints}
          />
          </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking apiData={apiResults} loading={loading}  />
            </Grid>
          </Grid>
        </VuiBox>
        <button onClick={fetchApiData} style={{ margin: '20px' }}>Send API Request</button>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Data Plotter
                  </VuiTypography>
                  
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Compare Profiles
                  </VuiTypography>
                  
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
        {/* This VuiBox contains SatisfactionRate and ReferralTracking components */}
        
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
