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
        return {
            name: this.name,
            guid: this.guid
        }
    }

    getSelf() {
        return {
            guid: this.guid,
            name: this.name,
            token: this.token
        }
    }
    
    async fillData(data) {
        this.id = data.id;
        this.guid = data.guid;
        this.name = data.name;
        this.passwordHash = data.passwordHash;
        // update token
        const token = this.generateToken();
        await this.db.updateToken(data.id, token);
        this.token = token;		
    }

    isLogin() {
        return this.socketId && this.token;
    }
    
    generateToken() {
        return md5(Date.now() + Math.random().toString());
    }	

    async logout() {
        this.token = null;
        await this.db.updateToken(this.id, null);
    }

    async login(name, password) {
        const userData = await this.db.getUserByName(name);
        if (!userData) return false;
        const passwordHash = md5(password);
        if (userData.passwordHash === passwordHash) {
            await this.fillData(userData);
            return true;
        }
        return false;
    }    

    async registration(name, password) {
        if (await this.db.getUserByName(name)) {
            return false;
        }
        const passwordHash = md5(password);
        const guid = this.common.guid();
        const userData = await this.db.registration(name, guid, passwordHash);
        return await this.login(name, login);
    }
    
}

module.exports = User;