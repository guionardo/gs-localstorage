const maxTS = 8640000000000000

class GSLocalStorage {


    constructor(key, options = {}) {
        if (!key) {
            throw new Error("Missing string 'key' parameter")
        }
        this.KEY = key
        this.store = options.storage || window.localStorage
        this.debug = options.debug
        const isStorageCreated = this.store.getItem(this.KEY)
        if (!isStorageCreated) {
            this.store.setItem(this.KEY, JSON.stringify({}))
            this.logDebug('CREATE KEY', key)
        } else {
            this.logDebug('INSTANCE KEY', key)
        }
        this._loadStore()
    }

    _loadStore() {
        this.storeData = JSON.parse(this.store.getItem(this.KEY))
    }

    _saveStore() {
        this.store.setItem(this.KEY, JSON.stringify(this.storeData))
    }

    logDebug(msg, data = null) {
        if (this.debug) {
            console.debug(`[GSLocalStorage] ${msg}`, data)
        }
    }
    _validateKey(key) {
        if (!(key && typeof key == 'string')) {
            throw new Error("Invalid 'key' argument. String expected")
        }
    }
    _currentTimeStamp() {
        return new Date().getTime()
    }
    /**
     * @method set
     * @param {String} key 
     * @param {Object} value 
     * @param {Number} ttl 
     */
    set(key, value, ttl = 0) {
        this._validateKey(key)
        if (!(ttl && typeof ttl == 'number' && ttl > 0)) {
            ttl = maxTS
        } else {
            ttl = this._currentTimeStamp() + ttl * 1000
        }
        this._loadStore()
        this.storeData[key] = { v: value, t: ttl }
        this._saveStore()
    }

    get(key) {
        this._validateKey(key)
        this._loadStore()
        const data = this.storeData[key]
        if (data) {
            if (data.t > this._currentTimeStamp()) {
                return data.v
            }
            delete this.storeData[key]
            this._saveStore()
        }
        return null
    }

    delete(key) {
        this._validateKey(key)
        this._loadStore()
        const data = this.storeData[key]
        if (data) {
            delete this.storeData[key]
            this._saveStore()
        }
    }

}

// window.GSLocalStorage = GSLocalStorage;
export default GSLocalStorage;