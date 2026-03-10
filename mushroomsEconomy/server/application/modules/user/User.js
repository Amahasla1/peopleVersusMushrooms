const md5 = require('md5');

class User {
    constructor({ db, common, socketId }) {
        this.db = db;
        this.common = common;
        this.socketId = socketId;
        // from DB
        this.id;
        this.guid;
        this.name;
        this.passwordHash;
        this.token;
    }

    get() {
        if (!this.id) return null;

        const userData = this.db.getUserById(this.id);
        if (userData) {
            this.id = userData.id;
            this.guid = userData.guid;
            this.name = userData.name;
            this.passwordHash = userData.passwordHash;
            this.token = userData.token;
        }

        return this;
    }

    getSelf() {
        
    }

    isLogin() {
        return this.socketId && this.token;
    }

    login(name, password) {
        const userData = this.db.getUserByName(name);
        if (!userData) return null;

        const passwordHash = this.hashPassword(password);

        if (userData.password === passwordHash) {
            this.id = userData.id;
            this.guid = userData.guid;
            this.name = userData.name;
            this.passwordHash = userData.passwordHash;
            this.token = userData.token;
            return this;
        }

        return null;
    }
    
    logout() {
        this.token = null;
    }

    registration(name, password) {
        const passwordHash = this.hashPassword(password);
        const token = this.generateToken();

        const userData = this.db.registration(name, passwordHash, token);

        if (userData) {
            this.id = userData.id;
            this.guid = userData.guid;
            this.name = userData.name;
            this.passwordHash = userData.passwordHash;
            this.token = userData.token;
        }

        return this;
    }

    hashPassword(password) {
        return crypto('sha256').update(password).digest('hex');
    }
    
    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = User;