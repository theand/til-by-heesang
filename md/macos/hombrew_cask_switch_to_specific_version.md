[TOC]


# brew cask로 설치한 프로그램의 구 버전을 다시 설치하기

## 상황

GUI 프로그램들도 왠만하면 brew cask로 설치하고 업그레이드를 관리하는데, 이번에 SourceTree 를 `brew cask upgrade` 로 업그레이드했더니 macos 버전이 10.13 이상이 아니라고 실행이 안되는 사태가 생김. 10.12 에서 잘 돌아가던 이전 버전으로 어떻게 돌아가야하나.

특이사항

- 이전 버전이 그냥 남아있었으면 심볼릭링크를 직접 건드려서 어떻게 처리할 수 있었을텐데, 습관적으로 `brew upgrade`, `brew cask upgrade` 를 한 다음에는 `brew cleanup` 으로 불필요 파일을 제거하는 습관이 있어서 기존 버전은 이미 정리된 상태라 기존 버전으로 재설치할 방법이 필요했음.
- 그냥 홈페이지에서 이전 버전 다운로드 받으면 가장 짧은 시간내에 해결가능하지만, 가능하면 brew cask로 계속 관리하고 싶었기 때문에 cask 안에서 해결해보기로 함.
- [sourcetree 블로그](https://blog.sourcetreeapp.com/) 에는 macos 지원 버전에 대한 특별한 언급이 없음.


## 경과

-  brew로 설치한 터미널 유틸리티는 `brew switch formula version` 으로 이전 버전을 활성화할 수 있는데( [참고](https://docs.brew.sh/Tips-N'-Tricks)) ),  cask 에서는 지원되지 않는 커맨드로 보임.

- 기본적인 흐름은 [Use Homebrew Cask to downgrade or install specific version of package](https://devforgalaxy.github.io/en/2016/11/05/use-homebrew-cask-to-downgrad-or-install-en.html)를 따라 Cask file 을 직접 수정하면 됨.

- Cask file 수정하기 : `brew cask edit sourcetree`
- 내용은 대략 [이런 모양](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/sourcetree.rb)이고 `version`, `sha256` 을 기존 정보로 대치하면 됨.
- [github 에서 커밋 히스토리](https://github.com/Homebrew/homebrew-cask/commits/master/Casks/sourcetree.rb)를 보려고 했으나 커밋히스토리가 너무 길어서 로딩 실패.
- 콘솔에서 직접 찾아야함.
  ```
  cd /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask
  git log master -- Casks/sourcetree.rb
  ```
- 이전 버전의 커밋 아이디를 확인함. `0de7223a346dac65c804c2c43357cf6ca1d1ccd6`
- 터미널에서 커맨드로 커밋 정보 보는게 생각나지 않아서 [깃헙에서 커밋 아이디로 들어감](https://github.com/Homebrew/homebrew-cask/commit/0de7223a346dac65c804c2c43357cf6ca1d1ccd6)
- `2.7.6a` 의 정보를 확인하여 아까 열어둔 cask file 에 입력.
- `brew cask intall sourcetree` 실패  : `version`, `sha256` 키의 값만 바꾸었는데, 2.x와 3.x 사이에 [url 패턴이 바뀌어서](https://github.com/Homebrew/homebrew-cask/commit/76362053c76649cd5b9271e35347c0732e651a24) 파일을 다운로드 받지 못한 것으로 `url` 키의 값도 2.x에 맞게 바꿔줌.
- `brew cask uninstall --force sourcetree; brew cask install sourcetree` : 이전 버전 찌꺼기들도 제거하고 재설치하도록 했고 완료.

## 요약

- `brew cask edit formula` 으로 Cask file 편집 모드로 들어가서 `version`, `sha256`, `url` 정보를 기존 내용으로 바꿔주고 `brew cask install formula` 하면 됨.
- 기존 정보를 확인하려면 웹에서는 잘 안되므로 터미널에서 git log를 봐야함.
