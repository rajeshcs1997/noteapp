import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function Addnotes(props) {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [notes, setNotes] = useState([]);

	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('notes')) || [];
		setNotes(items)
  },[]);

	const handleTitleChange = (e) =>{
		setTitle(e.target.value);
	}
	const handleContentChange = (e) =>{
		setContent(e.target.value);
	}
  const handleNoteSubmit = (e) =>{
  	e.preventDefault();
  	let fdata = {id:uuidv4(),date:props.value.toDateString(),title:title,content:content}
  	let data=notes;
		data.push(fdata);
		setNotes(data);
		localStorage.setItem('notes', JSON.stringify(notes));
		setTitle("");
		setContent("");
	}
  return (
  	<div>
  		<h1 style={{display: "flex", justifyContent: "center", color: "#3f51b5"}}>Add Note</h1>
  		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleNoteSubmit}>
			  <TextField
			  id="outlined-basic"
			  label="Title"
			  variant="outlined"
			  value={title}
			  onChange={handleTitleChange} />
			  <TextField
			  id="outlined-basic"
			  label="Content"
			  variant="outlined"
			  value={content}
			  onChange={handleContentChange} />
			  <Button type="submit" variant="contained" color="primary">
				  Submit
				</Button>
			</form>
  	</div>
  	);
}

export default Addnotes;