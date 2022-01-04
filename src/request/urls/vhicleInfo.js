let BASE_URL = require("./baseUrl").BASE_URL;

const VEHICLE_URL = BASE_URL + '/vehicle';
const PARTNER_URL = BASE_URL + '/partner';
const PREPAREDNESS_URL = BASE_URL + '/preparedness'
const RECORGNIZE_URL = BASE_URL + '/recognition'
const RECORGNIZE_VIN_URL = BASE_URL + '/recognition/vinCode'


module.exports = {
    VEHICLE_URL,
    PARTNER_URL,
    PREPAREDNESS_URL,
    RECORGNIZE_URL,
    RECORGNIZE_VIN_URL
}