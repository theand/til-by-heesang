[TOC]

# 맥 사용 환경 백업과 복구를 자동화하기

어떤 운영체제를 쓰건 각종 설정을 많이 해놓고 쓰는 사용자일수록 장비를 바꾸거나 시스템을 포맷해서 새로 세팅을 하는건 신경써야할 일이 많은 과업이다. 맥 사용자로서 백업과 복구를 최대한 자동화할 수 있는 방법을 찾아보며 정리하기로 한다.


## 히스토리

2014년 즈음에 다니던 회사에서 팀 전체의 개발장비가 윈도우에서 맥북으로 바뀌게 된 일이 있어서, 개발환경 가이드도 할 겸 [Boxen](https://github.com/boxen)을 [포크해서](https://github.com/theand-boxen) 한땀한땀 `Puppetfile` 을 만들어서 팀 내에서 공유하고 이후로는 내 장비가 바뀔때마다 사용하기도 했는데, mac os 및 기타 패키지가 업데이트될때마다 유지보수하는 것도 일이었다. 그래서 기존 `puppet-*` 저장소를 사용하던 스크립트도 대부분 `Homebrew`로 옮기기 시작했고, 1~2년전쯤부터 OS, 패키지의 변경사항을 반영하기가 몹시 피곤해져 손을 놓고 있었다.

맥북 새 장비를 지급받았는데, 각종 프로그램 및 환경을 옮겨 새로 세팅할 여유가 없어 기존 장비 반납 기한을 미루고 미루다가 진행해보려고 알아보니, `Boxen`도 메인테이너가 유지 종료(?)를 [선언했다는 걸](https://github.com/boxen/boxen/issues/224) 알게 되어, 대체할 도구를 찾아보며 정리해보려고 한다.


## 개인적인 조건

내가 쓰는 패턴에 맞는 조건은 아래와 같다.

- 타임머신 사용 안함.
- `Dropbox` 사용 괜찮음.
- provisioning tool 비선호. bash 스크립트 선호.
- 프로그램 설치는 가능한한 `Homebrew` + Cask / MAS 로 한다.
- 터미널 툴의 dotfiles 와 GUI 툴의 Preferences를 모두 옮길 필요 있음.
- macOS Preferences 설정 스크립트도 필요하다.
- 주요 개발환경인 쉘, 에디터, 터미널 환경 관리를 최신화할 필요가 있다 : bash + custom dotfiles based on [mathias](https://github.com/mathiasbynens/dotfiles), neovim/vimr + spf13vim , iterm 2 정도를 핵심 설정으로 하여 쓰고 있는데, 4,5년전에 세팅한 구닥다리 설정이라는 점이 늘 신경 쓰였다.

# 후보

## Brewfile

https://github.com/Homebrew/homebrew-bundle

현재 사용중인 패키지 목록을 파일 하나로 떨구고, 이를 새 시스템에서 그대로 설치하기에 적합하다.

현 시스템에서 아래 명령어로 `Brewfile` 을 생성하고

```
brew bundle dump
```

새 시스템에서 `Homebrew` 설치된 상태에서 아래 명령어로 해당 파일에 명시된 프로그램 목록을 모두 설치한다. brew, cask, mas 이렇게 3가지 타입 모두 가능한 것 같다.

```
brew bundle
```

참고

- https://github.com/Homebrew/homebrew-bundle
- https://thoughtbot.com/blog/brewfile-a-gemfile-but-for-homebrew

## mackup

https://github.com/lra/mackup

주요 설정 파일들을 드롭박스로 옮기고 원래 경로에서 심볼릭 링크를 걸어주는 방식이다.

첫 인상은 좋지만, 오래 써보니 사용하는 프로그램에 대한 경로가 바뀌거나 할때 바로바로 업데이트되지 않으면 설정이 꼬일 위험이 있다. 특히 Jetbrains 같이 버전업이 일년에 몇번씩 이루어지고 설정 경로가 그때마다 바뀌는 프로그램은 제때 대응이 되지 않는 단점이 있다. 이에 대한 커스터마이징은 가능하긴 하지만 이를 위해 신경쓸 포인트가 늘어나는 것이 문제다.


## Strap

`Homebrew`의 리드 메인테이너인 Mike McQuaid가 puppet 이 아닌 homebrew 에코시스템을 이용해 Boxen을 대체하기 위해 만든 툴.

- https://mikemcquaid.com/2016/06/15/replacing-boxen/
  - https://macos-strap.herokuapp.com/
  - https://github.com/MikeMcQuaid/strap/

이걸 수행하면 mac OS에 아래의 일련의 homebrew 툴이 설치되고 mac OS의 일부 보안관련 설정이 지정된다.

- http://brew.sh/
  - https://github.com/Homebrew/homebrew-versions
  - https://github.com/Homebrew/homebrew-bundle
  - https://github.com/Homebrew/homebrew-services
  - https://github.com/caskroom/homebrew-cask

brew 를 설치하려는 용도로는 괜찮은데, mac OS 설정은 너무 부족한 느낌이다.

## laptop

https://github.com/thoughtbot/laptop

사실 mac os 개발환경 셋업 스크립트로 내가 제일 처음 접했던 것은 thoughtbot 사에서 사용하는 이 스크립트였다.

[스크립트](https://github.com/thoughtbot/laptop/blob/master/mac) 를 살펴보니, 빠르게 셋업하기엔 좋지만 내 요구사항엔 맞지 않는 것 같다. 기본적으로 brew 설정 + thoughtbot 사의 개발환경에 맞춘 패키지들이 기본세팅 되는데, brew 설정은 `strap`을 쓰고 내가 쓰는 `Brewfile`로 나머지 셋업을 하는게 나을듯해 보인다.


## mac-setup-script

https://github.com/pathikrit/mac-setup-script

brew 패키지는 `Brewfile`을 쓸 것이기 때문에 `install.sh` 에서는 pip3 관련 커맨드만 필요해보인다. `defaults.sh` 의 내용은 나도 fork 해서 사용하고 있는 mathias의 dotfiles 에서 가져온 내용이라 중복일 듯 하다.


## dev-setup

https://github.com/donnemartin/dev-setup

star 수도 엄청 많고, README 구성도 빡세게 되어 있다. 근데 너무 길어서 훑어보기도 질릴 정도의 느낌;; 각 섹션별 내용은 너무 방대해서 하나하나 들춰볼 엄두가 안나고 mac os 셋업 관련 내용만 참고해야할 것 같다. 근데 여기는 mac os 셋업 내용뿐만 아니라 전체 구성이 mathias의 dotfiles 저장소를 fork 한 다음 각종 개발환경 셋업에 치중해서 발전시킨 것으로 보인다.

## macOS-home-call-drop

https://github.com/karek314/macOS-home-call-drop

mac OS 설정 중에 애플 서버로 호출이 발생하는 부분을 대부분 블락하는 스크립트로 보인다.

## mac_os

https://github.com/bkuhlmann/mac_os

https://github.com/bkuhlmann/mac_os-config


## formation

https://github.com/minamarkham/formation


## macOS-Security-and-Privacy-Guide

https://github.com/drduh/macOS-Security-and-Privacy-Guide

설치 스크립트는 아니고 보안 설정 가이드.

## hypergenesis

https://github.com/mattmcmanus/hypergenesis

# 경과

위 후보군들을 살펴보았을때,

- Homebrew(with cask)는 기본적으로 사용하는데, `Brewfile` 을 사용하는 경우는 없었고, 보통은 쉘 스크립트에서 배열로 선언해서 설치하고, 가끔 `Brewfile` 포맷의 멀티라인 문자열을 `brew bundle` 으로 넘겨서 설치하는 경우는 있었다.
- 맥앱스토어 프로그램은 대체로 `mas` 로 설치
- mac OS 설정은 거의 대부분이 mathias 의 dotfiles 의 설정파일을 기반으로 하여 각 작성자 취향에 맞게 값을 고치거나 한 정도였다.
- dotfile 관리하는 건 개별 저장소를 별도로 유지하거나 rcm 등을 사용하거나 하는데 각각이 너무 달라서 참고하
- python/node/ruby 등의 환경은 version manager 를 설치하기도 하는데, 너무 경우의 수가 많다.


내 요구사항에 맞게 아래와 같이 진행하고 있다.

- script/bootstrap
- mac OS  업데이트, xcode 설치
- mac OS 각종 설정은 mathiasdotfiles 의 .macos 에 여기저기서 모은 설정을 모두 통합.
- strap 으로 homebrew 들 설치하고..
- `Brewfile` 으로 필요한 프로그램들 설치.
- bash 는 그대로 가고, bash-it 을 써보기로 함
- vim 은 neovim + vimr 을 설치하기로 함. 아마 spacevim 까지.
- 그다음에는 dropbox 동기화 때문에 수동으로 진행 필요하다.
