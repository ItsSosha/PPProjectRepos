export default class FavouritesService {
    static async getAll(userId, offset, limit) {
        const resp = await fetch("https://pricely.tech/api/Favourites/getPaginated?" + new URLSearchParams({
            userId,
            offset,
            limit
        }));

        if (!resp.ok) {
            throw new Error("Can't fetch user favourites");
        }
        const data = await resp.json();
        return data;
    }

    static async isOnFavourites(jwt, itemId) {
        const resp = await fetch("https://pricely.tech/api/Favourites/isOnFavourites?" + new URLSearchParams({
            jwt,
            itemId
        }));

        if (!resp.ok) {
            throw new Error("Can't fetch isOnFavourites");
        }

        const data = await resp.json();
        return data;
    }

    static async updateProductFavourite(id, jwt, isFavourited) {
        const resp = await fetch(`https://pricely.tech/api/Favourites?itemId=${id}`, {
          method: isFavourited ? "DELETE" : "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jwt)
        })

        if (!resp.ok) {
            console.log(resp);
            throw new Error("Can't remove/add product from/to favourites");
        }
    }
}