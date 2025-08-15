import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import CartScreen from "../pages/CartScreen";

// Example: Modular route config for web-specific routes
const webRoutes = [
	{ path: "/", element: <HomeScreen /> },
	{ path: "/cart", element: <CartScreen /> },
	// Add more web-specific routes here
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
