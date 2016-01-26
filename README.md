# CraftShow Mincraft Server - Horizon

Для работы сервера необходим [Docker](https://docs.docker.com/). Установка сервера в Linux:

```
wget -qO- https://get.docker.com/ | sh
```

В Mac OS и Windows можно использовать GUI для Docker - [Kitematic](https://docs.docker.com/kitematic/). Однако при этом сам Docker будет работать через виртуальную машину.

## Создание контейнера

Это может пригодится, если надо запустить точную копию локально. На сервере уже создан контейнер под именем `craftshow_horizon`

```
docker run -d --restart=always -p 25565:25565 -v /var/horizon/world:/var/app/horizon/world --name craftshow_horizon ilyapirogov/csmc-horizon
```

Где `/var/app/horizon/world` путь к данным мира Minecraft

## Перезапуск сервера

```
docer restart craftshow_horizon
```

## Копирование файлов из/в контейнер
```
docker cp ~/local_file.jar craftshow_horizon:/var/app/horizon/mods/
docker cp craftshow_horizon:/var/app/horizon/config/some_config.cfg ./
```

## Выполнение комманд на сервере
```
# интерактивная консоль
docker exec -it craftshow_horizon rcon -t

# одна комманда
docker exec -it craftshow_horizon rcon "say hello!"

# bash консоль
docker exec -it craftshow_horizon bash
```

## Просмотр логов
```
# Скопировать весь лог в файл
docker logs craftshow_horizon > ~/horizon.log

# Лог от 2015-01-26. Стоит учитывать, что это UTC таймзона
docker logs --since=2015-01-26 craftshow_horizon

# Последние 1000 строк лога
docker logs --tail=1000 craftshow_horizon

# Следить за новыми записями лога
docker logs -f --tail=100 craftshow_horizon
```
