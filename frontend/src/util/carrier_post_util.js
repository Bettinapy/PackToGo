import axios from "axios";

export const getCarrierPosts = () => {
    return axios.get("/api/carrier_posts")
};

export const getCarrierPost = (carrierPostId) => {
    return axios.get(`/api/carrier_posts/${carrierPostId}`)
};

export const createCarrierPost = (carrierPostData) => {
    return axios.post("/api/carrier_posts/", carrierPostData)
};

export const updateCarrierPost = (carrierPostData) => {
    return axios.put(`/api/carrier_posts/${carrierPostData.id}`, carrierPostData)
};

export const deleteCarrierPost = (carrierPostId) => {
    return axios.delete(`/api/carrier_posts/${carrierPostId}`);
}