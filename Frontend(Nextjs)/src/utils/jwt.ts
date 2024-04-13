
import { jwtDecode } from 'jwt-decode';

export const validateToken =(token: string):boolean=> {
    const now = Math.round(new Date().getTime() / 1000);
    const decodedToken = jwtDecode(token);
    const isValid: boolean = decodedToken && now < (decodedToken.exp || 0);

    return isValid
};