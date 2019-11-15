[TOC]

# 검색조건에 여러개의 확장자를 지정하기

`-o` 옵션은 or를 의미한다.

`-name` 옵션을 통해 `"*.ext"`를 or로 묶어주면 되는데, 대소문자 구분을 하기 때문에 `-iname` 옵션으로 대체할 수도 있다.

```
find . -type f \( -name "*.cpp" -o -name "*.CPP" -o -name "*.h" -o -name "*.rc2" -o -name "*.H"  \)

find . -type f \( -iname "*.cpp" -o -iname "*.h" -o -iname "*.rc2" \)
```


참고
- https://unix.stackexchange.com/questions/15308/how-to-use-find-command-to-search-for-multiple-extensions
