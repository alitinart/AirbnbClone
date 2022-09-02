import axios from "axios";
import User from "../models/user.model";

const API_URL = "http://localhost:8080/api/v1";

export const requests = {
  userRequests: {
    registerUser: async (user: User) => {
      const { data } = await axios.post(`${API_URL}/users/register`, user);
      return data;
    },
    loginUser: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      return data;
    },
  },
};
