import { connect } from "react-redux";
import { clearErrors } from "../../actions/session_actions";
import {
  fetchCarrierPosts,
} from "../../actions/carrier_post_actions";
import CarrierPostList from './carrier_post_list';


const mapStateToProps = (state, ownProps) => {
  const queryString = require('query-string');
  const search = (typeof queryString.parse(ownProps.location.search) !== 'undefined' ? (
    queryString.parse(ownProps.location.search)
  ) : ({ filterOrigin: "", filterDestination: "" }))

  let carrier_posts = Object.values(state.carrier_posts) || [];

    return{
        carrier_posts: carrier_posts,
        errors: state.errors,
        search: search,
    }
};

const mapDispatchToProps = (dispatch) => ({
  fetchCarrierPosts: (search) => dispatch(fetchCarrierPosts(search)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarrierPostList);