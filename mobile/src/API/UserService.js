export default class UserService {
  static async get(jwt) {
    const resp = await fetch(
      "https://pricely.tech/api/User?" +
        new URLSearchParams({
          jwt,
        })
    );

    if (!resp.ok) {
      throw new Error("Can't fetch user by jwt");
    }

    const user = await resp.json();
    const jwtUser = { ...user, jwt };
    return jwtUser;
  }

  static async setNotificationToken(jwt, token) {
    const resp = await fetch(
      "https://pricely.tech/api/User/setNotificationToken?" +
        new URLSearchParams({ token: token }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jwt),
      }
    );

    if (!resp.ok) {
      console.log(resp);
      throw new Error("Can't set user notification token");
    }
  }

  static async getUserSubscription(jwt) {
    const response = await fetch(
      `https://pricely.tech/api/User/getSubscription?jwt=${jwt}`
    );

    const subscription = await response.json();
    const user = subscription.user;
    const subUser = {
      ...user,
      expireDate: new Date(subscription.expireDate),
      isPremium: new Date(subscription.expireDate) > Date.now(),
      jwt,
    };
    return subUser;
  }
}
