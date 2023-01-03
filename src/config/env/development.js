class Config {
    constructor() {
        this.env = 'development'
        this.PORT = process.env.PORT || 3005
        this.API_BASE = '/api'
        this.DATABASE_HOST = 'localhost'
        this.DATABASE_PORT = 5432
        this.DATABASE = 'store'
        this.DATABASE_USERNAME = 'Algo'
        this.DATABASE_PASSWORD = 'algoritmika'
        this.JWT_SECRET = '1jCMc8GgWQ6IHFaxMv2UWmA6TM'
        this.COOKIE_SECURE = false
        this.COOKIE_SAME_SITE = 'Strict'
        this.PUBLIC_ROUTES = ['/api/admin/signin', '/api/admin/signup']
        this.CLIENT_URL = 'http://localhost:3000'
    }
}

module.exports = new Config()