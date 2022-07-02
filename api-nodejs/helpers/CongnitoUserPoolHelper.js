import { CognitoUserAttribute, AuthenticationDetails, CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js"

class CongnitoUserPoolHelper {

    userPool

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: 'us-east-1_oYssl4J2i', // Your user pool id here
            ClientId: 'hcs7acmblmclh1hdddv425f6' // Your client id here
        })
    }

    registrarUsuario({ nombre, email, direccion, password }) { // agregar los datos que faltan
        return new Promise((resolve, reject) => {
            const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email,
                }),
                new CognitoUserAttribute({
                    Name: 'name',
                    Value: nombre,
                }),
                new CognitoUserAttribute({
                    Name: 'address',
                    Value: direccion,
                })
            ];

            this.userPool.signUp(email, password, attributeList, [], (err, result) => {
                if (err) {
                    if (err.name === 'InvalidPasswordException') {
                        reject('El password debe tener al menos 8 caracteres, 1 caracter especial y una mayuscula.')
                    } else if (err.name === 'InvalidParameterException') {
                        reject('Se ingreso un email invalido o falto completar algun dato en el formulario.')
                    } else if (err.name === 'UsernameExistsException') {
                        reject('Ya existe un usuario registrado con ese Email')
                    } else {
                        reject(err.message || JSON.stringify(err))
                    }
                } else {
                    resolve(result?.user.getUsername() || '');
                }
            });
        });
    }

    signIn({ email, password }) {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.userPool,
            });

            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session, userConfirmationNecessary) => {
                    if (userConfirmationNecessary) {
                        return resolve({ userConfirmationNecessary });
                    }

                    resolve({
                        accessToken: session.getAccessToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken(),
                    });
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }

    passwordRecovery(email) {
        let userData = { Username: email, Pool: this.userPool }
        var cognitoUser = new CognitoUser(userData)

        return new Promise((resolve, reject) => {
            cognitoUser.forgotPassword(
                {
                    onFailure: (p1) => {
                        reject('No hay usuario registrado con ese Email')
                    },
                    onSuccess: (p1) => {
                        resolve('Email enviado')
                    }
                }
            )
        })
    }

    confirmPassword({ email, codigo, password }) {
        let userData = { Username: email, Pool: this.userPool }
        var cognitoUser = new CognitoUser(userData)

        return new Promise((resolve, reject) => {
            cognitoUser.confirmPassword(codigo, password,
                {
                    onFailure: (err) => {
                        if (err.name == 'InvalidPasswordException') {
                            reject('El password debe tener al menos 8 caracteres, 1 caracter especial y una mayuscula.')
                        } else if (err.name == 'ExpiredCodeException') {
                            reject('El codigo expiro o el email ingresado es incorrecto')
                        } else {
                            reject('El codigo no es el correcto')
                        }
                        this.cargando = false
                    },
                    onSuccess: (p1) => {
                        resolve('Nueva contraseña seteada')
                    }
                }
            )
        })
    }

    confirmarCuenta({ email, codigo }) {
        let userData = { Username: email, Pool: this.userPool }
        var cognitoUser = new CognitoUser(userData)

        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(codigo, true, (
                err,
                result
            ) => {
                if (err) {
                    this.mostrarError = true
                    if (err.name === 'CodeMismatchException') {
                       reject('Codigo incorrecto')
                    } else {
                       reject('Hubo un error inesperado')
                    }
                } else {
                    resolve('Cuenta confirmada')
                }
            })
        })

    }
}

export default CongnitoUserPoolHelper;