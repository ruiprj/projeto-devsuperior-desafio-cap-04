import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const getTokenData = () : TokenData | undefined => {
    const loginResponse = getAuthData();

    try {
        return jwtDecode(loginResponse.access_token) as TokenData;
    } catch (error) {
        return undefined;
    }
}

export const isAuthenticated = () => {
    const tokenData = getTokenData();

    return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
}

export const hasAnyRoles = (roles: Role[]) : boolean => {
    if (roles.length === 0) {
        return false;
    }

    const tokenData = getTokenData();
    if (tokenData !== undefined) {
        for (var i = 0; i < roles.length; i++) {
            if (tokenData.authorities.includes(roles[i])) {
                return true;
            }
        }
    }

    return false;
}
