import api from "./index";

const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
    });
  },
  login: (data) => {
    return api.post("/login", data);
  },
  logout: () => {
    return api.post("/logout");
  },
  sendPasswordResetEmail: (email) => {
    return api.post("/forgot-password", { email });
  },
  confirmPasswordReset: (id, password) => {
    console.log(id, password);
    return api.post("/reset-password", {
      id,
      password,
    });
  },
  getAuthenticatedUser: () => {
    return api.get("/user");
  },
  getCollectionCenters: () => {
    return api.get("/users");
  },

  showAll: () => {
    return api.get("/allusers");
  },
};

export default User;
