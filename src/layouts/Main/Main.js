import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import { Snackbars } from 'alerts';
import { FormAddUser } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const [openAddUser, setOpenAddUser] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>

      <Snackbars data={ props.dataAlertNotify } />
      <Snackbars data={ props.dataAlertAddUser } />
      <Snackbars data={ props.dataAlertUserDetail } />
      <Snackbars data={ props.dataAlertUserEditor } />
      <Snackbars data={ props.dataAlertCreateNewPost } />
      <FormAddUser openCall={props.openAddUser} />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

  const mapStateToProps = (state, ownProps) => {
    return {
      dataAlertNotify: state.dataNotifys.alert,
      dataAlertAddUser: state.dataNewUser.alert,
      dataAlertUserDetail: state.dataUserDetail.alert,
      dataAlertUserEditor: state.dataUserEditor.alert,
      dataAlertCreateNewPost: state.dataManipulationPost.createPost.alert,
      openAddUser: state.dataNewUser.show,
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      dispatch1: () => {
        dispatch(actionCreator)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Main);
