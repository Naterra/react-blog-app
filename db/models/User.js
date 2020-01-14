const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


/*
* position - Math teacher/ History teacher
* organization - School ID for representative/teacher
* leadClass -  teacher whos lead the class
* studentOfClass - student study in class
* */
const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, index: { unique: true } },
	password: { type: String, required: true },
	image: { type: String },
	status: { type: Number, default: 0 },
	emailVerified: { type: Boolean, default: false }
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
	bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
	const user = this;

	// proceed further only if the password is modified or the user is new
	if (!user.isModified('password')) return next();

	return bcrypt.genSalt((saltError, salt) => {
		if (saltError) {
			return next(saltError);
		}

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if (hashError) {
				return next(hashError);
			}

			// replace a password string with hash value
			user.password = hash;

			return next();
		});
	});
});


module.exports = mongoose.model('User', UserSchema);
