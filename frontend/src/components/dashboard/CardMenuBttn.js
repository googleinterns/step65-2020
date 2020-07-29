import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import {deleteArtwork} from '../../redux/myArtworksActions';

export default function CardMenuBttn({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const auth = useSelector(
      (state) => state.firebase.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteArtwork(id, auth.uid));
  };

  return (
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
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

CardMenuBttn.propTypes = {
  id: PropTypes.string.isRequired,
};
