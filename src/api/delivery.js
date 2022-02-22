import api from "./index";

const Delivery = {
  create: (userData, longitude, latitude) => {
    const token = localStorage.getItem("id_token");
    return api.post("/deliveries", {
      ...userData,
      longitude,
      latitude,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  updateDelivery: (id, description, quantity, for_user_id, longitude, latitude) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdate/" + id,
      {
        description: description,
        quantity: quantity,
        for_user_id: for_user_id,
        longitude: longitude,
        latitude: latitude,
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

  updateRejectedByAcopio: (id, rejected) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdaterejectedbyacopio/" + id,
      {
        rejected: rejected,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateScoreCommentByFarm: (id, scorecomment) => {
    const token = localStorage.getItem("id_token");

    return api.put(
      "/deliveriesupdatescorecommentbyfarm/" + id,
      {
        scorecomment: scorecomment,
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
