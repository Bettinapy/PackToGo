import {
    RECEIVE_CARRIERPOSTS,
    RECEIVE_CARRIERPOST,
    REMOVE_CARRIERPOST,
    RECEIVE_USER_CARRIERPOSTS
} from '../actions/carrier_post_actions';

const CarrierPostsReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CARRIERPOSTS:
            return action.carrierPosts.data;
        case RECEIVE_USER_CARRIERPOSTS:
            return action.userCarrierPosts.data;
        case RECEIVE_CARRIERPOST:
            newState = Object.assign({}, state, {[action.carrierPost.data._id]: action.carrierPost.data });
            return newState;
        case REMOVE_CARRIERPOST:
            delete newState[action.carrierPostId.data];
            return newState;
        default:
            return state;
    }
}

export default CarrierPostsReducer;
