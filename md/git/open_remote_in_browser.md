[TOC]

# 깃 저장소의 remote origin 을 웹브라우저로 열기

요구사항:

- github.com, Github Enterprise, bitbucket 을 모두 지원해야함.
- 콘솔에서 간단히 열 수 있어야함.

## git-open

https://github.com/paulirish/git-open


설치

```
npm install -g git-open
```

사용

```
git open
```

비고: 내가 원래 쓰던 모듈이었는데, 초기 버전에서는 enterprise를 지원안해서 fork 해서 고쳐서 혼자 쓰다가 시스테 몇번 업그레이드 하는 동안 신경을 안 썼더니 안 돌아가기 시작해서 내버려뒀다가 오랜만에 해당 기능이 필요해서 들어가보니 내가 필요한 사항이 다 구현되어 있었다. 문서를 보니 `hub` 에도 유사한 기능이 있다고 해서 테스트해보니 거의 동일하게 작동했다.

## hub

- https://github.com/github/hub
- https://hub.github.com/

설치

```
brew install hub
```

사용

```
hub open
```

비고 : 이외에도 깃헙에 대한 다양한 기능들이 제공되는데... 이미 alias로 많이 해놔서 새로 익힐 필요는 느끼지 못했다.
