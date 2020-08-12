import axios from "axios";

export const getShipperPosts = () => {
    return axios.get("/api/shipper_posts")
};

export const getShipperPost = (shipperPostId) => {
    return axios.get(`/api/shipper_posts/${shipperPostId}`)
};

export const createShipperPost = (shipperPostData) => {

    return axios.post("/api/shipper_posts/create", shipperPostData)
};

export const updateShipperPost = (shipperPostData) => {

    return axios.put(`/api/shipper_posts/${shipperPostData._id}`, shipperPostData)
};

export const deleteShipperPost = (shipperPostId) => {
    return axios.delete(`/api/shipper_posts/${shipperPostId}`);
}