import db from './dbConnection'

// Réexporter l'instance axios centralisée (dbConnection)
// Cela permet aux anciens imports `import apiClient from './api'` de continuer à fonctionner
export default db.instance

// Exposer aussi les helpers de gestion du token si nécessaire
export const setToken = db.setToken
export const clearToken = db.clearToken
export const getToken = db.getToken
