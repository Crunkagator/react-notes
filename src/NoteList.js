import React from "react";
import { Note } from "./Note";

export const NoteList = props => {
	const Notes = props.data.map((item, index) => (
		<Note
			key={index}
			Text={item}
			deleteHandler={props.deleteHandler}
			editHandler={props.editHandler}
			editMode={props.editMode}
		/>
	));
	return <div className="NoteList">{Notes}</div>;
};
