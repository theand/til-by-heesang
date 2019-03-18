
# brew cask upgrade 를 하려는데 undent 메소드가 없다는 에러가 뜨며 업그레이드가 안되는 경우 대응

`brew cask upgrade` 를 했는데 아래와 같은 메시지와 함께 업그레이드가 처리 안되는 경우가 있다.

```
Error: Cask 'p4merge' is unreadable: undefined method `undent' for #<String:0x00007fbb0ca53600>
```

정확히 알 수는 없지만, 추측컨대, brew 에서 `undent`라는 메소드를 멍키패치하여 heredoc에 사용해오다가, brew 버전이 업그레이드 되면서 `undent`를 제거하기로 결정했고, 그에 따라 예전에 작성된 레써피에 들어간 아래와 같은 구문에서 에러가 발생하는 것 같다.

```
  caveats <<-EOS.undent
    git can be configured to use p4merge as a merge tool via

      https://pempek.net/articles/2014/04/18/git-p4merge/
  EOS
```

저 소스에서 `.undent` 부분만 제거하면 되는데, 로컬에 저게 어느 위치에 있는지 찾는 것이 힘들었다.

처음에는 `brew cask edit p4merge` 라는 명령어를 사용해 시도해보았는데, 이때 로딩되는 레서피는 최신 버전의 레서피라서 대략 `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask/Casks/` 에 위치한 파일을 읽어오고, 최신 버전에는 대체로 위와 같은 `undent` 사용한 코드를 찾을 수가 없었다.

평소 사용하는 [ag](https://geoff.greer.fm/ag/)를 이용해 아무리 파일 시스템 적당한 곳을 검색해도 나오지 않았는데, 구글링을 해서 보니 숨김 디렉토리에 위치해 있다보니 `ag` 기본설정으로는 검색이 되지 않았다. 다음과 같은 경로를 뒤져보니 `/usr/local/Caskroom/p4merge/.metadata/` 의 하위 경로에서 `undent` 가 사용된 이전 버전의 레서피를 찾을 수 있었다. 찾아서 제거하니 원래 실행하려던 명령어도 제대로 실행되었다.


참고
- https://github.com/Homebrew/homebrew-cask/issues/49716
