
import axiosInstance from "../services/axios";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const secretKey = `${process.env.NEXTAUTH_SECRET}`;

// // Función para firmar y encriptar el token JWT
// const signAndEncryptToken = (token: string) => {
//     return jwt.sign(token, secretKey, { expiresIn: '7d' }); // Expira después de 7 días
// };

// // Función para verificar y desencriptar el token JWT
// const verifyAndDecryptToken = (token: string) => {
//     return jwt.verify(token, secretKey);
// };

export const setSession = (accessToken: string, refreshToken: string | null = null ): void => {
    if(accessToken){
        // const encryptedAccessToken = signAndEncryptToken(accessToken);
        // Cookies.set('accessToken', encryptedAccessToken, { 
        //     expires: 7, // Expira después de 7 días
        //     secure: true, // Solo se envía a través de conexiones HTTPS     
        //     httpOnly: true, // No accesible a través de JavaScript
        //     sameSite: 'Strict' // Solo se envía en solicitudes del mismo sitio
        // });
        // Cookies.set('accessToken', accessToken, { expires: 7 }); // Expira después de 7 días
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
        
        localStorage.removeItem("accessToken")
        delete axiosInstance.defaults.headers.common["Authorization"]
    }

    if(refreshToken){
        // Cookies.set('refreshToken', refreshToken, { 
        //     expires: 7, // Expira después de 7 días
        //     secure: true, // Solo se envía a través de conexiones HTTPS
        //     httpOnly: true, // No accesible a través de JavaScript
        //     sameSite: 'Strict' // Solo se envía en solicitudes del mismo sitio
        // });
        localStorage.setItem("refreshToken", refreshToken);
    }
};

export const resetSession = () => {
    // Cookies.remove('accessToken');
    // Cookies.remove('refreshToken');
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
}