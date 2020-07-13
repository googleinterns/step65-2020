import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

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
}));

export default function SearchAndFilterBar() {
  const classes = useStyles();

  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container className={classes.searchAndFilterBar}>
      <Container className={classes.searchForm}>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.searchTextField}
            id="search-textfield"
            label="Search"
            variant="outlined"
          />
        </form>
        <div className={classes.searchButton}>
          <IconButton aria-label="search">
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
            onChange={handleChange}
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
  );
}
