import React, { Component } from "react";

export class InputControls extends Component {
	constructor(props) {
		super(props);
		this.inputHandler = this.inputHandler.bind(this);
		this.insertHandler = this.insertHandler.bind(this);
	}
	inputHandler(event) {
		return this.props.inputHandler(event.target.value);
	}
	insertHandler() {
		return this.props.insertHandler();
	}
	render() {
		let InputControlsBtn =
			this.props.editMode === false ? (
				<button className="Controls--submitMode" onClick={this.insertHandler}>
					Submit New Note
				</button>
			) : (
				<>
					<button className="Controls--editMode" onClick={this.props.saveHandler}>
						Save
					</button>
					<button className="Controls--editMode" onClick={this.props.cancelHandler}>
						Cancel
					</button>
				</>
			);
		return (
			<div className="Controls">
				<input
					placeholder="Type something here"
					className="Controls--input"
					value={this.props.inputValue}
					onChange={this.inputHandler}
				/>
				{InputControlsBtn}
			</div>
		);
	}
}
