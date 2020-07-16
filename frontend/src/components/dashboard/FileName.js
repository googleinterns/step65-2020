import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoUploadIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginLeft: 0,
      width: '150ch',
    },
    height: '40px',
    margin: theme.spacing(1),
    width: '75ch',
  },
  input: {
    display: 'none',
  },
}));

export default function FileName(props) {

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
          console.log(imageUploadUrl);
          setURL(imageUploadUrl);
        });
  },[]);

  const classes = useStyles();

  const [fileName, setName] = useState('');
  let file = null;

  const [actionURL, setURL] = useState('');

  file = fileName 
      ? ( <span>File Selected - {fileName}</span>) 
      : ( <span>Choose a file...</span> );

  return(
      <>
        <form name="image-upload" action={actionURL} method="POST" encType="multipart/form-data">
          <Grid 
          alignItems="center"
          container 
          className={classes.root}
          justify="flex-start" 
          spacing={2}
          >
            <Grid item xs={8}>
              <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="grey.300">
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
              <input type="submit" />
            </Grid>
          </Grid>
        </form>
      </>
  );
}
