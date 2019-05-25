import * as express from 'express';
import * as jwt from 'express-jwt';
import * as expressJoi from 'joi-express';
import * as Joi from 'joi';
import UserController from '../controllers/user';
const userCtrl = new UserController();


const auth = jwt({
	secret: process.env.SECRET_TOKEN,
	userProperty: 'payload'
});

const changePasswordSchema = {
	body: {
		oldPassword: Joi.string().required(),
		newPassword: Joi.string().required(),
	},
	headers: {
		authorization: Joi.string().required()
	}
};

const setPasswordSchema = {
	body: {
		token: Joi.string().required(),
		password: Joi.string().required(),
	}
};

const router = express.Router();

router.route('/auth').get(auth, userCtrl.auth);

setTimeout(function() {
	userCtrl.checkTemp();
}, 500);


export default router;