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

    login: async (data) => {
        
        try {
            const response = await axiosClient.post('v1/login', JSON.stringify(data))
            return response;
        } catch(error) {
            throw error;
        }

    },


    register: async (data) => {
        
        try {
            const response = await axiosClient.post('v1/register', JSON.stringify(data))
            return response;
        } catch(error) {
            throw error;
        }
        
    },


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
            const response = await axiosClient.get(`v1/spotify/search?query=${query}&type=${type}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserProfile: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/profile/${username}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    updateUserProfile: async (username, data) => { 

        try {
            const response = await axiosClient.put(`v1/profile/${username}`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    uploadUserProfileImage: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/profile/${username}/upload-image`, data, uploadImageHeaders);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserProfileImage: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/profile/${username}/profile-image`);
            return response;
        } catch(error) {
            throw error;
        }

    },

    
    fetchLikedAlbums: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/user/${username}/albums`);
            return response;
        } catch(error) {
            throw error;
        }

    },

    
    addToMyAlbums: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/user/${username}/albums`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchLikedSongs: async (username) => { 

        try {
            const response = await axiosClient.get(`v1/user/${username}/songs`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    addToMySongs: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/user/${username}/songs`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },


    addToCollection: async (data) => { 

        try {
            const response = await axiosClient.post(`v1/collections`, JSON.stringify(data));
            return response;
        } catch(error) {
            throw error;
        }

    },

    
    fetchUserCollection: async (username) =>  { 

        try {
            const response = await axiosClient.get(`v1/user/${username}/collections`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    addUserCollection: async (username, data) => { 

        try {
            const response = await axiosClient.post(`v1/user/${username}/collections`, data);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserCollectionByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.get(`v1/user/${username}/collections/${collectionName}`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    fetchUserCollectionDetailsByName: async (username, collectionName) => { 

        try {
            const response = await axiosClient.get(`v1/user/${username}/collections/${collectionName}/details`);
            return response;
        } catch(error) {
            throw error;
        }

    },


    uploadUserCollectionImage: async (username, collectionName, data) => { 

        try {
            const response = await axiosClient.post(`v1/user/${username}/collections/${collectionName}/upload`, data, uploadImageHeaders);
            return response;
        } catch(error) {
            throw error;
        }

    }

}


export default api;