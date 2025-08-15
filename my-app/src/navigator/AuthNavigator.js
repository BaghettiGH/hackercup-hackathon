import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your authentication screens
// Example: import LoginScreen from "../screens/LoginScreen";
// Example: import RegisterScreen from "../screens/RegisterScreen";

// Placeholder components for demonstration
const LoginScreen = () => <div>Login</div>;
const RegisterScreen = () => <div>Register</div>;

const authRoutes = [
	{ path: "/login", element: <LoginScreen /> },
	{ path: "/register", element: <RegisterScreen /> },
	// Add more auth-related routes here
];

const AuthNavigator = () => (
	<Router>
		<Routes>
			{authRoutes.map(({ path, element }, idx) => (
				<Route key={idx} path={path} element={element} />
			))}
		</Routes>
	</Router>
);

export default AuthNavigator;
