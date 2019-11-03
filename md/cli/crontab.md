[TOC]

# crontab에서 실행하는 잡의 working directory는 어디인가?

찾아본 요점은
- 구현체마다 다르다.
- 유저 스케쥴인지 시스템 스케쥴인지에 따라서도 다르다.

그러니
- 명시적으로 경로를 변경하고(cd xxx)
- PATH도 명시적으로 지정하고
- 실행하는 스크립트도 절대 경로로 지정할 수 있으면 더 좋다.


참고
- https://unix.stackexchange.com/questions/38951/what-is-the-working-directory-when-cron-executes-a-job
