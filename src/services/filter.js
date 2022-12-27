const { Sequelize } = require("sequelize")

class FilterService {
    constructor(Coin) {
        this.coin = Coin
    }

    async getInfo(fieldName) {
        try {

            return [...(await this.coin.findAll({
                attributes: [fieldName],
                group: [fieldName]
            })).map(coin => coin[fieldName])]
        } catch (err) {
            throw new Error(err)
        }
    }
    async getCoins(query) {
        try {
            const Op = Sequelize.Op
            const len = Object.keys(query).length
            return len == 1 ? await this.coin.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.like]: `%${query.search}%` } },
                        { shortDescription: { [Op.like]: `%${query.search}%` } },
                        { longDescription: { [Op.like]: `%${query.search}%` } }
                    ]
                }
            }) : await this.coin.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.like]: `%${query.search}%` } },
                        { shortDescription: { [Op.like]: `%${query.search}%` } },
                        { longDescription: { [Op.like]: `%${query.search}%` } }
                    ],
                    [Op.and]: [
                        query.country ? { country: { [Op.eq]: query.country } } : true,
                        query.metal ? { metal: { [Op.eq]: query.metal } } : true,
                        query.quality ? { quality: { [Op.eq]: query.quality } } : true,
                        query.priceFrom ? { price: { [Op.between]: [query.priceFrom, query.priceTo] } } : true,
                        query.yearFrom ? { price: { [Op.between]: [query.yearFrom, query.yearTo] } } : true,
                    ]
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = FilterService