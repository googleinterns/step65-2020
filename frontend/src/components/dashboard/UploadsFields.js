import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PhotoUploadIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      marginLeft: 0,
      width: '25ch',
    },
  },
  input: {
    display: 'none',
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField required id="first-name" label="First Name" variant="outlined" />
        </div>
        <div>
          <TextField id="last-name" label="Last Name" variant="outlined" />
        </div>
        <div>
          <TextField
            required
            id="image-info"
            label="Image Description"
            placeholder="In this image..."
            multiline
            variant="outlined"
          />
        </div>
      </form>
      <div className={classes.root} >
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button 
            variant="contained" 
            color="primary" 
            component="span"
            startIcon={<PhotoUploadIcon />}
            >
            Select File
          </Button>
        </label>
      </div>
      <Box m={16} />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Button variant="contained" color="secondary">
          Submit Artwork
        </Button>
      </Grid>
    </>
  );
}
