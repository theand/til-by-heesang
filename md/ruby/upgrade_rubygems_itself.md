[TOC]


# rubygems 업그레이드하기

## 1차
`gem info` 사용하려니, 옛날에 설치해놓은 2.6.13 버전에서는 지원되지 않는 명령어였다.

찾아보니 아래와 같은 명령어로 업그레이드를 할 수 있었고, 3.0.0 으로 업그레이드가 되어 `gem info` 를 사용할 수 있었다.

```
gem install rubygems-update
update_rubygems
gem update --system
```


source:

- https://stackoverflow.com/questions/13626143/how-to-upgrade-rubygems

## 2차
뭔지 모르고 일단 복붙해서 실행하고 하려던 것은 해결했는데, 명령어 하나하나가 무슨 뜻인지 찾아봤다.

찾아보니, 아래 두 줄의 커맨드는 지금 환경에서는 불필요한 것이었다.

```
gem install rubygems-update
update_rubygems
```

`gem update --system` 커맨드가 문제가 있었던 아주 옛날 버전에서나 수동 업그레이드를 하기 위해 위 두줄의 커맨드가 필요했고, 지금은 `gem update --system` 으로 해결됨.

source :

- https://guides.rubygems.org/command-reference/#gem-update
- https://rubygems.org/gems/rubygems-update
- https://github.com/rubygems/rubygems/blob/master/bin/update_rubygems
- https://stackoverflow.com/questions/37149483/difference-between-update-rubygems-and-gem-update-system
- https://github.com/rubygems/rubygems/blob/master/UPGRADING.md
