import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const AvatarHeader = () => (
  <>
    <div style={{padding: 16, transition: '0.3s'}}>
      <Avatar
        style={{
          width: 60,
          height: 60,
          transition: '0.3s',
        }}
      />
      <div style={{paddingBottom: 16}} />
      <Typography variant={'h6'} noWrap>
        Jane Doe
      </Typography>
      <Typography color={'textSecondary'} noWrap gutterBottom>
        jane_doe@gmail.com
      </Typography>
    </div>
    <Divider />
  </>
);

export default AvatarHeader;
