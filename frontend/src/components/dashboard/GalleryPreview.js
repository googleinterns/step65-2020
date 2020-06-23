import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImgMediaCard from "./ImgMediaCard";

export default function GalleryPreview() {

    return (
      <Grid container 
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
      >
        <Grid item alignItems="flex-start">
          <Typography>Gallery Name</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <ImgMediaCard/>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="flex-end" alignItems="flex-end">
          <Button variant="contained">View More</Button>
        </Grid>
      </Grid>
    );
}