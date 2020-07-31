import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isLoaded, isEmpty} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export default function PrivateRoute({children, ...rest}) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={() =>
              isLoaded(auth) && !isEmpty(auth) ? (
                  children
              ) : (
                  <Alert
                    severity="error"
                  >
                    You do not have access to this page, please sign in.
                  </Alert>
              )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
