class BandSiteApi {
    constructor() {
        this.apiKey = 'c440e418-cce4-4f51-b779-17dc1bd4a5d0';
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    }

    async postComment(comment) {
        try {
            const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, comment);
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }

    async getComments() {
        try {
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            const sortedComments = response.data.sort((a, b) => b.timestamp - a.timestamp);
            return sortedComments;
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async getShows() {
        try {
            const response = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error('Error getting shows:', error);
            throw error;
        }
    }

    async likeComment(commentId) {
        try {
            const response = await axios.put(`${this.baseUrl}/comments/${commentId}/like?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error('Error liking comment:', error);
            throw error;
        }
    }

    async deleteComment(commentId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/comments/${commentId}?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
}

export default BandSiteApi;