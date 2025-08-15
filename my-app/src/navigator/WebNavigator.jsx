import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import HomeScreen from "../pages/HomeScreen";
import Login from "../pages/login";
import SupplierProductDashboard from "../pages/supplier";
import About from "../pages/About"; 
import CartScreen from "../pages/CartScreen";

const webRoutes = [
	{ path: "/", element: <Login />},
	{ path: "/home", element: <MainLayout><HomeScreen/></MainLayout>},
	{ path: "/supplierdashboard", element: <MainLayout><SupplierProductDashboard/></MainLayout> },
	{ path: "/about", element: <MainLayout><About/></MainLayout> },
	{ path: "/cart", element: <MainLayout><CartScreen/></MainLayout>}
];

const WebNavigator = () => (
	<Router>
		<Routes>
			{webRoutes.map(({ path, element }, idx) => (
				<Route key={idx} path={path} element={element} />
			))}
		</Routes>
	</Router>
);

export default WebNavigator;
