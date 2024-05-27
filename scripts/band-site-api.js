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
    const rte = `/comments`;
    try {
      const res = await this.BandsiteServer.get(rte);
      return res.data;
    } catch (error) {
      console.error(error)
    };
  };

  /* POST COMMENT */
  async postComment(comment) {
    const rte = `/comments`;
    try {
      const res = await this.BandsiteServer.post(rte, comment);
      return res.data;
    } catch (error) {
      console.error(error);
    };
  };

  /* LIKE COMMENT */
  async likeComment(id) {
    const rte = `/comments/${id}/like`;
    try {
      const res = await this.BandsiteServer.put(rte);
      return res.data;
    } catch (error) {
      console.error(error);
    };
  };

  /* DELETE COMMENT */
  async deleteComment(id) {
    const rte = `/comments/${id}`;
    try {
      const res = await this.BandsiteServer.delete(rte);
      return res.data;
    } catch (error) {
      console.log(error);
    };
  };

  /* GET SHOWS */
  async getShows() {
    const rte = `/showdates`;
    try {
      const res = await this.BandsiteServer.get(rte);
      return res.data;
    } catch (error) {
      console.error(error);
    };
    console.log(res.data);
  };

};

const apiKey = "b89ace06-b991-4a5b-8f17-81c6da771bc9";
const bandsiteApi = new BandSiteApi(apiKey);
