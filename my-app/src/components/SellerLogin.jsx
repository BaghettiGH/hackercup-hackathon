import React from "react";

const SellerLogin = ({ onClose }) => (
	<div className="modal">
		<div className="modal-content">
			<h2>Seller Login</h2>
			{/* Seller login form fields */}
			<input type="text" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Login</button>
			<button onClick={onClose}>Close</button>
		</div>
	</div>
);

export default SellerLogin;
