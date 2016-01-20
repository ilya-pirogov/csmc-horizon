# CraftShow Mincraft Server - Horizon

Для запуска сервера необходим [Docker](https://docs.docker.com/). После его установки достаточно запустить:

```
docker run -d --restart=always -v /var/horizon/world:/var/app/horizon/world ilyapirogov/csmc-horizon
```

Где `/var/app/horizon/world` путь к данным мира Minecraft
