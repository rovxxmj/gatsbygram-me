const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const REG_PHONE = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/i;

module.exports = { REG_PHONE, REG_EMAIL };
