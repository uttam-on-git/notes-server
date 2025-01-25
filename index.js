import config from './utils/config.js'
import app from './app.js'
import logger from './utils/logging.js'
import helper from './tests/test_helper.js'

app.listen(config.PORT, () => {
    logger.info(`Server running on ${config.PORT}.`)
})