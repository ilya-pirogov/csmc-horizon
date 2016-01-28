#!/usr/bin/env bash

set -e -o xtrace

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_INSTALLER=forge-$VERSION-installer.jar
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

echo eula=true > eula.txt

if [[ ! -f ./$FORGE_UNIVERSAL ]]; then
    mkdir settings
    ln -s banned-ips.json settings/banned-ips.json
    ln -s banned-players.json settings/banned-players.json
    ln -s ops.json settings/ops.json
    ln -s whitelist.json settings/whitelist.json

    wget http://files.minecraftforge.net/maven/net/minecraftforge/forge/$VERSION/$FORGE_INSTALLER
    echo $FORGE_INSTALLER_SHA1 $FORGE_INSTALLER | sha1sum -c
    java -jar $FORGE_INSTALLER --installServer
fi
