import aws from 'aws-sdk';

const identityServiceProvider = new aws.CognitoIdentityServiceProvider({
    region: 'us-east-1',
});

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const rawUser = await identityServiceProvider.getUser({ AccessToken: token }).promise();
        
        let nombre = rawUser.UserAttributes.find((attr) => attr.Name === 'name')
        let email = rawUser.UserAttributes.find((attr) => attr.Name === 'email')
        req.user = {
            nombre: nombre ? nombre.Value : '',
            email: email ? email.Value : '',
        };
        next();
    } catch (err) {
        next(err);
    }
};

export default authMiddleware;