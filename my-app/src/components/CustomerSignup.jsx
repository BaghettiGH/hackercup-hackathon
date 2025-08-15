import React from "react";

const CustomerSignup = ({ onClose }) => (
	<div className="modal">
		<div className="modal-content">
			<h2>Customer Signup</h2>
			{/* Customer signup form fields */}
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
			<button onClick={onClose}>Close</button>
		</div>
	</div>
);

export default CustomerSignup;
