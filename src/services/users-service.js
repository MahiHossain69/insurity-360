import requests from "@/lib/http-service";

const usersService = {
  // Public endpoints
  async registerUser(userData) {
    return requests.post('/users/register', userData);
  },

  async loginUser(credentials) {
    return requests.post('/users/login', credentials);
  }
};

export default usersService;export const { registerUser, loginUser } = usersService;
