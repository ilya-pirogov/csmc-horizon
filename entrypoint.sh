#!/usr/bin/env bash

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

sed -ir "s/rcon\.password=.*/rcon.password=$RCON_PASSWORD/g" server.properties

java -jar $FORGE_UNIVERSAL -Xms=$JVM_XMS -Xmx=$JVM_XMX $JVM_ADDITIONAL nogui
