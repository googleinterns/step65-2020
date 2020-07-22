
import React, {useEffect} from 'react';
import clsx from 'clsx';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {Element as ScrollElement} from 'react-scroll';
import NavigationItems from './NavigationItems';
import MuseumGallery from './MuseumGallery';
import GalleryPreview from './gallery-components/GalleryPreview';
import ArtworkCloseUpCard from './ArtworkCloseUpCard';
import UploadsFields from './UploadsFields';
import DescLinks from './DescLinks';
import Gallery from './gallery-components/Gallery';
import Banner from './gallery-components/Banner';
import LandingPage from './LandingPage';
import OurMission from './OurMission';
import ColorImg from './images/colorful.jpeg';
import {useDispatch} from 'react-redux';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {fetchUserArtworks} from '../../redux/userArtworkActions';
import AICimg from './images/aic-inside.jpg';

const drawerWidth = 240;

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#087ca7',
      light: '#05b2dc',
    },
    secondary: {
      main: '#99666F',
      light: '#c2a3a8',
    },
    text: {
      secondary: '#ffffff',
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
    },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  withPadding: {
    padding: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  galleryPageWrapper: {
    padding: '0',
    margin: '0',
    minWidth: '100%',
    minHeight: '100%',
  },
  mission: {
    background: theme.palette.secondary.main,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // fetches artworks for GalleryPreview and MuseumGallery
  const dispatch = useDispatch();
  const LIMIT = 9;
  const FIRST_PAGE = 1;
  const EMPTY_QUERY = '';
  useEffect(() => {
    dispatch(fetchMuseumArtworks(FIRST_PAGE, LIMIT, EMPTY_QUERY));
    dispatch(fetchUserArtworks());
  }, [dispatch]);


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Luminart
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ?
                    <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <NavigationItems />
            <Divider />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path="/">
                <Container className={classes.galleryPageWrapper}>
                  <LandingPage/>
                  <ScrollElement id="OurMission" className={classes.mission}>
                    <OurMission/>
                  </ScrollElement>
                  <GalleryPreview
                    name="Museum Gallery"
                    link="/museum-gallery"
                    isMuseum={true}
                  />
                  <GalleryPreview
                    name="User Uploads Gallery"
                    link="/user-uploads-gallery"
                    isMuseum={false}
                  />
                </Container>
              </Route>
              <Route exact path="/museum-gallery">
                <Container className={classes.galleryPageWrapper}>
                  <Banner
                    title="Museum Gallery"
                    description="Explore the Art Institute of Chicago!"
                    imgURL={AICimg}
                  />
                  <MuseumGallery />
                </Container>
              </Route>
              <Route exact path="/upload-artwork">
                <Container className={classes.withPadding}>
                  <Typography variant="h3" gutterBottom>
                        Upload Artwork
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Here you can upload artwork of your own! Please be sure to
                    include your name and a very detailed description of your
                    artwork. If you are unsure of what qualifies as a good
                    description, we&apos;ve provided some links below to some
                    resources that can help guide you!
                  </Typography>
                  <UploadsFields name="User Information"/>
                  <DescLinks name="Description Links"/>
                </Container>
              </Route>
              <Route exact path="/user-uploads-gallery">
                <Container className={classes.galleryPageWrapper}>
                  <Banner
                    title="User Uploads Gallery"
                    description="Explore artwork from other users!"
                    imgURL={ColorImg}
                  />
                  <Container>
                    <Gallery isMuseum={false}/>
                  </Container>
                </Container>
              </Route>
              <Route exact path="/upload-artwork">
                <Container className={classes.withPadding}>
                  <Typography variant="h3" gutterBottom>
                    Upload Artwork
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Here you can upload artwork of your own! Please be sure to
                    include your name and a very detailed description of your
                    artwork. If you are unsure of what qualifies as a good
                    description, we&apos;ve provided some links below to some
                    resources that can help guide you!
                  </Typography>
                  <UploadsFields name="User Information"/>
                  <DescLinks name="Description Links"/>
                </Container>
              </Route>
              <Route
                exact path="/gallery/:collection/:id"
                component={ArtworkCloseUpCard}
              />
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
