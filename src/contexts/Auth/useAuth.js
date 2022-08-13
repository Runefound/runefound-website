// Module imports
import { useContext } from 'react'





// Local imports
import { AuthContext } from './AuthContext.js'





/**
 * @returns {object} The application's authentication context.
 */
export const useAuth = () => useContext(AuthContext)
