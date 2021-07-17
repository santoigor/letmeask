import { useContext } from 'react'
import { AuthContext } from '../_contexts/AuthContext'

export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}