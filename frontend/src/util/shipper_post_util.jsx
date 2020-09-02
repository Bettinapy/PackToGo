import axios from "axios";

export const getShipperPosts = (search) => {
    return axios.get("/api/shipper_posts", { params: { search } })
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

export const getUserShipperPost = (userId) => {
    return axios.get(`/api/shipper_posts/user/${userId}`);
}

export const createBooking = (shipperPostId) => {
    return axios.post(`/api/shipper_posts/${shipperPostId}/book`);
}