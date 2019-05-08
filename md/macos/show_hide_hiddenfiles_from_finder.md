[TOC]

# Finder에서 dotfile(.으로 시작하는 숨김파일) 보이게하기, 안 보이게하기

예전에는 아래와 같은 alias를 만들어두고 터미널에서 실행해서 보곤 했는데, 이번에 찾아보니 단축키가 새로 생겼었다.

```
alias hide='defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder'
alias show='defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder'
```

단축키는 `cmd+shift+.` 이고 alias와 다르게 파인더를 재시작할 필요 없어서 더욱 좋다. (아마도, 저 alias로는 설정이 지속적이고, 단축키로는 현재 세션에서만 설정이 적용되는 것으로 보인다)

# Finder에서 `~/Library` 폴더 보이게 하기

예전에는 아래와 같은 명령어로 숨김속성을 해제할 수 있었는데, sierra 이후 버전부터 작동안했다고 한다.

```
chflags nohidden ~/Library
```

다음 링크를 참고하여 Finder에서 GUI를 통해 수동으로 설정하는 수 밖에 없는 것으로 보인다.

https://appletoolbox.com/2018/02/how-to-show-your-user-library-in-macos-high-sierra-and-sierra/#So_here8217s_how_I_got_my_user_library_in_macOS_to_show-up_permanently_in_my_user_folder
