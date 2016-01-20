#!/usr/bin/env bash

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

if [[ ! -z $JMX_HOSTNAME ]]; then
    JMX_ARGS="-Djava.rmi.server.hostname='$JMX_HOSTNAME' -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=$JMX_PORT -Dcom.sun.management.jmxremote.rmi.port=$JMX_PORT -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.local.only=false"
fi

sed -ir "s/rcon\.password=.*/rcon.password=$RCON_PASSWORD/g" server.properties
sed -ir "s/S:channel=.*/S:channel=$TWITCH_CHANNEL/g" config/ForgeTwitchSubWhitelist.cfg
sed -ir "s/S:twitchToken=.*/S:twitchToken=$TWITCH_TOKEN/g" config/ForgeTwitchSubWhitelist.cfg

java -jar $JMX_ARGS $JVM_ADDITIONAL -Xms$JVM_XMS -Xmx$JVM_XMX $FORGE_UNIVERSAL nogui
