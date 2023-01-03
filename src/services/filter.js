const { Sequelize } = require("sequelize")

class FilterService {
    constructor(Coin) {
        this.coin = Coin
        this.count = 0
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
    async getCount() {
        return this.count
    }
    async getCoins(query) {

        const paginate = async (query, page, pageSize) => {
            this.count = await this.coin.count(query);
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
            return len == 3 ? await this.coin.findAll(await paginate({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {

                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { shortDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } },
                        { longDescription: { [Op.iLike]: `%${query.search.toLowerCase()}%` } }
                    ]
                }
            }, query.page, query.pageSize)) : await this.coin.findAll(await paginate({
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
                        query.category ? { category: query.category } : true,
                        (query.priceFrom && query.priceTo) ? { price: { [Op.between]: [query.priceFrom, query.priceTo] } } : (query.priceFrom) ? { price: { [Op.gte]: query.priceFrom } } : (query.priceTo) ? { price: { [Op.lte]: query.priceTo } } : true,
                        (query.yearFrom && query.yearTo) ? { year: { [Op.between]: [query.yearFrom, query.yearTo] } } : (query.yearFrom) ? { year: { [Op.gte]: query.yearFrom } } : (query.yearTo) ? { year: { [Op.lte]: query.yearTo } } : true,
                    ]
                }
            }, query.page, query.pageSize))
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = FilterService