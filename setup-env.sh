#!/usr/bin/env bash

set -e -o xtrace

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_INSTALLER=forge-$VERSION-installer.jar
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

echo eula=true > eula.txt

if [[ ! -f ./server.properties ]]; then
    echo level-type=$PROPERTY_LEVEL_TYPE > server.properties
fi

if [[ ! -f ./minecraft_server.$MINECRAFT_VERSION.jar ]]; then
    wget http://files.minecraftforge.net/maven/net/minecraftforge/forge/$VERSION/$FORGE_INSTALLER
    echo $FORGE_INSTALLER_SHA1 $FORGE_INSTALLER | sha1sum -c
    java -jar $FORGE_INSTALLER --installServer
fi
