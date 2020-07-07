
import React from 'react';
import clsx from 'clsx';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
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
import NavigationItems from './NavigationItems';
import MuseumGallery from './MuseumGallery';
import GalleryPreview from './GalleryPreview';
import ArtworkCloseUpCard from './ArtworkCloseUpCard';
import UploadsFields from './UploadsFields';
import DescLinks from './DescLinks';
import Gallery from './Gallery';
import Banner from './Banner';
import ColorImg from './images/colorful.jpeg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    // padding: theme.spacing(1),
    // NOTE: If this messes with another page's paddings we can uncomment it
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
    minWidth: '100%',
    minHeight: '100%',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
              Header
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
              <Container className={classes.withPadding}>
                <GalleryPreview name="Museum Gallery" link="/museum-gallery"/>
                <GalleryPreview
                  name="User Uploads Gallery"
                  link="/user-uploads-gallery"
                />
              </Container>
            </Route>
            <Route exact path="/museum-gallery">
              <Container className={classes.galleryPageWrapper}>
                <MuseumGallery />
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
                  <Gallery />
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
            <Route exact path="/picture-id">
              <Container className={classes.withPadding}>
                <ArtworkCloseUpCard/>
              </Container>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
