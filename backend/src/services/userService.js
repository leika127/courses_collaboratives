import { userModel } from '../models/user.model.js';

// Utilisateurs de la famille de la personne connectée
const listFamilyUsers = async (familyId) => {
  return await userModel.findAllByFamilyId(familyId);
};

export const userService = { listFamilyUsers };