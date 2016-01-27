import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
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
import {updateTopFrameHeight} from './index.jsx';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null
        }
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({user: Meteor.user()});
        });

        updateTopFrameHeight();
    }

    componentWillUnmount() {
        this.tracker.stop();
    }

    componentDidUpdate() {
        updateTopFrameHeight();

        if (this.state.user) {
            Meteor.call('updateSubStatus');
        }
    }

    renderLogin() {
        return <Paper style={{padding: 10}}>
            <FlatButton label="Подключиться к учетной записи Twitch"
                        onClick={this.handleLogin.bind(this)} />
            {this.state.error}
        </Paper>;
    }

    renderApp() {
        const mineAvatar = 'https://avatar.yourminecraftservers.com/avatar/trnsp/not_found/tall/64/' + this.state.user.profile.mcUsername + '.png';

        return <Card initiallyExpanded={!this.state.user.profile.mcUsername}
                     onExpandChange={e => Meteor.setTimeout(updateTopFrameHeight, 0)}
                     ref="card">
            <CardHeader title={this.state.user.username}
                        subtitle={this.state.user.profile.mcUsername}
                        avatar={this.state.user.profile.twitch.logo}
                        actAsExpander={true}
                        showExpandableButton={true}>
                <img src={mineAvatar} style={{position: 'absolute', top: 5}} />
            </CardHeader>
            <CardText expandable={true}>
                Ваше имя в Minecraft:
                <TextField style={{paddingLeft: 10}}
                           value={this.state.mcUsername}
                           onChange={e => this.setState({mcUsername: e.target.value})} />
            </CardText>
            <CardActions expandable={true}>
                <FlatButton label="Применить" onClick={this.handleApply.bind(this)} />
                <FlatButton label="Отмена" onClick={e => Meteor.logout()} />
            </CardActions>
        </Card>;
    }

    renderNotSub() {
        return <Card initiallyExpanded={!this.state.user.profile.mcUsername}
                     onExpandChange={e => Meteor.setTimeout(updateTopFrameHeight, 0)}
                     ref="card">
            <CardHeader title={this.state.user.username}
                        subtitle={this.state.user.profile.mcUsername}
                        avatar={this.state.user.profile.twitch.logo}
                        actAsExpander={true}
                        showExpandableButton={true} />
            <CardText expandable={true}>
                Вы не являетесь платным подписчиком на канале <a href="http://www.twitch.tv/mjramon">MJRamon</a>
            </CardText>
            <CardActions expandable={true}>
                <FlatButton label="Отмена" onClick={e => Meteor.logout()} />
            </CardActions>
        </Card>;
    }

    render() {
        if (!this.state.user) {
            return this.renderLogin();
        }

        if (!this.state.user.profile.sub) {
            return this.renderNotSub();
        }

        return this.renderApp();
    }

    handleLogin() {
        this.setState({error: null});
        Meteor.loginWithTwitch({requestPermissions: ["user_read"]}, (error, result) => {
            if (error) {
                this.setState({error: 'Не удалось авторизоваться в Twitch'});
            }
        })
    }

    handleApply() {
        Meteor.call('setUsername', this.state.mcUsername, (error, result) => {
            if (!error) {
                this.refs.card.setState({expanded: false});
            }
        });
    }
}