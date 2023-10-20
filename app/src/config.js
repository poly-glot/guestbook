const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    ALLOWED_ORIGIN,
} = process.env;

module.exports = {
    url: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    cors: ALLOWED_ORIGIN,
};
