[TOC]

# 지정한 기간 동안 반복하여 `yyyy-mm-dd` 형식의 날짜값을 얻어와 쉘 스크립트에서 사용하기

커맨드라인 툴에 인자로 `yyyy-mm-dd` 형식의 날짜를 넘기는 것을 지정한 기간 동안 반복하여 시키고 싶었다.

찾아보니 GNU date 커맨드를 활용하여 가능했다.

```
d=2019-08-01
while [ "$d" != 2019-08-20 ]; do 
  echo $d
  d=$(date -I -d "$d + 1 day")
done
```

참고
- http://man7.org/linux/man-pages/man1/date.1.html
- https://www.gnu.org/software/coreutils/manual/html_node/Examples-of-date.html
