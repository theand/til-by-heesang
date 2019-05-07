[TOC]

# USB에 mac OS 설치용 부트 이미지 만들기

1. 16기가 정도의 USB 디스크 준비
1. 앱스토어에서 [Mojave 인스톨러](https://itunes.apple.com/us/app/macos-mojave/id1398502828?ls=1&mt=12) 다운로드
1. 터미널에서 다음 커맨드 실행 (`MyVolume`은 해당 usb 볼륨의 이름으로 대체)
```
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```


참고 : https://support.apple.com/en-us/HT201372