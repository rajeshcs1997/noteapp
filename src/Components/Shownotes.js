import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const useStyle = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function Shownotes(props) {
  const classes = useStyles();
  const classe = useStyle();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [resetTitle, setResetTitle] = useState("");
  const [resetContent, setResetContent] = useState("");
  const [editId, setEditId] = useState("");

	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('notes')) || [];
		setNotes(items)
  },[notes]);

  const handleEditClick = (e,res) => {
    e.preventDefault();
    setOpen(true);
    setResetTitle(res.title)
    setResetContent(res.content)
    setEditId(res.id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleResetTitleChange = (e) => {
    setResetTitle(e.target.value)
  };
  const handleResetContentChange = (e) => {
    setResetContent(e.target.value)
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const items = notes
    items?.map(item=>{
      if(item.id===editId){
        item.title= resetTitle;
        item.content=resetContent
      }
    })
    setNotes(items);
    let data=notes;
    setNotes(data);
    localStorage.setItem('notes', JSON.stringify(notes));
    setOpen(false);
  }
  const handleDeleteClick = (e,res) =>{
    let it = notes
    let it1=it.filter(val=>val.id !=res.id)
    setNotes(it1);
    let data=it1;
    //setNotes(data);
    localStorage.setItem('notes', JSON.stringify(data));
  }
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor: "rgb(64, 86, 161)", color: "white"}}>
              <TableCell style={{color: "white", fontWeight: "bold"}}>Title</TableCell>
              <TableCell style={{color: "white", fontWeight: "bold"}} align="right">Content</TableCell>
              <TableCell style={{color: "white", fontWeight: "bold"}} align="right">Date</TableCell>
              <TableCell style={{color: "white", fontWeight: "bold"}} align="right">Edit Note</TableCell>
              <TableCell style={{color: "white", fontWeight: "bold"}} align="right">Delete Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes && notes.map((res) => (
              (res.date === props.value.toDateString()) ?(<TableRow key={res.title}>
                <TableCell component="th" scope="row">
                  {res.title}
                </TableCell>
                <TableCell align="right">{res.content}</TableCell>
                <TableCell align="right">{res.date}</TableCell>
                <TableCell align="right"><Button type="submit" variant="contained" color="primary" onClick={(e)=>handleEditClick(e,res)}>Edit</Button>
                </TableCell>
                <TableCell align="right"><Button type="submit" variant="contained" color="primary" onClick={(e)=>handleDeleteClick(e,res)}>Delete</Button>
                </TableCell>
              </TableRow>): null
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Your Notes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
            <div>
              <h1 style={{display: "flex", justifyContent: "center", color: "#3f51b5"}}>Edit Note</h1>
              <form className={classe.root} autoComplete="off" onSubmit={handleEditSubmit}>
                <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                defaultValue={resetTitle}
                onChange={(e)=>handleResetTitleChange(e)} 
                />
                <TextField
                id="outlined-basic"
                label="Content"
                variant="outlined"
                defaultValue={resetContent}
                onChange={(e)=>handleResetContentChange(e)} 
                />
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </form>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}