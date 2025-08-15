import React from "react";

const CustomerLogin = ({ onClose }) => (
	<div className="modal">
		<div className="modal-content">
			<h2>Customer Login</h2>
			{/* Customer login form fields */}
			<input type="text" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Login</button>
			<button onClick={onClose}>Close</button>
		</div>
	</div>
);

export default CustomerLogin;
