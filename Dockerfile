FROM java:openjdk-8-jre
MAINTAINER Ilya Pirogov <ilja.pirogov@gmail.com>

WORKDIR /var/app/horizon

ADD ./setup-env.sh /

ENV MINECRAFT_VERSION 1.7.10
ENV FORGE_VERSION 10.13.4.1558
# see sha1 on http://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.7.10.html
ENV FORGE_INSTALLER_SHA1 afcf4b3392b6d632acb728b78b1a6321ee59ac61
ENV PROPERTY_LEVEL_TYPE BIOMESOP

RUN /setup-env.sh

ENV JVM_XMS 8g
ENV JVM_XMX 16g
ENV JVM_ADDITIONAL -XX:+UseStringCache -XX:+OptimizeStringConcat -XX:+UseCompressedStrings -XX:+AggressiveOpts -XX:+UseParNewGC -XX:+UseConcMarkSweepGC
ENV RCON_PASSWORD nopass

ADD ./entrypoint.sh /

VOLUME /var/app/horizon/world

EXPOSE 25565
EXPOSE 25575

ADD ./horizon/*.json /var/app/horizon/
ADD ./horizon/config /var/app/horizon/config
ADD ./horizon/mods /var/app/horizon/mods

ENTRYPOINT /entrypoint.sh
