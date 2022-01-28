let BASE_URL = require("./baseUrl").BASE_URL;

const STATISTICS_URL = BASE_URL + '/statistics';
const YEAR_STAT_URL = BASE_URL + '/statistics/fullYearStat'
const MONTH_SALED_URL = BASE_URL + '/statistics/monthSaledStatDetail'
const MONTH_UNSALED_URL = BASE_URL + '/statistics/monthUnsaledStatDetail'

module.exports = {
    STATISTICS_URL,
    YEAR_STAT_URL,
    MONTH_SALED_URL,
    MONTH_UNSALED_URL
}