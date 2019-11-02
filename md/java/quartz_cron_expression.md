[TOC]

# Cron Expression과 crontab 의 차이

Quartz 에서 사용하는 Cron Expression과 crontab 에서 사용하는 스케쥴 표기법에는 차이가 있다. crontab 은 초 단위 스케쥴을 지원하지 않고, Quartz 는 지원하기 때문에 표기법에서도 Quartz는 앞자리에 하나가 더 있다.


crontab - 5개 필드
```
minute, hour, day of month, month, day(s) of week
```

Cron Expression - 6개 필드
```
second, minute, hour, day of month, month, day(s) of week
```

그래서 주의할 부분은, 초기에 간이작업을 crontab 에 걸어서 실행하다가 작업이 진전되어, 스프링 배치에 설정하거나 `@Scheduled` 어노테이션을 걸거나 했을때 사용하는 Cron Expression에 crontab 에서 사용했던 스케쥴 필드를 그대로 복사해서 넣으면 원하는대로 작동하지 않게 된다는 점이다.


참고
- http://www.quartz-scheduler.org/api/2.2.3/org/quartz/CronExpression.html
- http://man7.org/linux/man-pages/man5/crontab.5.html
- https://www.adminschoice.com/crontab-quick-reference
- https://stackoverflow.com/questions/9619362/running-a-cron-every-30-seconds
