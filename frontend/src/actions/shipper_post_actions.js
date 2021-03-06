import * as ShipperPostUtil from '../util/shipper_post_util';
import { receiveSessionErrors } from "./session_actions";

export const RECEIVE_SHIPPERPOSTS = "RECEIVE_SHIPPERPOSTS";
export const RECEIVE_SHIPPERPOST = "RECEIVE_SHIPPERPOST";
export const REMOVE_SHIPPERPOST = "REMOVE_SHIPPERPOST";
export const RECEIVE_USER_SHIPPERPOSTS = "RECEIVE_USER_SHIPPERPOSTS";

export const receiveShipperPosts = (shipperPosts) => {
    return {
        type: RECEIVE_SHIPPERPOSTS,
        shipperPosts,
    }
}

export const receiveShipperPost = (shipperPost) => {
    return {
        type: RECEIVE_SHIPPERPOST,
        shipperPost,
    };
};

export const receiveUserShipperPosts = (userShipperPosts) => {
    return {
        type: RECEIVE_USER_SHIPPERPOSTS,
        userShipperPosts
    }
};

export const removeShipperPost = (shipperPostId) => {
 
    return {
        type: REMOVE_SHIPPERPOST,
        shipperPostId
    }
}

export const fetchShipperPosts = (search) => {
    return dispatch => {
        return ShipperPostUtil.getShipperPosts(search)
            .then((payload) => dispatch(receiveShipperPosts(payload)),
                (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const fetchShipperPost = (shipperPostId) => {
    return dispatch => {
        return ShipperPostUtil.getShipperPost(shipperPostId)
            .then((payload) => dispatch(receiveShipperPost(payload)),
                (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const fetchUserShipperPosts = (userId) => {
    return dispatch => {
        return ShipperPostUtil.getUserShipperPost(userId)
            .then((payload) => dispatch(receiveUserShipperPosts(payload)),
                (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const createShipperPost = (shipperPost) => {
    return dispatch => {
        return ShipperPostUtil.createShipperPost(shipperPost)
            .then((shipperPost) => dispatch(receiveShipperPost(shipperPost)),
                (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const updateShipperPost = (shipperPost) => {
    return dispatch => {
        return ShipperPostUtil.updateShipperPost(shipperPost)
            .then((shipperPost) => dispatch(receiveShipperPost(shipperPost)),
                (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const deleteShipperPost = (shipperPostId) => {
    return dispatch => {
        return ShipperPostUtil.deleteShipperPost(shipperPostId)
            .then(() => dispatch(removeShipperPost(shipperPostId)))
    }
}