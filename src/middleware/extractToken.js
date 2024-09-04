function extractToken(req, res, next) {
    const token = req.cookies.youcanToken;
    if (token) {
        console.log(`Cookies : ${token.slice(0, 10)} ... `);
        req.authToken = token; 
    } else {
        req.authToken = null;
    }

    next(); 
}

module.exports = extractToken;