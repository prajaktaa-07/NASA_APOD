class APODCache {
    constructor(expireTimeMs) {
        this.expire = expireTimeMs;
        this.storage = {};
    }

    get(key) {
        const item = this.storage[key];
        if (!item) return null;

        if (Date.now() > item.expiry) {
            delete this.storage[key];
            return null;
        }
        return item.data;
    }

    set(key, value) {
        this.storage[key] = {
            data: value,
            expiry: Date.now() + this.expire
        };
    }
}

module.exports = APODCache;
