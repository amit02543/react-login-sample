import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/spotify-app/',
    timeout: 5000,
    headers:  {
        'Content-Type': 'application/json'
    }
});


axiosClient.interceptors.request.use(
    config => {
        config.timeout = 5000;
        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
);


axiosClient.interceptors.response.use(
    response => response,
    error => {

        if (axios.isCancel(error)) {
            console.log('Request cancelled');
            return Promise.reject({ message: 'Request cancelled', status: 500 });
        } else if (error.code === 'ERR_NETWORK') {
            console.log('Network error');
            return Promise.reject({ message: 'Unable to connect to server', status: 500 });
        } else {
            return Promise.reject(error);
        }

    }
);


const uploadImageHeaders = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};


const api = {

    // Authentication APIs

    login: async (data) => {
        
        try {
            const response = await axiosClient.post('v1/auth-management/login', JSON.stringify(data))
            return response;
        } catch(error) {
            throw error;
        }

    },


    register: async (data) => {
        
        try {
            const response = await axiosClient.post('v1/auth-management/register', JSON.stringify(data))
            return response;
        } catch(error) {
            throw error;
        }
        
    },


    // Spotify APIs

    fetchRandomSongs: async (username) =>  { 

        try {
            const response = await axiosClient.get(`v1/spotify/${username}/random`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchLatestAlbums: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/spotify/${username}/latest`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchResultBySearchTermAndType: async (query, type) => { 

        try {
            const response = await axiosClient.get(`v1/spotify/search?query=${query}&type=${type}`); //Might need to send username to show already liked songs and albums
            return response;
        } catch(error) {
            throw error;
        }

    },


    // Profile APIs

    fetchUserProfile: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/user-management/users/${username}/profile`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    updateUserProfile: async (username, data) => { 

        try {
            const response = await axiosClient.put(`v1/user-management/users/${username}/profile`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    uploadUserProfileImage: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/user-management/users/${username}/profile/upload-image`, data, uploadImageHeaders);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserProfileImage: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/user-management/users/${username}/profile/profile-image`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    deleteUserProfileImage: async (username) => { 

        try {
            const response = await axiosClient.delete(`v1/user-management/users/${username}/profile/profile-image`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    deleteUser: async (username) => { 

        try {
            const response = await axiosClient.delete(`v1/user-management/users/${username}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    // My Album APIs
    
    fetchLikedAlbums: async (username) => { 

        try {
            const response = await axiosClient.get(`/v1/album-management/users/${username}/albums`);
            return response;
        } catch(error) {
            throw error;
        }

    },

    
    addToMyAlbums: async (username, data) => { 

        try {
            const response = await axiosClient.post(`/v1/album-management/users/${username}/albums`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },
    

    fetchLikedAlbumById: async (username, albumId) => { 

        try {
            const response = await axiosClient.get(`/v1/album-management/users/${username}/albums/${albumId}`);
            return response;
        } catch(error) {
            throw error;
        }

    },
    

    deleteLikedAlbumById: async (username, albumId) => { 

        try {
            const response = await axiosClient.delete(`/v1/album-management/users/${username}/albums/${albumId}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    // My Song APIs

    fetchLikedSongs: async (username) => { 

        try {
            const response = await axiosClient.get(`/v1/song-management/users/${username}/songs`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    addToMySongs: async (username, data) => { 

        try {
            const response = await axiosClient.post(`/v1/song-management/users/${username}/songs`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchLikedSongById: async (username, songId) => { 

        try {
            const response = await axiosClient.get(`/v1/song-management/users/${username}/songs/${songId}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    deleteLikedSongById: async (username, songId) => { 

        try {
            const response = await axiosClient.delete(`/v1/song-management/users/${username}/songs/${songId}`);
            return response;
        } catch(error) {
            throw error;
        }

    },



    // User Collection APIs
    
    fetchUserCollection: async (username) =>  { 

        try {
            const response = await axiosClient.get(`v1/user-collection-management/users/${username}/collections`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    addUserCollection: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/user-collection-management/users/${username}/collections`, data);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserCollectionDetailsByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.get(`v1/user-collection-management/users/${username}/collections/${collectionName}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    updateUserCollectionDetailsByName: async (username, collectionName, data) => { 

        try {
            const response = await axiosClient.put(`v1/user-collection-management/users/${username}/collections/${collectionName}`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    deleteUserCollectionByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.delete(`v1/user-collection-management/users/${username}/collections/${collectionName}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    uploadUserCollectionImage: async (username, collectionName, data) => { 

        try {
            const response = await axiosClient.post(`v1/user-collection-management/users/${username}/collections/${collectionName}/upload-image`, data, uploadImageHeaders);
            return response;
        } catch(error) {
            throw error;
        }

    },


    removeUserCollectionImage: async (username, collectionName) => { 

        try {
            const response = await axiosClient.delete(`v1/user-collection-management/users/${username}/collections/${collectionName}/image`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    // Collection APIs

    fetchUserCollectionItemsByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.get(`v1/collection-management/collections?filter=byNameAndUsername&username=${username}&name=${collectionName}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    addToCollection: async (data) => { 

        try {
            const response = await axiosClient.post(`v1/collection-management/collections`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },
    

    deleteUserCollectionItemsByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.delete(`v1/collection-management/collections?filter=byNameAndUsername&username=${username}&name=${collectionName}`);
            return response;
        } catch(error) {
            throw error;
        }

    },
    

    deleteUserCollectionItemsByNameAndId: async (username, collectionName, spotifyId) => { 

        try {
            const response = await axiosClient.delete(`v1/collection-management/collections?filter=byNameAndUsernameAndId&username=${username}&name=${collectionName}&id=${spotifyId}`);
            return response;
        } catch(error) {
            throw error;
        }

    }



}


export default api;