import {AccessToken, User, UserSessionToken, Credentials} from './user.resources'
import jwt from 'jwt-decode'

class AuthService{
    baseUrl: string = 'http://localhost:8080/v1/users';

    static AUTH_PARAM: string = '_auth';

    async authenticate(credentials: Credentials) : Promise<AccessToken> {
        const response = await fetch(this.baseUrl + '/auth', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        if (response.status == 401){
            throw new Error("O usuário ou senha estão incorretas")
        }

        return await response.json();
    }

    async save(user: User) : Promise<void>{
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        if (response.status == 409){
            const error = await response.json();
            throw new Error(error.error);
        }

    }

    initSession(token: AccessToken){
        if (token.accessToken){
            const decodedToken: any = jwt(token.accessToken);

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email:decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp
            }

            this.setUserSession(userSessionToken)

        }
    }

    setUserSession(useSessionToken: UserSessionToken){
        localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(useSessionToken))
    }

    getUserSession() : UserSessionToken | null {
        const authString = localStorage.getItem(AuthService.AUTH_PARAM);
        if (!authString){
            return null
        }

        const token : UserSessionToken = JSON.parse(authString);

        return token;
    }

    isSessionValid() : boolean{
        const userSession: UserSessionToken | null = this.getUserSession();

        if (!userSession){
            return false
        }

        const expiration : number | undefined = userSession.expiration;

        if (expiration){
            const expirationDateInMilis = expiration * 1000;
            return new Date() < new Date(expirationDateInMilis);
        }

        return false;

    }
}

export const useAuth = () => new AuthService();