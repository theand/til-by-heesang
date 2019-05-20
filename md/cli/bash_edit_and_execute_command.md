[TOC]

# 배쉬 쉘에서 긴 명령어를 수정하기

옵션이 많이 들어있어서 길거나 여려줄에 걸쳐있는 커맨드들(특히 `curl`이나 `docker` 등)을 복붙하거나 히스토리에서 찾아서 그 문자열 중 일부 내용을 고쳐 수정하려면 할때마다 영 괴로운 부분이 있다.

찾아보니 `edit-and-execute-command (C-x C-e)` 라는 기능이 있었다. `ctrl+x ctrl+e` 를 연달아 입력하면, 환경변수 `$VISUAL, $EDITOR` 등에 설정된 에디터 설정값을 따라 현재 커맨드라인 문자열을 해당 에디터로 연 다음 저장하고 종료하면 수정한 내용이 현재 커맨드라인으로 입력되어 바로 실행 되는 기능이다. 에디터 환경 변수가 그때그때 다를 수 있을 것 같으니 아래와 같은 코드를 `.bash_profile` 같은 위치에 넣어두면 `vim` 이 실행되도록 할 수 있다.

```
# Make vim the default editor.
export EDITOR='vim';
````


참고

- https://www.gnu.org/software/bash/manual/html_node/Miscellaneous-Commands.html
- https://www.44bits.io/ko/post/editing-multiline-command-on-shell
- http://www.ohyecloudy.com/ddiary/2019/05/17/til-bash-edit-and-execute-command/
