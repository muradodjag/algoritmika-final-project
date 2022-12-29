const { Sequelize } = require("sequelize")

class AdminService {
    constructor(Coin) {
        this.coin = Coin
    }
    async getCoinsByName(query) {
        try {
            const Op = Sequelize.Op
            return await this.coin.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query.name.toLowerCase()}%` } },
                    ]
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }
    async createCoin(body) {
        try {
            await this.coin.create(body)
        } catch (err) {
            throw new Error(err)
        }
    }
    async updateCoinInfo(id, body) {
        try {
            const coin = await this.coin.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    id: id
                }
            })
            console.log(coin)
            await coin.update(body)
        } catch (err) {
            throw new Error(err)
        }
    }
    async deleteCoin(id) {
        try {
            await this.coin.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }

}

module.exports = AdminService