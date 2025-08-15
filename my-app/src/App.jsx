import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SupplierDashboard from './pages/supplier'
import Login from './pages/login'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import WebNavigator from './navigator/WebNavigator';

export default function App() {
  return <WebNavigator />;
}
