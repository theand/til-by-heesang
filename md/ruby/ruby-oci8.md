[TOC]

# ruby-oci8 젬 설치하기

gem install ruby-oci8

을 했더니 빌드 에러가...

https://www.rubydoc.info/github/kubo/ruby-oci8/file/docs/install-on-osx.md

export OCI_DIR=/usr/local/opt/instantclient-basic/lib
export DYLD_FALLBACK_LIBRARY_PATH=$HOME/lib:/usr/local/lib:/lib:/usr/local/opt/instantclient-basic/lib

brew install instantclient-sdk

mv ~/Downloads/instantclient-sdk-macos.x64-18.1.0.0.0-2.zip /Users/ciao/Library/Caches/Homebrew/downloads/30eed7ec4b699302bdf15b028a7c8db70292871fe4d9e17c42c05d2cae02bba6--instantclient-sdk-macos.x64-18.1.0.0.0-2.zip



ls /usr/local/opt/instantclient-sdk/lib/sdk/include/
