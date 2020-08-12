import { connect } from "react-redux";
import { clearErrors } from "../../actions/session_actions";
import {
  fetchShipperPosts,
} from "../../actions/shipper_post_actions";
import ShipperPostList from './shipper_post_list';


const mapStateToProps = (state, ownProps) => {

    return{
        shipper_posts: Object.values(state.shipper_posts),
        errors: state.errors,
    }
};

const mapDispatchToProps = (dispatch) => ({
  fetchShipperPosts: () => dispatch(fetchShipperPosts()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPostList);