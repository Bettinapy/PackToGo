import * as CarrierPostUtil from '../util/carrier_post_util';
import { receiveSessionErrors } from "./session_actions";

export const RECEIVE_CARRIERPOSTS = "RECEIVE_CARRIERPOSTS";
export const RECEIVE_CARRIERPOST = "RECEIVE_CARRIERPOST";
export const REMOVE_CARRIERPOST = "REMOVE_CARRIERPOST";
//export const REMOVE_CARRIERPOSTS = "REMOVE_CARRIERPOSTS";

export const receiveCarrierPosts = (carrierPosts) => {
    return{
        type: RECEIVE_CARRIERPOSTS,
        carrierPosts,
    }
}

export const receiveCarrierPost = (carrierPost) => {
  return {
    type: RECEIVE_CARRIERPOST,
    carrierPost,
  };
};

export const removeCarrierPost = (carrierPostId) => {
  
    return {
        type: REMOVE_CARRIERPOST,
        carrierPostId
    }
}

export const fetchCarrierPosts = (search) => {
    return dispatch => {
        debugger
        return CarrierPostUtil.getCarrierPosts(search)
            .then((payload) => dispatch(receiveCarrierPosts(payload)),
                  (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const fetchCarrierPost = (carrierPostId) => {
    return dispatch => {
        return CarrierPostUtil.getCarrierPost(carrierPostId)
            .then((payload) => dispatch(receiveCarrierPost(payload)),
                  (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const createCarrierPost = (carrierPost) => {
    return dispatch => {
        return CarrierPostUtil.createCarrierPost(carrierPost)
            .then((carrierPost) => dispatch(receiveCarrierPost(carrierPost)),
                  (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const updateCarrierPost = (carrierPost) => {
    return dispatch => {
        return CarrierPostUtil.updateCarrierPost(carrierPost)
            .then((carrierPost) => dispatch(receiveCarrierPost(carrierPost)),
                  (err) => dispatch(receiveSessionErrors(err.response.data)))
    }
}

export const deleteCarrierPost = (carrierPostId) => {
    return dispatch => {
        return CarrierPostUtil.deleteCarrierPost(carrierPostId)
            .then(() => dispatch(removeCarrierPost(carrierPostId)))
    }
}