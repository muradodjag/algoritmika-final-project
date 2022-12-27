class CoinService {
    constructor(Coin) {
        this.coin = Coin
    }

    async getByCategory(id) {
        try {
            return await this.coin.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    category: id
                }
            })

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