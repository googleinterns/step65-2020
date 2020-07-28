import React, {useEffect, useState} from 'react';
import Gallery from './gallery-components/Gallery';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  loading: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  searchBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
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
    paddingBottom: theme.spacing(2),
  },
  filters: {
    'backgroundColor': theme.palette.primary,
    'border': 'solid 1px #c3c3c3',
    'borderRadius': '15px',
    'display': 'inline-block',
    'padding': theme.spacing(1),
    'margin': theme.spacing(1),
    'width': 'auto',
    '&:hover': {border: 'solid 1px black'},
  },
  hoverLineThrough: {
    '&:hover': {textDecorationLine: 'line-through'},
  },
  sortByMenu: {
    display: 'none',
    margin: theme.spacing(2),
  },
  surpriseMe: {
    padding: theme.spacing(2)*.75,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function MuseumGallery() {
  const classes = useStyles();

  /*
   only set newQuery to be true when there is a change to the page number,
   the "sort by" field, or when the search button is pressed
  */
  const [newQuery, setNewQuery] = React.useState(false);

  const [sortBy, setSortBy] = React.useState('relevance');
  const handleChangeSortBy = (event, value) => {
    setNewQuery(true);
    setSortBy(value);
    handleCloseSortByMenu();
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
    document.getElementById('search-bar').style.marginBottom = '0px';
    document.getElementById('filter-drawer').style.display = 'block';
  };
  const clearSearchQuery = () => {
    document.getElementById('filter-drawer').style.display = 'none';
    document.getElementById('search-bar').style.margin = '8px';
    document.getElementById('search-textfield').value = '';
    setNewQuery(true);
    setSearchQuery('');
    setMuseumPage(1);
    setSortBy('relevance');
  };

  const [searchField, setSearchField] = React.useState('all-fields');
  const handleChangeSearchField = (event) => {
    setSearchField(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickSortByMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSortByMenu = () => {
    setAnchorEl(null);
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
  }, [dispatch, newQuery]);

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
      <Container id="search-bar" className={classes.searchBar}>
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
          <div className={classes.searchButton}>
            <IconButton
              aria-label="search"
              onClick={handleChangeSearch}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </div>
        </Container>
        <Button
          variant="contained"
          color="secondary"
          className={classes.surpriseMe}
        >
          Surprise me!
        </Button>
      </Container>
      <Container id="filter-drawer" className={classes.filterDrawer}>
        <Button
          aria-controls="sort-by-menu"
          aria-haspopup="true"
          className={classes.filters}
          onClick={handleClickSortByMenu}
        >
          Sort By: {sortBy} &#x25BC;
        </Button>
        <Menu
          id="sort-by-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseSortByMenu}
        >
          <MenuItem
            onClick={(event) => handleChangeSortBy(event, 'relevance')}
          >Relevance</MenuItem>
          <MenuItem
            onClick={(event) => handleChangeSortBy(event, 'artist')}
          >Artist</MenuItem>
          <MenuItem
            onClick={(event) => handleChangeSortBy(event, 'date')}
          >Date</MenuItem>
          <MenuItem
            onClick={(event) => handleChangeSortBy(event, 'title')}
          >Title</MenuItem>
        </Menu>
        <Button
          id="search-filter"
          className={classes.filters}
          onClick={clearSearchQuery}
        >
          <Typography className={classes.hoverLineThrough} variant="label">
            Search for: {searchQuery} &#10006;
          </Typography>
        </Button>
        <FormControl
          variant="filled"
          className={[classes.sortByMenu, classes.formControl].join(' ')}
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


