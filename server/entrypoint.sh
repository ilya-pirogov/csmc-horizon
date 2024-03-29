#!/usr/bin/env bash

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

if [[ ! -z $JMX_HOSTNAME ]]; then
    JMX_ARGS="-Djava.rmi.server.hostname='$JMX_HOSTNAME' -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=3333 -Dcom.sun.management.jmxremote.rmi.port=3334 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.local.only=false"
fi

if [[ ! -z $RCON_PASSWORD ]]; then
    echo '#!/bin/bash' > /usr/local/bin/rcon
    echo "mcrcon -H 127.0.0.1 -p $RCON_PASSWORD \"\$@\"" >> /usr/local/bin/rcon
    echo "exit 0" >> /usr/local/bin/rcon
    chmod +x /usr/local/bin/rcon
fi

for json in banned-ips banned-players ops whitelist; do
  if [[ ! -f settings/$json.json ]]; then
    cp original/$json.json settings/$json.json
  fi
done

for folder in ForgeEssentials armourersWorkshop; do
  mkdir -p settings/$folder
  cp -r original/$folder/* settings/$folder/
done

sed -ir "s/rcon\.password=.*/rcon.password=$RCON_PASSWORD/g" server.properties
sed -ir "s/S:channel=.*/S:channel=$TWITCH_CHANNEL/g" config/ForgeTwitchSubWhitelist.cfg
sed -ir "s/S:twitchToken=.*/S:twitchToken=$TWITCH_TOKEN/g" config/ForgeTwitchSubWhitelist.cfg

java $JMX_ARGS $JVM_ADDITIONAL -Xms$JVM_XMS -Xmx$JVM_XMX -jar $FORGE_UNIVERSAL nogui
