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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  searchAndSortByBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  searchTextField: {
    border: 'solid 1px #808080',
    borderRadius: '15px',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '60ch',
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
  filterOptions: {
    backgroundColor: '#808080',
    display: 'none',
    paddingBottom: theme.spacing(5),
  },
}));

export default function MuseumGallery() {
  const classes = useStyles();

  const handleDrawerChange = (event) => {
    const content = document.getElementById('filter-options');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  };
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
  const artworksLoading = useSelector(
      (state) => (state.museumArtworks.loading));
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
    <Container>
      {artworksLoading && (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
      <Container className={classes.searchForm}>
        <Container className={classes.searchAndSortByBar}>
          <Container className={classes.selectMenu}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink id="search-field-label">Search By</InputLabel>
              <Select
                labelId="search-field-label"
                id="search-field"
                value={searchField}
                onChange={handleChangeSearchField}
                label="Sort By"
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist_title">Artist</MenuItem>
              </Select>
            </FormControl>
          </Container>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
            className={classes.searchTextField}
            id="search-textfield"
            onKeyUp = {(event) => {
              if (event.keyCode === 13) {
                handleChangeSearch();
              }
            }}
          />
          <div className={classes.searchButton}>
            <IconButton
              aria-label="search"
              onClick={handleChangeSearch}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="filtering options"
              onClick={handleDrawerChange}
            >
              <Typography>Filtering</Typography>
              <ExpandMoreIcon/>
            </IconButton>
          </div>
        </Container>
      </Container>
      <Container id="filter-options" className={classes.filterOptions}>
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
      {/* <Accordion>*/}
      {/*  <AccordionSummary*/}
      {/*    expandIcon={<ExpandMoreIcon />}*/}
      {/*    aria-controls="panel1a-content"*/}
      {/*    id="panel1a-header"*/}
      {/*  >*/}
      {/*    <Typography className={classes.heading}>Accordion 1</Typography>*/}
      {/*  </AccordionSummary>*/}
      {/*  <AccordionDetails>*/}
      {/*    <Container className={classes.selectMenu}>*/}
      {/*      <FormControl className={classes.formControl}>*/}
      {/*        <InputLabel shrink id="sort-by-label">Sort By</InputLabel>*/}
      {/*        <Select*/}
      {/*          labelId="sort-by-label"*/}
      {/*          id="sort-by"*/}
      {/*          value={sortBy}*/}
      {/*          onChange={handleChangeSortBy}*/}
      {/*        >*/}
      {/*          <MenuItem value="relevance">Relevance</MenuItem>*/}
      {/*          <MenuItem value="artist">Artist</MenuItem>*/}
      {/*          <MenuItem value="date">Date</MenuItem>*/}
      {/*          <MenuItem value="title">Title</MenuItem>*/}
      {/*        </Select>*/}
      {/*      </FormControl>*/}
      {/*    </Container>*/}
      {/*  </AccordionDetails>*/}
      {/* </Accordion>*/}
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


