import {whitelist, channels} from '../lib/collections.jsx';
import Rcon from 'simple-rcon';


let rcon = null;


function exec(cmd, callback) {
    if (!rcon) {
        rcon = new Rcon({
            host: Meteor.settings.RCON_IP || '127.0.0.1',
            port: Meteor.settings.RCON_PORT || '25575',
            password: Meteor.settings.RCON_PASSWORD || 'nopass'
        });

        rcon.on('disconnected', () => {
            rcon = null;
        }).connect();
    }

    rcon.exec(cmd, res => {
        if (callback) {
            callback(null, res.body);
        }
    });
}

const execSync = Meteor.wrapAsync(exec);


Meteor.startup(function() {
    whitelist.find({}).observe({
        added(user) {
            exec('whitelist add ' + user.username);
        },

        removed(user) {
            exec('whitelist remove ' + user.username);
        }
    });

    Meteor.users.find({}, {fields: {'profile.sub': 1, 'profile.mcUsername': 1}}).observe({
        changed(newUser, oldUser) {
            if (newUser.profile.mcUsername !== oldUser.profile.mcUsername) {
                if (oldUser.profile.mcUsername) {
                    whitelist.remove({username: oldUser.profile.mcUsername, manual: false});
                }

                if (newUser.profile.mcUsername && newUser.profile.sub) {
                    whitelist.insert({username: newUser.profile.mcUsername, manual: false});
                }
            }

            if (newUser.profile.sub !== oldUser.profile.sub) {
                if (!newUser.profile.sub && oldUser.profile.mcUsername) {
                    whitelist.remove({username: oldUser.profile.mcUsername, manual: false});
                }
            }
        }
    });
});