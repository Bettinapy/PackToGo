import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchNav from './search_nav';

const mapStateToProps = (state, ownProps) => {
    const queryString = require('query-string');
    const search = (typeof queryString.parse(ownProps.location.search) !== 'undefined' ? (
        queryString.parse(ownProps.location.search)
    ) : ({ filterOrigin: "", filterDestination: "", filterDate: new Date().toJSON().slice(0, 10)}))
        debugger
    return {
        search: search
    }
};

export default withRouter(connect(mapStateToProps, null)(SearchNav));