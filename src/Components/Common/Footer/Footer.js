import React, { Component } from 'react';
import '../../../Assets/CSS/Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<div className="container-footer">
				<div className="footer-content">
					<div className="footer-content-container">
						<div className="footer-content-title">About Company</div>
						<br></br>
						<div className="footer-content-body">
							NeoSOFT Technologies is here at your quick and easy service for shooping .<br></br>
							Contact information
							<br></br>Email: contact@neosofttech.com
							<br></br>
							Phone: +91 0000000000
							<br></br>MUMBAI, INDIA
						</div>
					</div>
					<div className="footer-content-container">
						<div className="footer-content-title">Information</div>
						<br></br>
						<div className="footer-content-body">
							<ul style={{ listStyle: 'none' }}>
								<li>
									<a
										style={{ textDecoration: 'none', color: 'white' }}
										href="http://180.149.241.208:3022/2019-06-28T06-10-29.263ZTerms_and_Conditions.pdf"
									>
										Terms and Conditions
									</a>
								</li>
								<li>
									<a
										style={{ textDecoration: 'none', color: 'white' }}
										href="http://180.149.241.208:3022/2019-06-28T06-11-38.277ZGuarantee_ReturnPolicy.pdf"
									>
										Gurantee and Return Policy
									</a>
								</li>
								<li>
									<Link to="/contactus" style={{ textDecoration: 'none', color: 'white' }}>
										Contact Us
									</Link>
								</li>
								<li>
									<a style={{ textDecoration: 'none', color: 'white' }} href="#">
										Privacy Policy
									</a>
								</li>
								<li>
									<a style={{ textDecoration: 'none', color: 'white' }} href="#">
										Locate Us
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-content-container">
						<div className="footer-content-title">Newsletter</div>
						<br></br>
						<div className="footer-content-body">
							Signup to get exclusive offer from our favorite brands and to be well up in the news
							<br></br>
							<br></br>
							<form>
								<input type="text" placeholder="Your Email" style={{ width: '50%' }}></input>
								<br></br>
								<br></br>
								<button style={{ width: '40%', borderRadius: '10px' }}>Subscribe</button>
							</form>
						</div>
					</div>
				</div>
				<div className="footer-info">
					Copyright 2017 NeoSOFT Technologies All rights reserved | Design By Akbar Khan | Guided By Ketan
					Kulkarni
				</div>
			</div>
		);
	}
}

export default Footer;
