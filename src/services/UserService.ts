import { HttpClient } from '../client/http/http-client';

import type { User } from '../types/user';

class UserService {
  getUser = async () => await HttpClient.get<User>('/User');
}

export default new UserService();
