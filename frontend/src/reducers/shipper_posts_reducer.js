import {
    RECEIVE_SHIPPERPOSTS,
    RECEIVE_SHIPPERPOST,
    RECEIVE_USER_SHIPPERPOSTS,
    REMOVE_SHIPPERPOST
} from '../actions/shipper_post_actions';

const ShipperPostsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_SHIPPERPOSTS:
            return action.shipperPosts.data;
        case RECEIVE_SHIPPERPOST:
            newState = Object.assign({}, state, { [action.shipperPost.data._id]: action.shipperPost.data });
            return newState;
        case RECEIVE_USER_SHIPPERPOSTS:
            return action.userShipperPosts.data;
        case REMOVE_SHIPPERPOST:
            delete newState[action.shipperPostId.data];
            return newState;
        default:
            return state;
    }
}

export default ShipperPostsReducer;
