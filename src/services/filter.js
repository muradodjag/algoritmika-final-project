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
        const paginate = (query, page, pageSize) => {
            console.log('page', page)
            const offset = page * pageSize;
            const limit = pageSize;
            return {
                ...query,
                offset,
                limit
            }
        }
        try {
            const Op = Sequelize.Op
            const len = Object.keys(query).length
            return len == 3 ? await this.coin.findAll(paginate({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { shortDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { longDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } }
                    ]
                }
            }, query.page, query.pageSize)) : await this.coin.findAll(paginate({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { shortDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { longDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } }
                    ],
                    [Op.and]: [
                        query.country ? { country: { [Op.iLike]: query.country.toLowerCase() } } : true,
                        query.metal ? { metal: { [Op.iLike]: query.metal.toLowerCase() } } : true,
                        query.quality ? { quality: { [Op.iLike]: query.quality.toLowerCase() } } : true,
                        query.priceFrom ? { price: { [Op.between]: [query.priceFrom, query.priceTo] } } : true,
                        query.yearFrom ? { price: { [Op.between]: [query.yearFrom, query.yearTo] } } : true,
                    ]
                }
            }, query.page, query.pageSize))
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = FilterService