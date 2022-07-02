import CognitoUserPoolHelper from '../helpers/CongnitoUserPoolHelper.js'
import aws from 'aws-sdk';

class UserController {

    cognitoUserPoolHelperInstancia = new CognitoUserPoolHelper()

    identityServiceProvider = new aws.CognitoIdentityServiceProvider({
        region: 'us-east-1',
    });

    constructor() {
    }

    async signUp(req, res) {
        try {
            const result = await this.cognitoUserPoolHelperInstancia.registrarUsuario(req.body);
            res.json({ mensaje: result });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.cognitoUserPoolHelperInstancia.signIn({ email, password });
            res.json(result);
        } catch (err) {
            if (err.name == 'NotAuthorizedException') {
                res.status(403).json({ message: "No existe usuario con ese email y contraseña." });
            } else if (err.name == 'UserNotConfirmedException') {
                res.status(403).json({ message: "El usuario aun no esta confirmado. Se le ha enviado un Email con el codigo de verificacion." });
            } else {
                res.status(403).json({ message: err.message });
            }
        }
    }

    async getProfile(req, res) {
        try {
            const token = req.headers['authorization'];
            const rawUser = await this.identityServiceProvider.getUser({ AccessToken: token }).promise();
    
            let nombre = rawUser.UserAttributes.find((attr) => attr.Name === 'name')
            let email = rawUser.UserAttributes.find((attr) => attr.Name === 'email')
            if (nombre == '' || nombre == null || nombre == undefined) {
                res.status(403).json({ message: "El usuario no esta logueado." });
            }

            res.json({nombre, email})
        } catch (err) {
            res.status(403).json({ message: "El usuario no esta logueado." });
        }
    }

    async estaLogueado(req, res) {
        try {
            const token = req.headers['authorization'];
            await this.identityServiceProvider.getUser({ AccessToken: token }).promise();
            res.status(200).json({logueado: true})
        } catch (err) {
            res.status(200).json({logueado: false, error: err})
        }

    }

    async recuperarContrasenia(req, res) {
        try {
            const result = await this.cognitoUserPoolHelperInstancia.passwordRecovery(req.body.email)
            res.json({ mensaje: result })
        } catch (err) {
            res.status(500).json({ error: err});
        }
    }

    async confirmarContrasenia(req, res) {
        try {
            const result = await this.cognitoUserPoolHelperInstancia.confirmPassword(req.body)
            res.json({ mensaje: result })
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async confirmarCuenta(req, res) {
        try {
            const result = await this.cognitoUserPoolHelperInstancia.confirmarCuenta(req.body)
            res.json({ mensaje: result })
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default UserController;