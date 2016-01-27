import {channels} from './../lib/collections.jsx';


Meteor.publish('channel', function() {
    return channels.find({}, {fields: {'user.username': 1}});
});