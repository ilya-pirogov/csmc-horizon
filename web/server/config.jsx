import {TwitchApi} from './twitch-api.jsx';


ServiceConfiguration.configurations.upsert(
    { service: "twitch" },
    {
        $set: {
            clientId: Meteor.settings.public.TWITCH_CLIENT_ID,
            loginStyle: "popup",
            secret: Meteor.settings.TWITCH_CLIENT_SECRET
        }
    }
);

Accounts.onCreateUser(function(options, user) {
    if (!user.services.twitch || !user.services.twitch.accessToken) {
        throw new Meteor.Error('User should be logged by Twitch');
    }

    const api = new TwitchApi(user);
    const twitch = api.getSelfInfo();

    const profile = options.profile || {};
    profile.twitch = twitch;

    user.profile = profile;
    user.username = twitch.name;

    return user;
});


