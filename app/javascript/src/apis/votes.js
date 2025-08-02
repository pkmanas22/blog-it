import axios from "axios";

const index = () => axios.get("/me/votes");

const update = (slug, payload) => axios.post(`/posts/${slug}/vote`, payload);

const votesApi = { index, update };

export default votesApi;
