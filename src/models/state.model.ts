import User from "./user.model";

export interface State {
  user: {
    token?: string;
    data?: User;
  };
}
