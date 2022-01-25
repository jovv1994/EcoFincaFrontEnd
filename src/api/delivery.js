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

  updateDelivery: (id, description, quantity, address, for_user_id) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdate/" + id,
      {
        description: description,
        quantity: quantity,
        address: address,
        for_user_id: for_user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default Delivery;
