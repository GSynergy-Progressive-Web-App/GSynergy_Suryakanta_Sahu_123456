import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import StoreDimensionScreen from 'components/Dashboards/StoreDimension/StoreDimensionScreen';
import SKUDimensionScreen from 'components/Dashboards/SKUDimension/SKUDimensionScreen';
import ChartScreen from 'components/Dashboards/Chart/ChartScreen';
import PlanningScreen from './components/Dashboards/PlanningDimension/PlanningScreen';

const App = () => {
  return (
    // <Router>
    <Routes>
      <Route path="/StoreDashboard" element={<StoreDimensionScreen />} />
      <Route path="/SKUDashboard" element={<SKUDimensionScreen />} />
      <Route path="/PlanningDashboard" element={<PlanningScreen />} />
      <Route path="/ChartDashboard" element={<ChartScreen />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
    </Routes>
    // </Router>
  );
};

export default App;
