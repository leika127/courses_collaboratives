import { userModel } from '../models/user.model.js';

const listFamilyUsers = async (familyId) => {
  return await userModel.findAllByFamilyId(familyId);
};

export const userService = { listFamilyUsers };