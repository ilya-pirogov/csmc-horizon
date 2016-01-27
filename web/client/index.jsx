import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application.jsx';
import Setup from './Setup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();


const CONTAINER_ID = 'csmc-twitch-embedded';
let topFrame = null;


Accounts.ui.config({
    requestPermissions: {twitch: ["user_read"]}
});


export function updateTopFrameHeight() {
    const height = document.getElementById(CONTAINER_ID).clientHeight + 15;
    if (!topFrame) {
        return;
    }
    topFrame.postMessage({height}, '*');
}


Meteor.startup(function() {
    window.addEventListener('message', event => {
        if (event.data && event.data.type === 'init') {
            topFrame = event.source;
            updateTopFrameHeight();
        }
    }, false);

    const container = document.getElementById(CONTAINER_ID);
    if (container) {
        const el = document.createElement('div');
        el.id = CONTAINER_ID;
        container.parentNode.replaceChild(el, container);

        if (window.location.pathname === '/setup') {
            ReactDOM.render(<Setup />, el);
        } else {
            ReactDOM.render(<Application />, el);
        }
    }
});