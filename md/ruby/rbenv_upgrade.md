[TOC]


# rbenv 로 루비 버전 업그레이드 하기

## 발단

지금 쓰는 장비를 예전에 rbenv 로 루비를 `2.2.x`를 설치하고 가끔 생각날때마다 업데이트를 해서 현재 `2.4.x` 를 쓰고 있다. 얼마전에 나온 `2.6.0` 을 써보려는데, 그동안 신경 안쓴지 오래되서 하나도 생각이 안나서 커맨드를 찾아봄.

## 경과

- https://github.com/rbenv/rbenv
- https://github.com/rbenv/ruby-build

rbenv 문서를 대충 훑어봄. homebrew로 설치했으면 간단했을텐데, `rbenv` 자체를 `boxen` 으로 설치했던터라 기억을 다시 한참 돌이켜야 했다. `boxen`으로 설치한 방법은 깃헙 저장소를 직접 체크아웃 해서 설치한 방식과 같다고 볼 수 있다.

rbenv 는 `/opt/boxen/rbenv` 에 있었고, ruby-build는 `/opt/boxen/ruby-build` 에 있었다.

각각 저장소를 갱신해준다.
```
/opt/boxen/rbenv on master $ git pull
/opt/boxen/ruby-build on master $ git pull
```

이렇게 하면 최신 버전에 대한 설치 정보가 로컬에 업데이트 된다.

아래 명령어를 통해 설치가능한 버전을 볼 수 있고, 여기서 출력하는 목록 중에 `2.6.0` 이 나오면 된다.
```
rbenv install -l
```


아래 명령어로 그동안 `rbenv`를 통해 로컬에 설치한 루비 버전 목록을 볼 수 있고, 특별히 구 버전이 필요한게 아니면 예전 버전은 지울 수 있다.

```
$ rbenv versions
  system
  1.9.3-p551
  2.2.5
  2.3.4
* 2.4.2 (set by /opt/boxen/rbenv/version)

$ rbenv uninstall 1.9.3-p551
rbenv: remove /opt/boxen/rbenv/versions/1.9.3-p551? [yN] y

$ rbenv uninstall 2.2.5
rbenv: remove /opt/boxen/rbenv/versions/2.2.5? [yN] y

$ rbenv uninstall 2.3.4
rbenv: remove /opt/boxen/rbenv/versions/2.3.4? [yN] y
```

원하는 버전 설치는 아래 명령어로 가능하고, 설치 완료되는데는 시간이 좀 걸린다.

```
$ rbenv install 2.6.0
ruby-build: use openssl from homebrew
Downloading ruby-2.6.0.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.0.tar.bz2
Installing ruby-2.6.0...
ruby-build: use readline from homebrew
Installed ruby-2.6.0 to /opt/boxen/rbenv/versions/2.6.0
```

다시 `versions` 와 `version` 커맨드를 통해 확인해보면 `2.6.0`이 설치 완료되었으나 현재 설정된 버전은 `2.4.2`라고 나오니 `global` 커맨드를 통해 `2.6.0` 으로 바꾸도록 하자.

```
$ rbenv versions
  system
* 2.4.2 (set by /opt/boxen/rbenv/version)
  2.6.0

$ rbenv global
2.4.2

$ rbenv version
2.4.2 (set by /opt/boxen/rbenv/version)

$ rbenv global 2.6.0

$ rbenv version
2.6.0 (set by /opt/boxen/rbenv/version)
```

`2.4.x` 에 설치했던 gem 들을 `2.6.0` 에도 설치되게 하고 싶었으나, 적당한 명령어를 찾지 못했고(`rehash` 는 아니었다), 다시 생각해보니 프로젝트에서 실제 필요로 할때 `Bundler` 로 그때그때 수행하면 될테니 그리 신경 쓸 이슈는 아닌 것 같다.
