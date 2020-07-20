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
import FormHelperText from '@material-ui/core/FormHelperText';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  searchAndFilterBar: {
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
  filterForm: {
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

  const [filter, setFilter] = React.useState('');
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const [museumPage, setMuseumPage] = useState(1);
  const handleChangePage = (event, value) => {
    setMuseumPage(value);
  };
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChangeSearch = () => {
    setSearchQuery(document.getElementById('search-textfield').value);
  };
  const artworksMap = useSelector((state) => (state.museumArtworks.artworks));
  const artworks = Array.from(artworksMap);
  const dispatch = useDispatch();
  const limit = 9;
  useEffect(() => {
    dispatch(fetchMuseumArtworks(museumPage, limit, searchQuery));
  }, [dispatch, museumPage, searchQuery]);

  return (
    <Container>
      <Container className={classes.searchAndFilterBar}>
        <Container className={classes.searchForm}>
          <TextField
            className={classes.searchTextField}
            id="search-textfield"
            label="Search"
            variant="outlined"
            onKeyUp = {(event) => {
              if (event.keyCode == 13){
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
        </Container>
        <Container className={classes.filterForm}>
          <FormControl className={classes.formControl}>
            <InputLabel id="search-filter-label">Filter</InputLabel>
            <Select
              labelId="search-filter-label"
              id="search-filter"
              value={filter}
              onChange={handleChangeFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="artist">By Artist</MenuItem>
              <MenuItem value="date">By Date</MenuItem>
              <MenuItem value="title">By Title</MenuItem>
            </Select>
            <FormHelperText>Sort images by...</FormHelperText>
          </FormControl>
        </Container>
      </Container>
      <Gallery artworks={artworks}/>
      <Container className={classes.pagination}>
        <Pagination
          count={10}
          size="large"
          page={museumPage}
          onChange={handleChangePage}
        />
      </Container>
    </Container>
  );
}


