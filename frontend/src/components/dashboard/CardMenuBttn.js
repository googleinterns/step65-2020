import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {deleteArtwork, editInformation} from '../../redux/myArtworksActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '450px',
  },
  padding: {
    marginTop: theme.spacing(2),
  },
}));

export default function CardMenuBttn({id}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [newInfo, setNewInfo] = useState('test');
  const [selection, setSelection] = useState('');
  const [editDone, setEditDone] = useState(false);
  const auth = useSelector(
      (state) => state.firebase.auth);

  // Menu Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    dispatch(deleteArtwork(id, auth.uid));
  };

  // PopUp functions
  const handleChange = (event) => {
    setSelection((event.target.value));
  };
  const handlePopUp = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handlePopUpClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setNewInfo(document.getElementById('image-info').value);
    setEditDone(true);
  };

  useEffect(() => {
    if (editDone) {
      dispatch(editInformation(
          id, auth.uid, selection, newInfo));
      (setEditDone(false));
    }
  }, [dispatch, editDone, id, auth.uid, selection, newInfo]);

  return (
    <>
      <div>
        <IconButton
          aria-label="image options menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handlePopUp}>Modify</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Edit art information</DialogTitle>
          <DialogContent>
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="selection-label">Selection</InputLabel>
                <Select
                  aria-label="Select what to edit"
                  name="selection"
                  value={selection}
                  onChange={handleChange}
                  labelId="selection-label"
                  input={<Input id="selection" />}
                >
                  <MenuItem value="artTitle">Title</MenuItem>
                  <MenuItem value="artistName">Artist Name</MenuItem>
                  <MenuItem value="description">Description</MenuItem>
                  <MenuItem value="altText">Alt Text</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  id="image-info"
                  className={classes.padding}
                  label="New Content"
                  multiline
                  name="image-info"
                  placeholder="In this image..."
                  rows = {4}
                  variant="outlined"
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopUpClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

CardMenuBttn.propTypes = {
  id: PropTypes.string.isRequired,
};

