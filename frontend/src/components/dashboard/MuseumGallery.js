import React, {useEffect, useState} from 'react';
import Gallery from './gallery-components/Gallery';
import Container from '@material-ui/core/Container';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  loading: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  searchAndSortByBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: '0px',
    width: 'auto',
  },
  searchByContainer: {
    width: 'auto',
  },
  formControl: {
    minWidth: 200,
  },
  searchComponents: {
    display: 'flex',
    maxWidth: '100ch',
  },
  searchTextField: {
    border: 'solid 1px #c3c3c3',
    borderRadius: '15px',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '60ch',
  },
  searchButton: {
    alignItems: 'center',
    display: 'flex',
  },
  filterDrawer: {
    display: 'none',
    justifyContent: 'center',
    paddingBottom: theme.spacing(5),
  },
  drawerButton: {
    width: 'auto',
  },
  filterSelects: {
    margin: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function MuseumGallery() {
  const classes = useStyles();

  const handleDrawerChange = (event) => {
    const content = document.getElementById('filter-drawer');
    if (content.style.display === 'flex') {
      content.style.display = 'none';
    } else {
      content.style.display = 'flex';
    }
  };


  /*
   only set newQuery to be true when there is a change to the page number,
   the "sort by" field, or when the search button is pressed
  */
  const [newQuery, setNewQuery] = React.useState(false);

  const [sortBy, setSortBy] = React.useState('relevance');
  const handleChangeSortBy = (event) => {
    setNewQuery(true);
    setSortBy(event.target.value);
  };
  const [museumPage, setMuseumPage] = useState(1);
  const handleChangePage = (event, value) => {
    setNewQuery(true);
    setMuseumPage(value);
  };
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChangeSearch = () => {
    setNewQuery(true);
    setSearchQuery(document.getElementById('search-textfield').value);
    setMuseumPage(1);
  };
  const [searchField, setSearchField] = React.useState('all-fields');
  const handleChangeSearchField = (event) => {
    setSearchField(event.target.value);
  };

  const artworksMap = useSelector(
      (state) => (state.museumArtworks.artworks));
  const artworksLoading = useSelector(
      (state) => (state.museumArtworks.loading));
  const numOfPgs = useSelector(
      (state) => (state.museumArtworks.numOfPgs));
  const artworks = Array.from(artworksMap);
  const dispatch = useDispatch();
  const LIMIT = 9;
  useEffect(() => {
    if (newQuery) {
      dispatch(fetchMuseumArtworks(
          museumPage, LIMIT, searchQuery, sortBy, searchField))
          .then(setNewQuery(false));
    }
  }, [dispatch, newQuery, museumPage, searchQuery, sortBy, searchField]);

  let paginationNeeded = true;
  let results;
  if (artworks.length !== 0) {
    results =
      <Gallery isMuseum={true}/>;
  } else if (searchQuery !== '') {
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
    <Container className={classes.root}>
      {artworksLoading && (
        <div className={classes.loading}>
          <LinearProgress />
        </div>
      )}
      <Container className={classes.searchAndSortByBar}>
        <Container className={classes.searchByContainer}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              id="search-field"
              value={searchField}
              onChange={handleChangeSearchField}
            >
              <MenuItem value="all-fields">Search by: All fields</MenuItem>
              <MenuItem value="artist_title">Artist</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Container>
        <Container className={classes.searchComponents}>
          <InputBase
            placeholder="Search…"
            inputProps={{'aria-label': 'search'}}
            className={classes.searchTextField}
            id="search-textfield"
            onKeyUp = {(event) => {
              if (event.keyCode === 13) {
                handleChangeSearch();
              }
            }}
            autoComplete = "off"
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
                <MenuItem value="all-fields">All Fields</MenuItem>
                <MenuItem value="artist_title">Artist</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="title">Title</MenuItem>
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
        <Container className={classes.drawerButton}>
          <IconButton
            aria-label="filtering options"
            onClick={handleDrawerChange}
          >
            <Typography>Filtering</Typography>
            <ExpandMoreIcon/>
          </IconButton>
        </Container>
      </Container>
      <Container id="filter-drawer" className={classes.filterDrawer}>
        <FormControl
          variant="filled"
          className={[classes.filterSelects, classes.formControl].join(' ')}
        >
          <InputLabel shrink id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            onChange={handleChangeSortBy}
            label="Sort By"
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="artist">Artist</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          className={[classes.filterSelects, classes.formControl].join(' ')}
        >
          <InputLabel shrink id="placeholder-label">Placeholder</InputLabel>
          <Select
            labelId="placeholder-label"
            id="placeholder"
            label="Placeholder"
            value=""
          >
            <MenuItem value="relevance">Placeholder</MenuItem>
            <MenuItem value="artist">Placeholder</MenuItem>
            <MenuItem value="date">Placeholder</MenuItem>
            <MenuItem value="title">Placeholder</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          className={[classes.filterSelects, classes.formControl].join(' ')}
        >
          <InputLabel shrink id="placeholder-label">Placeholder</InputLabel>
          <Select
            labelId="placeholder-label"
            id="placeholder"
            label="Placeholder"
            value=""
          >
            <MenuItem value="relevance">Placeholder</MenuItem>
            <MenuItem value="artist">Placeholder</MenuItem>
            <MenuItem value="date">Placeholder</MenuItem>
            <MenuItem value="title">Placeholder</MenuItem>
          </Select>
        </FormControl>
      </Container>
      {results}
      {(paginationNeeded && !artworksLoading) &&
        <Container className={classes.pagination}>
          <Pagination
            count={numOfPgs}
            size="large"
            page={museumPage}
            onChange={handleChangePage}
          />
        </Container>
      }
    </Container>
  );
}


