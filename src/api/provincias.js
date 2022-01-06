import api from "./index";

const Provincia = {
  all: () => {
    return api.get("/provincias");
  },

  someone: (id) => {
    return api.get(`/provincias/${id}`);
  },

  cantones: (id) => {
    return api.get(`/provincias/${id}/cantones`);
  },
};

export default Provincia;
