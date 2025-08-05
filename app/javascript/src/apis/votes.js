import axios from "axios";

const update = (slug, payload) => axios.post(`/posts/${slug}/vote`, payload);

const votesApi = { update };

export default votesApi;
