import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PhotoUploadIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginLeft: 0,
      width: '150ch',
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadsFields() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
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
                multiline
                placeholder="In this image..."
                rows = {4}
                variant="outlined"
            />
            </div>
        </form>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <div className={classes.root} >
            <input
              accept="image/*"
              className={classes.input}
              id="select-file"
              multiple
              type="file"
            />
            <label htmlFor="select-file">
            <Button 
                variant="contained" 
                color="primary" 
                component="span"
                startIcon={<PhotoUploadIcon />}
                >
                Select File
            </Button>
            </label>
            <div id="fileNameCont" />
        </div>
      </Grid>
      <Box m={4} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Button variant="contained" color="secondary">
          Submit Artwork
        </Button>
      </Grid>
    </>
  );
}
