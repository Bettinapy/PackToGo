import axios from "axios";

export const getCarrierPosts = (search) => {

    return axios.get("/api/carrier_posts", {params: {search}})
};

export const getCarrierPost = (carrierPostId) => {
    return axios.get(`/api/carrier_posts/${carrierPostId}`)
};

export const createCarrierPost = (carrierPostData) => {

    return axios.post("/api/carrier_posts/create", carrierPostData)
};

export const updateCarrierPost = (carrierPostData) => {

    return axios.put(`/api/carrier_posts/${carrierPostData._id}`, carrierPostData)
};

export const deleteCarrierPost = (carrierPostId) => {
    return axios.delete(`/api/carrier_posts/${carrierPostId}`);
}

export const createBooking = (carrierPostId, bookingData) => {

    return axios.post(`/api/carrier_posts/${carrierPostId}/book`, bookingData)
}

export const getUserCarrierPost = (userId) => {
    return axios.get(`/api/carrier_posts/user/${userId}`);
}