import React, {useState, useEffect} from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function MuseumGallery(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const artworks = useSelector((state) => (state.museumArtworks.artworks));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMuseumArtworks(page));
  }, [dispatch, page]);

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <img id="photo" alt=""/>
      <Container>
        <Gallery artworks={artworks}/>
      </Container>
      <Container className={classes.pagination}>
        <Pagination count={10} size="large" page={page} onChange={handleChange}/>
      </Container>
    </>
  );
}


