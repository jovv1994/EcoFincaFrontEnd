import api from "./index";

const Parroquia = {
  all: () => {
    return api.get("/parroquias");
  },

  someone: (id) => {
    return api.get(`/parroquias/${id}`);
  },
};

export default Parroquia;
