import { connect } from "react-redux";
import { clearErrors } from "../../actions/session_actions";
import {
  fetchShipperPosts,
} from "../../actions/shipper_post_actions";
import ShipperPostList from './shipper_post_list';


const mapStateToProps = (state, ownProps) => {
  const queryString = require('query-string');
  const search = (typeof queryString.parse(ownProps.location.search) !== 'undefined' ? (
    queryString.parse(ownProps.location.search)
  ) : ({ filterOrigin: "", filterDestination: "" }))

    return{
        shipper_posts: Object.values(state.shipper_posts) || [],
        errors: state.errors,
        search: search,
    }
};

const mapDispatchToProps = (dispatch) => ({
  fetchShipperPosts: (search) => dispatch(fetchShipperPosts(search)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPostList);