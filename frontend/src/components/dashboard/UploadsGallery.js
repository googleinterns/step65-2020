import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Gallery from './gallery-components/Gallery';
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
  const LIMIT = 9;

  const [uploadsPageNum, setUploadsPageNum] = useState(1);

  const [pageNums, setPageNums] = useState(1);
  const handleChangePage = (event, value) => {
    setUploadsPageNum(value);
  };

  useEffect(() => {
    fetch('/api/v1/uploadsCount')
        .then((response) => {
          return response.text();
        })
        .then((count) => {
          setPageNums(Math.max(Math.ceil(count/ LIMIT), 1));
        });

    dispatch(fetchUserArtworks(uploadsPageNum));
  }, [dispatch, uploadsPageNum]);

  return (
    <>
      <Container>
        <Gallery isMuseum={false}/>
      </Container>
      <Container className={classes.pagination}>
        <Pagination
          count={pageNums}
          size="large"
          page={uploadsPageNum}
          onChange={handleChangePage}
        />
      </Container>
    </>
  );
}
