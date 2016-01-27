import {TwitchApi} from './twitch-api.jsx';
import {channels} from '../lib/collections.jsx';


Meteor.methods({
    updateSubStatus() {
        if (this.isSimulation) {
            return false;
        }

        const activeUser = Meteor.users.findOne(this.userId);
        if (!activeUser) {
            throw new Meteor.Error(403);
        }

        let channel = channels.findOne();
        if (!channel) {
            throw new Meteor.Error(400);
        }

        const api = new TwitchApi(channel.user);
        Meteor.users.update(this.userId, {$set: {'profile.sub': !!api.hasSubscription(activeUser.username)}});
    },

    setUsername(username) {
        const activeUser = Meteor.users.findOne(this.userId);
        if (!activeUser) {
            throw new Meteor.Error(403);
        }

        Meteor.users.update(this.userId, {$set: {'profile.mcUsername': username}});
    },

    setup() {
        const activeUser = Meteor.users.findOne(this.userId);
        if (!activeUser) {
            throw new Meteor.Error(403);
        }

        let channel = channels.findOne();
        if (channel) {
            throw new Meteor.Error(400);
        }

        channels.insert({user: activeUser});
    }
});