import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAvatarUrl, getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { tokenAvatar } = props;
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root)}
    >
      <Avatar
          alt="Admin"
          className={classes.avatar}
          component={RouterLink}
          src={ tokenAvatar ? getAvatarUrl(tokenAvatar) : "https://firebasestorage.googleapis.com/v0/b/blogger-firebase.appspot.com/o/avatar%2Ff1cdd5de-681b-4837-8bf4-adcbd5803e73.jpg?alt=media&token=f1cdd5de-681b-4837-8bf4-adcbd5803e73" }
          to="/settings"
          >
          {getInitials( "Phan Trọng Hoàng" )}
      </Avatar>
      <Typography
        className={classes.name}
        variant="h4"
      >
        { "Phan Trọng Hoàng" }
      </Typography>
      <Typography variant="body2">Quản trị website</Typography>
    </div>
  );
};

Profile.propTypes = {
   tokenAvatar: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tokenAvatar: state.dataUploadAvatar.tokenAvatar
});

export default connect(mapStateToProps, null)(Profile)