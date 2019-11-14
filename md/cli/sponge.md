[TOC]

# sponge

>It addresses the problem of editing files in-place with Unix tools, namely that if you just redirect output to the file you're trying to edit then the redirection takes effect (clobbering the contents of the file) before the first command in the pipeline gets round to reading from the file. Switches like sed -i and perl -i work around this, but not every command you might want to use in a pipeline has such an option, and you can't use that approach with multiple-command pipelines anyway.
>
>I normally use sponge a bit like this:
>
>sed '...' file | grep '...' | sponge file

커맨드로 파일을 리다이렉트로 다룰때, 앞의 명령어에서 파일의 내용을 표준출력으로 보내고, 리다이렉트 받으면서 현재 작업중인 그 파일에 내용을 바로 쓰면 파일이 깨지는 상황이 생길 수 있다. 이럴때 파이프로 `sponge` 커맨드로 파일이름과 함께 넘기면 이런 상황을 안전하게 처리해준다.

이를테면, 아래와 같이 사용해야 했던 명령이 있다면,
```
iconv -c -f euc-kr -t utf-8 EtcFunctions.cpp > EtcFunctions.cpp.utf8 && mv -f EtcFunctions.cpp.utf8 EtcFunctions.cpp
```

아래와 같이 변경할 수 있다.
```
iconv -c -f euc-kr -t utf-8 EtcFunctions.cpp | sponge EtcFunctions.cpp
```


참고
- https://web.archive.org/web/20160531054830/http://riva.ucam.org:80/~cjwatson/blog/2006/02/06
- http://joeyh.name/code/moreutils/
