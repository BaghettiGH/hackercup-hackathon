import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SupplierDashboard from './pages/supplier'
import Login from './pages/login'
import { BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<SupplierDashboard/>}/>

    </Routes>    
    </BrowserRouter>
  )
}

export default App
