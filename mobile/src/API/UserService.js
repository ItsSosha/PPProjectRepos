export default class UserService {
    static async get(jwt) {
        const resp = await fetch("https://pricely.tech/api/User?" + new URLSearchParams({
            jwt
        }));

        if (!resp.ok) {
            throw new Error("Can't fetch user by jwt");
        }

        const user = await resp.json();
        const jwtUser = {...user, jwt};
        return jwtUser;
    }
}