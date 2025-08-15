import React, { useState } from "react";
import SellerLogin from "../components/SellerLogin";
import SellerSignup from "../components/SellerSignup";
import CustomerLogin from "../components/CustomerLogin";
import CustomerSignup from "../components/CustomerSignup";

const AuthNavigator = () => {
	const [modal, setModal] = useState(null);

	const openModal = (type) => setModal(type);
	const closeModal = () => setModal(null);

	return (
		<div>
			<h1>Welcome! Please choose your login or signup type:</h1>
			<div style={{ display: "flex", gap: "1rem" }}>
				<button onClick={() => openModal("seller-login")}>Seller Login</button>
				<button onClick={() => openModal("seller-signup")}>Seller Signup</button>
				<button onClick={() => openModal("customer-login")}>Customer Login</button>
				<button onClick={() => openModal("customer-signup")}>Customer Signup</button>
			</div>

			{modal === "seller-login" && <SellerLogin onClose={closeModal} />}
			{modal === "seller-signup" && <SellerSignup onClose={closeModal} />}
			{modal === "customer-login" && <CustomerLogin onClose={closeModal} />}
			{modal === "customer-signup" && <CustomerSignup onClose={closeModal} />}
		</div>
	);
};

export default AuthNavigator;
