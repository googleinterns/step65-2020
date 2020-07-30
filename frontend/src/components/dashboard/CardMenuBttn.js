import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {deleteArtwork} from '../../redux/myArtworksActions';
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
  const actionUrl = `api/v1/edit-image?id=${id}`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');
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
    setAge((event.target.value) || '');
  };
  const handlePopUp = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handlePopUpClose = () => {
    setOpen(false);
  };

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
          <form
            name="image-uploads"
            action={actionUrl}
            method="POST"
          >
            <DialogTitle>Edit art information</DialogTitle>
            <DialogContent>
              <div className={classes.container}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-dialog-select-label">Choice</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={age}
                    onChange={handleChange}
                    input={<Input />}
                  >
                    <MenuItem value={'description'}>Description</MenuItem>
                    <MenuItem value={'altText'}>Alt Text</MenuItem>
                  </Select>
                  <TextField
                    required
                    id="image-info"
                    className={classes.padding}
                    label="New Content"
                    multiline
                    name="description"
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
              <Button type="submit" color="primary">
              Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

CardMenuBttn.propTypes = {
  id: PropTypes.string.isRequired,
};

