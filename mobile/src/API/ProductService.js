export default class ProductService {
    static async getById(id) {
        const resp = await fetch(`https://pricely.tech/api/Item/${id}`);

        if (!resp.ok) {
            console.log(resp);
            throw new Error("Can't get product by id");
        }

        const item = await resp.json();
        return item;
    }
}