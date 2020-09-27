import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';
import { connect } from 'react-redux';
import { Snackbars } from 'alerts';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal = props => {
  const { 
    children,
    alertSignUpCompleted,
    resetPasswordCompleted,
   } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
      <Snackbars data={ alertSignUpCompleted } />
      <Snackbars data={ resetPasswordCompleted } />
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  alertSignUpCompleted: PropTypes.object.isRequired,
  resetPasswordCompleted: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    alertSignUpCompleted: state.dataAlertMiniPage.signUpCompleted,
    resetPasswordCompleted: state.dataAlertMiniPage.resetPasswordCompleted,
  }
}

export default connect(mapStateToProps)(Minimal)
