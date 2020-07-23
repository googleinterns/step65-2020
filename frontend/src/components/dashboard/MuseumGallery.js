import React, {useEffect, useState} from 'react';
import Gallery from './gallery-components/Gallery';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  searchAndSortByBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  searchTextField: {
    margin: theme.spacing(2),
    width: '75ch',
  },
  searchForm: {
    display: 'flex',
    width: 'auto',
  },
  searchButton: {
    alignItems: 'center',
    display: 'flex',
  },
  selectMenu: {
    alignItems: 'center',
    display: 'flex',
    width: 'auto',
  },
  formControl: {
    minWidth: 200,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function MuseumGallery() {
  const classes = useStyles();

  const [sortBy, setSortBy] = React.useState('relevance');
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const [museumPage, setMuseumPage] = useState(1);
  const handleChangePage = (event, value) => {
    setMuseumPage(value);
  };
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChangeSearch = () => {
    setSearchQuery(document.getElementById('search-textfield').value);
    setMuseumPage(1);
  };
  const [searchField, setSearchField] = React.useState('title');
  const handleChangeSearchField = (event) => {
    setSearchField(event.target.value);
  };
  const artworksMap = useSelector((state) => (state.museumArtworks.artworks));
  const artworks = Array.from(artworksMap);
  const dispatch = useDispatch();
  const limit = 9;
  useEffect(() => {
    dispatch(fetchMuseumArtworks(
        museumPage, limit, searchQuery, sortBy, searchField));
  }, [dispatch, museumPage, searchQuery, sortBy, searchField]);
  let paginationNeeded = true;
  let results;
  if (artworks.length !== 0) {
    results =
      <Gallery isMuseum={true}/>;
  } else {
    if (museumPage > 1) {
      results =
        <Typography align="center" variant="h5" component="h3">
          No more results found for {searchQuery}
        </Typography>;
    } else {
      paginationNeeded = false;
      results =
        <Typography align="center" variant="h5" component="h3">
          No results found for {searchQuery}
        </Typography>;
    }
  }

  return (
    <Container>
      <Container className={classes.searchAndSortByBar}>
        <Container className={classes.searchForm}>
          <TextField
            className={classes.searchTextField}
            id="search-textfield"
            label="Search"
            variant="outlined"
            onKeyUp = {(event) => {
              if (event.keyCode === 13) {
                handleChangeSearch();
              }
            }}
          />
          <Container className={classes.selectMenu}>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="search-field-label">Search By</InputLabel>
              <Select
                labelId="search-field-label"
                id="search-field"
                value={searchField}
                onChange={handleChangeSearchField}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist_title">Artist</MenuItem>
              </Select>
            </FormControl>
          </Container>
          <div className={classes.searchButton}>
            <IconButton
              aria-label="search"
              onClick={handleChangeSearch}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </div>
        </Container>

        <Container className={classes.selectMenu}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              onChange={handleChangeSortBy}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="artist">Artist</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Container>
      {results}
      {(paginationNeeded) &&
        <Container className={classes.pagination}>
          <Pagination
            count={10}
            size="large"
            page={museumPage}
            onChange={handleChangePage}
          />
        </Container>
      }
    </Container>
  );
}


