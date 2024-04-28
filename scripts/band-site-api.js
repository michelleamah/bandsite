class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
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
            console.log('Response from API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error getting shows:', error);
            throw error;
        }
    }
}

export default BandSiteApi;