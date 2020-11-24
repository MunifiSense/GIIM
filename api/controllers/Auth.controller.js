var config = '../config/auth.config.js';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.client_id);

exports.authenticate = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        const ticket = await client.verifyIdToken({
            idToken: bearerToken,
            audience: config.client_id
        });

        const payload = ticket.getPayload();

        console.log(`User ${payload.name} authenticated!`);
        req.email = payload.email;
        req.id = payload.sub;
        next();
    }else{
        res.status(403).send({
            message:
                err.message || "An error occured while authenticating."
        });
    }
    
}


