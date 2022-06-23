# Compose

---

https://cr.console.aliyun.com/cn-shanghai/instances/mirrors

## mysql

```bash
docker build ./mysql -t=fast-mysql --platform linux/amd64
```

```bash
docker run --name fast-mysql -p 3306:3306 fast-mysql
```

## redis

```bash
docker build ./redis -t=fast-redis --platform linux/amd64
```

```bash
docker run --name fast-redis -p 6379:6379 fast-redis
```

## Compose

```bash
docker-compose -p fast-compose -f docker-compose.yml up -d
```