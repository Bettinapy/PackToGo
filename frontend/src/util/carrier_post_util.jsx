import axios from "axios";

export const getCarrierPosts = () => {
    return axios.get("/api/carrier_posts")
};

export const getCarrierPost = (carrierPostId) => {
    return axios.get(`/api/carrier_posts/${carrierPostId}`)
};

export const createCarrierPost = (carrierPostData) => {
    debugger
    return axios.post("/api/carrier_posts/create", carrierPostData)
};

export const updateCarrierPost = (carrierPostData) => {
    debugger
    return axios.put(`/api/carrier_posts/${carrierPostData._id}`, carrierPostData)
};

export const deleteCarrierPost = (carrierPostId) => {
    return axios.delete(`/api/carrier_posts/${carrierPostId}`);
}