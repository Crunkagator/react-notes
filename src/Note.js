import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Note extends Component {
	constructor(props) {
		super(props);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.editHandler = this.editHandler.bind(this);
	}
	deleteHandler() {
		return this.props.deleteHandler(this.props.Text);
	}
	editHandler() {
		return this.props.editHandler(this.props.Text);
	}
	render() {
		let NoteControls = (
			<div className="Note--controls">
				<button
					onClick={this.deleteHandler}
					className="Note--controls_delete"
					disabled={this.props.editMode ? true : null}
				>
					<FontAwesomeIcon icon="trash" />
				</button>
				<button
					onClick={this.editHandler}
					className="Note--controls_edit"
					disabled={this.props.editMode ? true : null}
				>
					<FontAwesomeIcon icon="edit" />
				</button>
			</div>
		);
		return (
			<div className="Note">
				<div className="Note--text">{this.props.Text}</div>
				{NoteControls}
			</div>
		);
	}
}
