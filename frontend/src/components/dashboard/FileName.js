import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoUploadIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = theme => ({
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
});

class FileName extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
       fileName: '',
    };
  }

  onChange = e => {

    switch (e.target.name) {
      case 'selectedFile':
        if(e.target.files.length > 0) {
            // Accessed .name from file 
            this.setState({ fileName: e.target.files[0].name });
        }
      break;
      default:
        this.setState({ [e.target.name]: e.target.value });
     }
  };

  render(){
    const { classes } = this.props;

    const { fileName } = this.state;
    let file = null;

    file = fileName 
      ? ( <span>File Selected - {fileName}</span>) 
      : ( <span>Choose a file...</span> );

    return(
      <>
        <form onSubmit={this.onSubmit}>
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
                aria-label="select file"
                className={classes.input}
                id="select-file"
                type="file"
                name="selectedFile"
                onChange={ (event) => this.onChange(event) }
              />
              <label htmlFor="select-file">
                <Button 
                  variant="contained" 
                  color="primary" 
                  component="span"
                  id="shown-button"
                  startIcon={<PhotoUploadIcon />}
                  onClick={ (event) => this.onChange(event) }
                >
                  Select File
                </Button>
              </label>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default withStyles(useStyles)(FileName);
