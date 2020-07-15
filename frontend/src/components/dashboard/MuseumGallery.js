import React from 'react';
import Gallery from './gallery-components/Gallery';
import Banner from './gallery-components/Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';
import SearchAndFilterBar from './gallery-components/SearchAndFilterBar';

export default function MuseumGallery(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const artworks = useSelector((state) => (state.museumArtworks.artworks));

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <Container>
        <SearchAndFilterBar/>
        <Gallery artworks={artworks}/>
      </Container>
      <Container className={classes.pagination}>
        <Pagination
          count={10}
          size="large"
          page={page}
          onChange={handleChange}
        />
      </Container>
    </>
  );
}


