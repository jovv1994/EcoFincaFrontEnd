import api from "./index";

const Delivery = {
  create: (data) => {
    return api.post("/deliveries", data);
  },
  allPost: () => {
    const token = localStorage.getItem("id_token");

    return api.get("/deliveries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateAcopio: (id, newState) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveries/" + id,
      { state: newState },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default Delivery;
