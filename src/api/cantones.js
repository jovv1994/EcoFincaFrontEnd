import api from "./index";

const Canton = {
  all: () => {
    return api.get("/cantones");
  },

  someone: (id) => {
    return api.get(`/cantones/${id}`);
  },

  parroquias: (id) => {
    return api.get(`/cantones/${id}/parroquias`);
  },
};

export default Canton;
