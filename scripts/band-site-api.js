class BandSiteApi {

  constructor(apiKey) {
    this.apiKey = apiKey; 
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    this.BandsiteServer = axios.create({
      baseURL: this.baseUrl,
      params: {
        api_key: this.apiKey
      },
    });
  };

  /* GET COMMENTS */
  async getComments() {
    const route = "/comments";
    try {
      const response = await this.BandsiteServer.get(route);
      return response.data;
    } catch (e) {
      console.error(e);
    };
  };

  /* POST COMMENT */
  async postComment(payload) {
    const route = "/comments";
    try {
      const response = await this.BandsiteServer.post(route, payload);
      return response.data;
    } catch (e) {
      console.error(e);
    };
  };

  /* LIKE COMMENT */
  async likeComment(id) {
    const route = `/comments/${id}/like`;
    try {
      const response = await this.BandsiteServer.put(route);
      return response.data;
    } catch (e) {
      console.error(error);
    };
  };

  /* DELETE COMMENT */
  async deleteComment(id) {
    const route = `/comments/${id}`;
    try {
      const response = await this.BandsiteServer.delete(route);
      return response.data;
    } catch (e) {
      console.log(error);
    };
  };

  /* GET SHOWS */
  async getShows() {
    const route = "/showdates";
    try {
      const response = await this.BandsiteServer.get(route);
      return response.data;
    } catch (e) {
      console.error(e);
    };
    console.log(response.data);
  };

};

const apiKey = "b89ace06-b991-4a5b-8f17-81c6da771bc9";
const bandsiteApi = new BandSiteApi(apiKey);
