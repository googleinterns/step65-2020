import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function DescLinks() {
  const classes = useStyles();

  return (
    <>
      <Box m={4} />
      <Typography variant="h4" noWrap>
        Description Links
      </Typography>
      <Box m={1} />
      <Typography variant="body1" noWrap>
        Here are some links to resources to help with creating useful
        and vivid descriptions that are effective.
      </Typography>
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItemLink href="https://www.karlencommunications.com/adobe/PictureIsWorth300WordsCSUN2001.pdf" target="_blank">
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText
            primary="A Picture is Worth 300 words: Writing Visual Decriptions"
            secondary="Essay on image descriptions, has main guidelines"
          />
        </ListItemLink>

        <ListItemLink href="https://www.americananthro.org/ImageDescriptions?navItemNumber=25126" target="_blank">
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText
            primary="Guidelines for Creating Image Descriptions"
            secondary="Contains examples"
          />
        </ListItemLink>
      </List>
    </>
  );
}
