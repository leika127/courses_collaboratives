// Crée une erreur qui transporte un code HTTP (ex : 404, 409)
// Le service la lance avec throw, le contrôleur lit error.status
export const httpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
