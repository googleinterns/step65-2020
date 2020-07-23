import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Gallery from './gallery-components/Gallery';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {fetchUserArtworks} from '../../redux/userArtworkActions';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function UploadsGallery() {
  const classes = useStyles();
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserArtworks());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Gallery isMuseum={false}/>
      </Container>
      <Container className={classes.pagination}>
          <Pagination
            count={10}
            size="large"
          />
        </Container>
    </>
  )
}