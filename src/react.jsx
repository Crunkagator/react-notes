import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faFileCode } from '@fortawesome/free-solid-svg-icons';

library.add([faTrash, faEdit, faFileCode]);

class Note extends Component {
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
    let NoteControls =
      this.props.editMode === false ? (
        <div className='Note--controls'>
          <button
            onClick={this.deleteHandler}
            className='Note--controls_delete'>
            <FontAwesomeIcon icon='trash' />
          </button>
          <button onClick={this.editHandler} className='Note--controls_edit'>
            <FontAwesomeIcon icon='edit' />
          </button>
        </div>
      ) : (
        <button disabled>
          <FontAwesomeIcon icon='edit' />
        </button>
      );

    return (
      <div className='Note'>
        <div className='Note--text'>{this.props.Text}</div>
        {NoteControls}
      </div>
    );
  }
}

const NoteList = props => {
  const Notes = props.data.map((item, index) => (
    <Note
      key={index}
      Text={item}
      deleteHandler={props.deleteHandler}
      editHandler={props.editHandler}
      editMode={props.editMode}
    />
  ));
  return <div className='NoteList'>{Notes}</div>;
};

class InputControls extends Component {
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
        <button className='Controls--submitMode' onClick={this.insertHandler}>
          Submit New Note
        </button>
      ) : (
        <div>
          <button
            className='Controls--editMode'
            onClick={this.props.saveHandler}>
            Save
          </button>
          <button
            className='Controls--editMode'
            onClick={this.props.cancelHandler}>
            Cancel
          </button>
        </div>
      );

    return (
      <div className='Controls'>
        <input
          placeholder='Type something here'
          className='Controls--input'
          value={this.props.inputValue}
          onChange={this.inputHandler}
        />
        <div>{InputControlsBtn}</div>
      </div>
    );
  }
}

class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: [],
      error: '',
      editMode: false,
      editIndex: null,
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.checkNewNote = this.checkNewNote.bind(this);
    this.insertHandler = this.insertHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
  }

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('Notes'))
      ? JSON.parse(localStorage.getItem('Notes'))
      : [];
    this.setState({ data: data });
  }

  checkNewNote() {
    if (this.state.input === '') {
      this.setState({ error: 'Empty input!' });
      return;
    } else {
      const checkNote = this.state.data.every(
        a => a !== this.state.input.trim()
      );
      if (checkNote === false) {
        this.setState({ error: 'You already have this note' });
        return;
      } else return true;
    }
  }

  insertHandler() {
    if (!this.checkNewNote()) return;
    const newNotes = this.state.data.concat(this.state.input);
    localStorage.setItem('Notes', JSON.stringify(newNotes));
    this.setState({ data: newNotes, input: '' });
  }

  deleteHandler(DelNote) {
    const filtered = this.state.data.filter(Note => Note !== DelNote);
    localStorage.setItem('Notes', JSON.stringify(filtered));
    this.setState({ data: filtered });
  }

  editHandler(Note) {
    const editIndex = this.state.data.indexOf(Note);
    this.setState({ editMode: true, input: Note, editIndex: editIndex });
  }

  saveHandler() {
    if (!this.checkNewNote()) return;
    this.state.data.splice(this.state.editIndex, 1, this.state.input);
    localStorage.setItem('Notes', JSON.stringify(this.state.data));
    this.setState({ input: '', editIndex: null, editMode: false });
  }

  cancelHandler() {
    this.setState({ input: '', editIndex: null, editMode: false });
  }

  inputHandler(Text) {
    this.setState({ input: Text, error: '' });
  }

  render() {
    const NoteCounter = this.state.data.length ? (
      <div>Notes count: {this.state.data.length}</div>
    ) : (
      <div>No notes around here</div>
    );
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>
            <FontAwesomeIcon icon='file-code' /> React Notes
          </h1>
          <div>{this.state.error}</div>
          <InputControls
            inputHandler={this.inputHandler}
            insertHandler={this.insertHandler}
            inputValue={this.state.input}
            editMode={this.state.editMode}
            saveHandler={this.saveHandler}
            cancelHandler={this.cancelHandler}
          />
          {NoteCounter}
          <NoteList
            data={this.state.data}
            deleteHandler={this.deleteHandler}
            editHandler={this.editHandler}
            editMode={this.state.editMode}
          />
        </header>
      </div>
    );
  }
}

ReactDOM.render(<NotesApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
