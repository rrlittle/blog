import React, { Component } from "react";
import { Menu, Input, Form, Button } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

export default class auth extends Component {
	state = {
		loggedIn: localStorage.getItem("token") ? true : false,
		username: "",
		password: ""
	};
	handlelogout = e => {
		e.preventDefault();
		this.setState({ loggedIn: false });
		localStorage.removeItem("token");
		this.props.setLogin(false);
	};
	handlelogin = e => {
		e.preventDefault();
		fetch("http://localhost:8000/api-auth-token/", {
			method: "post",
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				response
					.json()
					.then(data => {
						if (data.token) {
							localStorage.setItem("token", data.token);
						}
						this.setState({ loggedIn: data.token ? true : false });
						this.props.setLogin(true);
						return data;
					})
					.catch(error => {
						console.log(error);
						return error;
					});
				return response;
			})
			.catch(error => {
				console.log(error);
				return error;
			});
	};
	componentWillMount = () => {
		this.props.setLogin(this.state.loggedIn);
	};
	render() {
		return (
			<Menu.Menu position="right">
				<Switch location={{ pathname: String(this.state.loggedIn) }}>
					<Route path="false">
						<div>
							<Menu.Item>
								<Input
									className="icon"
									icon="user"
									placeholder="Username"
									onChange={(e, d) => {
										this.setState({ username: d.value });
									}}
								/>
							</Menu.Item>
							<Menu.Item>
								<Input
									placeholder="Password"
									type="password"
									onChange={(e, d) => {
										this.setState({ password: d.value });
									}}
								/>
							</Menu.Item>
						</div>
					</Route>
				</Switch>
				<Button
					type="submit"
					content={this.state.loggedIn ? "log out" : "login"}
					onClick={this.state.loggedIn ? this.handlelogout : this.handlelogin}
				/>
			</Menu.Menu>
		);
	}
}
