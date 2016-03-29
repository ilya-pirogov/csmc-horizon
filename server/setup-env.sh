#!/usr/bin/env bash

set -e -o xtrace

VERSION=$MINECRAFT_VERSION-$FORGE_VERSION-$MINECRAFT_VERSION
FORGE_INSTALLER=forge-$VERSION-installer.jar
FORGE_UNIVERSAL=forge-$VERSION-universal.jar

echo eula=true > eula.txt

if [[ ! -f ./$FORGE_UNIVERSAL ]]; then
    mkdir settings
    ln -s settings/armourersWorkshop armourersWorkshop
    ln -s settings/ForgeEssentials ForgeEssentials
    ln -s settings/adverts adverts
    ln -s settings/banned-ips.json banned-ips.json
    ln -s settings/banned-players.json banned-players.json
    ln -s settings/ops.json ops.json
    ln -s settings/whitelist.json whitelist.json

    wget http://files.minecraftforge.net/maven/net/minecraftforge/forge/$VERSION/$FORGE_INSTALLER
    echo $FORGE_INSTALLER_SHA1 $FORGE_INSTALLER | sha1sum -c
    java -jar $FORGE_INSTALLER --installServer
fi
