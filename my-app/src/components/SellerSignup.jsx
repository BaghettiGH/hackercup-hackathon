import React from "react";

const SellerSignup = ({ onClose }) => (
	<div className="modal">
		<div className="modal-content">
			<h2>Seller Signup</h2>
			{/* Seller signup form fields */}
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
			<button onClick={onClose}>Close</button>
		</div>
	</div>
);

export default SellerSignup;
