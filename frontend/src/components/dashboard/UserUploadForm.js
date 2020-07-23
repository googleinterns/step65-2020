import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
  file: {
    height: '40px',
    width: '75ch',
  }
}));

export default function UserUploadForm(props) {

  const onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        if(e.target.files.length > 0) {
          // Accessed .name from file 
          setName(e.target.files[0].name);
        }
      break;
      default:
        setName( e.target.value);
     }
  };

  useEffect(() => {
    fetch('/api/v1/uploadImgs')
        .then((response) => {
          return response.text();
        })
        .then((imageUploadUrl) => {
          setURL(imageUploadUrl);
        });
  },[]);

  const classes = useStyles();
  
  const redirectUrl = document.location.origin + '/user-uploads-gallery';

  const [fileName, setName] = useState('');
  let file = null;

  const [actionURL, setURL] = useState('');

  file = fileName 
      ? ( <span>File Selected - {fileName}</span>) 
      : ( <span>Choose a file...</span> );

  return(
      <>
        <form name="image-upload" action={actionURL} method="POST" encType="multipart/form-data">
          <input type="hidden" name="redirectUrl" value={redirectUrl} />
          <Grid
            className={classes.root}
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
                id="alt-text"
                label="Alt Text"
                name="altText"
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
            alignItems="center"
            container 
            className={classes.root}
            justify="center" 
            spacing={2}
          >
            <Grid item xs={8}>
              <Box 
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                bgcolor="grey.300"
              >
                {file}
              </Box>
            </Grid>
            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                id="select-file"
                type="file"
                name="selectedFile"
                onChange={onChange}
              />
              <label htmlFor="select-file">
                <Button 
                  variant="contained" 
                  color="primary" 
                  component="span"
                  id="shown-button"
                  startIcon={<PhotoUploadIcon />}
                >
                  Select File
                </Button>
              </label>
            </Grid>
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
