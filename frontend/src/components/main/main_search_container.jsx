import { connect }  from 'react-redux';
import { withRouter } from 'react-router';
import MainSearch from './main_search';

const mapStateToProps = (state, ownProps) => {
  const queryString = require('query-string');
  const search = (typeof queryString.parse(ownProps.location.search) !== 'undefined' ? (
    queryString.parse(ownProps.location.search)
  ) : ({ filterOrigin: "", filterDestination: "", filterDate: new Date().toJSON().slice(0, 10) }))

  const currentUserRole = typeof state.session.user.role !== "undefined" ?
    state.session.user.role : "shipper";
  debugger
  return {
    search: search,
    currentUserRole: currentUserRole,
    loggedIn: state.session.isAuthenticated
  }
};

const mapDispatchToProps = () => {
  return ({

  });
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainSearch));