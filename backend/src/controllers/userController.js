import { userService } from '../services/user.service.js';

const list = async (req, res) => {
  const users = await userService.listFamilyUsers(req.utilisateur.familyId);
  return res.status(200).json(users);
};

export const userController = { list };