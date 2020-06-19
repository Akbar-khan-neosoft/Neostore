import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import '../../../Assets/CSS/Footer.css';
import { Link } from 'react-router-dom';
import { URL } from '../../../Redux/Constants/index';
import { EMAIL_REGEX} from '../../../Utils/validation'


class Footer extends Component {
	constructor() {
		super();
		this.state = {
			getTermsAndConditions_res: '',
			getGuarantee_res: '',
			getData: '',
			email: '',
			emailError:false,
			emailErrorMessage:'',
			disableSubscribeButton:true

		};
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({ email: e.target.value })
	}
	componentDidMount() {
		let one = URL + 'getTermsAndConditions';
		let two = URL + 'getGuarantee';
		let three = URL + 'getData';
		const getTermsAndConditions = axios.get(one);
		const getGuarantee = axios.get(two);
		const getData = axios.get(three);

		axios.all([getTermsAndConditions, getGuarantee, getData]).then(
			axios.spread((...res) => {
				this.setState({ getTermsAndConditions_res: res[0].data });
				this.setState({ getGuarantee_res: res[1].data });
				this.setState({ getData_res: res[2].data });
			})
		);
	}

	validate=()=>{
		if(this.state.email.length < 1){
			this.setState({emailError:true,emailErrorMessage:"Email Id Is Required",disableSubscribeButton:true})
		} else if(this.state.email.length > 0 && !EMAIL_REGEX.test(this.state.email)){
			this.setState({emailError:true,emailErrorMessage:"Invalid Email Id",disableSubscribeButton:true})
		} else {
			this.setState({emailError:false,disableSubscribeButton:false})
		}
	}

	onSubmitHandle=(e)=>{
		e.preventDefault();
		this.props.history.push({
			pathname: '/subscriber',
			state: { email: this.state.email }
		  })
	}

	render() {
		
		return (
			<div className="container-footer">
				<div className="footer-content">
					<div className="footer-content-container">
						<div className="footer-content-title">About Company</div>
						<br></br>

						{this.state.getData_res
							? [this.state.getData_res].map(res => {
								return (
									<div className="footer-content-body" key={res.company_details[0].phone_no}>
										{res.company_details[0].about_company}
										<br></br>
											Contact information
										<br></br>
											Email : {res.company_details[0].email}
										<br></br>
											Phone : {res.company_details[0].phone_no}
										<br></br>
										{res.company_details[0].address}
									</div>
								);
							})
							: []}
					</div>
					<div className="footer-content-container">
						<div className="footer-content-title">Information</div>
						<br></br>
						<div className="footer-content-body">
							<ul style={{ listStyle: 'none' }}>
								{this.state.getTermsAndConditions_res
									? [this.state.getTermsAndConditions_res].map(res => {
										return (
											<li key={res.termsAndConditions_details[0].fileName}>
												<a

													style={{ textDecoration: 'none', color: 'white' }}
													target="_blank"
													href={URL + res.termsAndConditions_details[0].fileName}
												>
													Terms and Conditions
													</a>
											</li>
										);
									})
									: ''}
								{this.state.getGuarantee_res
									? [this.state.getGuarantee_res].map(res => {
										return (
											<li key={res.guarantee_details[0].fileName}>
												<a
													style={{ textDecoration: 'none', color: 'white' }}
													target="_blank"
													href={URL + res.guarantee_details[0].fileName}
												>
													Gurantee and Return Policy
													</a>
											</li>
										);
									})
									: ''}
								<li>
									<Link to="/contactus" style={{ textDecoration: 'none', color: 'white' }}>
										Contact Us
									</Link>
								</li>
								<li>
									<span style={{ textDecoration: 'none', color: 'white' }}>
										Privacy Policy
									</span>
								</li>
								<li>
									<Link to="/locateus" style={{ textDecoration: 'none', color: 'white' }}>
										Locate Us
									</Link>
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
								<div><input type="text" name="email" value={this.state.email} placeholder="Your Email" style={{ width: '50%' }} onChange={this.onChange} onBlur={this.validate}></input>
								<br></br>{this.state.emailError && (
									<span style={{color:"red",fontWeight:"700"}}>{this.state.emailErrorMessage}</span>
								)}
								</div>
								<br></br>
								<br></br>
								<button disabled={this.state.disableSubscribeButton} style={{ width: '40%', borderRadius: '10px' }} onClick={this.onSubmitHandle}>Subscribe</button>
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

export default withRouter(Footer);
