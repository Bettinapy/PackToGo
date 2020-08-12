import { connect } from "react-redux";
import { clearErrors } from "../../actions/session_actions";
import {
  fetchCarrierPosts,
} from "../../actions/carrier_post_actions";

const mapStateToProps = (state, ownProps) => {
    return{
        carrier_posts: Object.values(state.carrier_posts),
        errors: state.errors,
    }
};

const mapDispatchToProps = (dispatch) => ({
  fetchCarrierPosts: () => dispatch(fetchCarrierPosts()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarrierPostList);