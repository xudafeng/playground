# sqlcipher-test

---

MacOS:

```bash
$ LDFLAGS="-L`brew --prefix`/opt/sqlcipher/lib" \
  CPPFLAGS="-I`brew --prefix`/opt/sqlcipher/include -I/usr/local/opt/sqlite/include" \
  npm i sqlite3 --build-from-source \
  --sqlite_libname=sqlcipher --sqlite=`brew --prefix`
```

Electron in MacOS:

```bash
$ LDFLAGS="-L`brew --prefix`/opt/sqlcipher/lib" \
  CPPFLAGS="-I`brew --prefix`/opt/sqlcipher/include -I/usr/local/opt/sqlite/include" \
  npm i sqlite3 --build-from-source \
  --target=7.1.10 \
  --arch=x64 \
  --dist-url=https://electronjs.org/headers \
  --module_name=node_sqlite3 \
  --module_path=$PWD/node_modules/sqlite3/lib/binding/electron-v7.1-darwin-x64 \
  --package_name=electron-v7.1-darwin-x64.tar.gz \
  --sqlite_libname=sqlcipher --sqlite=`brew --prefix`
```

```bash
$ ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/ npm i electron@7.1.10
$ LDFLAGS="-L`brew --prefix`/opt/sqlcipher/lib" \
  CPPFLAGS="-I`brew --prefix`/opt/sqlcipher/include -I/usr/local/opt/sqlite/include" ./node_modules/.bin/electron-rebuild -f -w sqlite3 -- --sqlite_libname=sqlcipher --sqlite=`brew --prefix`

$ ls -l ./node_modules/sqlite3/lib/binding/
```

Electron in Docker:

```bash
$ docker run --rm -ti \
  --env ELECTRON_CACHE="/root/.cache/electron" \
  --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
  --env ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/ \
  -v ${PWD}:/project \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:wine

$ DEBUG=electron-rebuild ./node_modules/.bin/electron-rebuild -f -w sqlite3

$ ls -l ./node_modules/sqlite3/lib/binding
```
