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

  updateDeliveryNotification: (id, date, hour) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdatenotification/" + id,
      {
        date: date,
        hour: hour,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateDeliveryScore: (id, score) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdatescore/" + id,
      {
        score: score,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateStateByFarm: (id, state) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdatestatebyfarm/" + id,
      {
        state: state,
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
