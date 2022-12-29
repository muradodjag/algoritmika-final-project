class CoinService {
    constructor(Coin) {
        this.coin = Coin
    }


    async getByCategory(id, query) {

        const paginate = (query, page, pageSize) => {

            const offset = page * pageSize;
            const limit = pageSize;
            return {
                ...query,
                offset,
                limit
            }
        }
        try {
            return await this.coin.findAll(paginate({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    category: id
                }
            }, query.page, query.pageSize))

        } catch (err) {
            throw new Error(err)
        }
    }
    async getById(id) {
        try {
            return await this.coin.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    id: id
                }
            })

        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = CoinService