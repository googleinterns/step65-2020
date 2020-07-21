import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileName from './FileName';

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
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        action="/api/v1/uploadInfo"
        method="POST"
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <div>
            <TextField
              required
              id="artist-name"
              label="Artist Name"
              name="artistName"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              required
              id="art-title"
              label="Art Title"
              name="artTitle"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              required
              id="image-info"
              label="Image Description"
              multiline
              name="description"
              placeholder="In this image..."
              rows = {4}
              variant="outlined"
            />
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div>
            <FileName/>
          </div>
        </Grid>
        <Box m={4} />
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.root}
        >
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Submit Artwork
            </Button>
          </div>
        </Grid>
      </form>

    </>
  );
}
