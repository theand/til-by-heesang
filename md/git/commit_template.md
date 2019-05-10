[TOC]

# atom 에서 git 커밋이 안된다?

atom 에서 til 문서를 편집하고 커밋하는데, [github](https://github.com/atom/github) 패키지를 사용하고 있었다. 어느날부터 커밋이 안되기 시작했고, 별다른 에러 로그를 확인할 방법도 찾지 못했다. 패키지의 문제인가 싶어서 저 패키지를 disable 시키고 [git-plus](https://atom.io/packages/git-plus)와 [git-plus-toolbar](https://atom.io/packages/git-plus-toolbar)을 설치해서 해봤더니 `your configured commit template file can't be found` 라는 알림 메시지가 떴다. 무슨 얘긴가 하고 찾아보니 커밋 메시지 템플릿이 global 에 설정되어 있는데, 그 파일을 찾을 수가 없어서 그랬던것 같다.

참고: https://stackoverflow.com/questions/40817647/what-is-stcommitmsg-in-git-global-configuration-file

왜 갑자기 이런 일이 발생했는지 찾아보니, `~/.gitconfig` 글로벌 설정에 아래와 같은 설정이 있었다.

```
[commit]
  template = ~/.stCommitMsg
```

아마도 소스트리에서 위와 같은 설정을 추가해놓은 것 같은데, 최근에 홈 디렉토리 불필요한 파일을 정리하면서 지금은 안 쓰는 것 같은 파일들을 삭제했고 그 삭제 결과가 소스트리나 다른 git 유틸리티(git cli, visual studio code의 git 패키지, 인텔리제이 등)에서는 지정된 커밋 템플릿 파일을 찾지 못해도 예외처리가 되어있었던 것인지 그냥 진행이 가능했는데, atom 에서 지원하는 패키지에서만 이와 같은 사항일때 커밋조차 못하도록 막히는 것이었다.

글로벌 설정에서 해당 부분을 삭제한 후에 정상 작동 확인함.
