import { User } from '../types/User';

export const checkUserIsAdmin = (currentUser: User) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) return true;

  return false;
};
