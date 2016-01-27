export const ROOT_URL = 'https://api.twitch.tv/kraken';
export const HTTP_TIMEOUT = 5000;


/**
 * Twitch API v3
 */
export class TwitchApi {
    constructor(user = Meteor.user()) {
        this.user = user;
        this.clientId = Meteor.settings.public.TWITCH_CLIENT_ID;
        this.accessToken = user.services.twitch.accessToken;
    }

    /**
     * Authorization headers for current channel
     *
     * @return {object}
     */
    get headers() {
        return {
            Accept: "application/vnd.twitchtv.v3+json",
            'Client-ID': this.clientId,
            Authorization: `OAuth ${this.accessToken}`
        }
    }

    /**
     * Promise last of {limit} followers of current channel
     *
     * @param limit {number}
     * @param offset {number}
     * @param direction {'desc'|'asc'}
     * @param callback {function(object, Array<Follower>)}
     */
    getFollowers(limit=25, offset=0, direction='desc') {
        const result = this.request(`/channels/${this.user.services.twitch.name}/follows`, {limit,  offset, direction});
        return result.follows.map(f => new Follower(f));
    }

    /**
     * @return {Stream}
     */
    getStreams() {
        const result = this.request(`/streams/${this.user.services.twitch.name}`);
        return new Stream(result.stream);
    }

    /**
     * @return {User}
     */
    getSelfInfo() {
        const user = this.request('/user');
        return new User(user);
    }

    /**
     * @param username {string}
     * @return {User}
     */
    getUserInfo(username) {
        const user = this.request(`/users/${username}`);
        return new User(user);
    }

    hasSubscription(username) {
        try {
            return this.request(`/channels/${this.user.services.twitch.name}/subscriptions/${username}`);
        } catch(ex) {
            return false;
        }
    }

    /**
     * @param username {string}
     * @return Follower
     */
    checkUserFollower(username) {
        const follower = this.request(`/users/${username}/follows/channels/${this.user.services.twitch.name}`);
        follower.user = this.getUserInfo(username);
        return new Follower(follower);
    }

    /**
     * @param method {string}
     * @param params {object}
     * @return {object}
     */
    request(method, params = {}) {
        return HTTP.get(ROOT_URL + method, {
            headers: this.headers,
            timeout: HTTP_TIMEOUT,
            params: params
        }).data;
    }
}


class User {
    constructor(obj) {
        /**
         * @type {string}
         * @public
         */
        this._id = obj._id.toString();

        /** @type {"user"} */
        this.type = obj.type;

        /** @type {string} */
        this.name = obj.name;

        /** @type {string} */
        this.display_name = obj.display_name;

        /** @type {string} */
        this.email = obj.email || "";

        /** @type {Date} */
        this.created_at = new Date(obj.created_at);

        /** @type {Date} */
        this.updated_at = new Date(obj.updated_at);

        /** @type {string} */
        this.logo = obj.logo || "";

        /** @type {boolean} */
        this.partnered = obj.partnered || null;

        /** @type {string} */
        this.bio = obj.bio || "";

        /** @type {{email: boolean, push: boolean}} */
        this.notifications = obj.notifications || {email: null, push: null};
    }
}

class Follower {
    constructor(obj) {
        /** @type {Date} */
        this.created_at = new Date(obj.created_at);

        /** @type {boolean} */
        this.notifications = obj.notifications;

        /** @type {User} */
        this.user = (obj.user instanceof User) ? obj.user : new User(obj.user);
    }
}

class Stream {
    constructor(obj) {
        /** @type {string} */
        this.game = obj.game;

        /** @type {number} */
        this.viewers = obj.viewers;

        /** @type {number} */
        this.average_fps = obj.average_fps;

        /** @type {number} */
        this.video_height = obj.video_height;

        /** @type {Date} */
        this.created_at = new Date(obj.created_at);

        /** @type {Set} */
        this.visitors = new Set();
    }
}
