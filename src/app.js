const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const compression = require('compression')
const config = require('./config')
const auth = require('./middleware/auth')

const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Coin API",
            version: "1.0.0",
            description: "Docs for Coin APi"
        },
        servers: [
            {
                url: "http://localhost:3005"
            }
        ],
    },
    apis: ["./routes/*.js"],

}

const specs = swaggerJsDoc(options)
app.use(cookieParser())
app.use(compression())
app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: 'GET,PUT,POST,OPTIONS,DELETE'
    })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(helmet())
app.use(express.json())

app.all(`${config.API_BASE}/admin*`, (req, res, next) => {
    const publicRoutes = config.PUBLIC_ROUTES
    for (let i = 0; i < publicRoutes.length; i += 1) {
        if (req.path === publicRoutes[i]) {
            return next()
        }
    }
    auth(req, res, next)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Algoritmika final project</h1>')
})
app.use(config.API_BASE, routes)

module.exports = app