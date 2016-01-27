import React from 'react';
import Paper from 'material-ui/lib/paper';
import RisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ActionExitToApp from 'material-ui/lib/svg-icons/action/exit-to-app';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import {channels} from '../lib/collections.jsx';
import {updateTopFrameHeight} from './index.jsx';


export default class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({channel: channels.findOne()});
        });

        this.subscribtion = Meteor.subscribe('channel');

        updateTopFrameHeight();
    }

    componentWillUnmount() {
        this.tracker.stop();
        this.subscribtion.stop();
    }

    render() {
        if (this.state.channel) {
            return <div>Channel: {this.state.channel.user.username}</div>;
        }

        return <div>
            <RisedButton label="Подключить канал Twitch"
                        onClick={this.handleSetup.bind(this)} />
            {this.state.error}
        </div>;
    }

    handleSetup() {
        this.setState({error: null});
        Meteor.loginWithTwitch({requestPermissions: ["user_read", "channel_check_subscription"]}, (error, result) => {
            console.log(error, result);
            if (error) {
                this.setState({error: 'Не удалось авторизоваться в Twitch'});
            } else {
                Meteor.call('setup');
            }
        })
    }
}