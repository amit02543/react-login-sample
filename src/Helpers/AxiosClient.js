import axios from "axios";

const axiosClient = axios.create();


axiosClient.defaults.baseURL = 'http://localhost:8080/spotify-app/';


axiosClient.defaults.headers = {
    'Content-Type': 'application/json'
};


axiosClient.defaults.timeout = 5000;


const uploadImageHeaders = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};


const api = {

    login: (data) => axiosClient.post('v1/login', JSON.stringify(data)),
    register: (data) => axiosClient.post('v1/register', JSON.stringify(data)),

    fetchRandomSongs: (username) => axiosClient.get(`v1/spotify/${username}/random`),

    fetchLatestAlbums: (username) => axiosClient.get(`v1/spotify/${username}/latest`),

    fetchResultBySearchTermAndType: (query, type) => axiosClient.get(`v1/spotify/search?query=${query}&type=${type}`),

    fetchUserProfile: (username) => axiosClient.get(`v1/profile/${username}`),
    updateUserProfile: (username, data) => axiosClient.put(`v1/profile/${username}`, JSON.stringify(data)),
    uploadUserProfileImage: (username, data) => axiosClient.post(`v1/profile/${username}/upload-image`, data, uploadImageHeaders),
    fetchUserProfileImage: (username) => axiosClient.get(`v1/profile/${username}/profile-image`),
    
    fetchLikedAlbums: (username) => axiosClient.get(`v1/user/${username}/albums`),
    fetchLikedSongs: (username) => axiosClient.get(`v1/user/${username}/songs`),

    fetchUserCollection: (username) => axiosClient.get(`v1/user/${username}/collections`),
    addUserCollection: (username, data) => axiosClient.post(`v1/user/${username}/collections`, data),
    fetchUserCollectionByName: (username, collectionName) => axiosClient.get(`v1/user/${username}/collections/${collectionName}`),
    fetchUserCollectionDetailsByName: (username, collectionName) => axiosClient.get(`v1/user/${username}/collections/${collectionName}/details`),
    uploadUserCollectionImage: (username, collectionName, data) => axiosClient.post(`v1/user/${username}/collections/${collectionName}/upload`, data, uploadImageHeaders)

}


export default api;