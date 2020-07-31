import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isLoaded, isEmpty} from 'react-redux-firebase';
import PropTypes from 'prop-types';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export default function PrivateRoute({children, ...rest}) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({location}) =>
              isLoaded(auth) && !isEmpty(auth) ? (
                  children
              ) : (
                  <Redirect
                    to={{
                      pathname: '/sign-in',
                      state: {from: location},
                    }}
                  />
              )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
