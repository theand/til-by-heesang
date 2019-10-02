[TOC]

# 톰캣 JMX 설정하기

```
MONITOR_OPTS="-Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=true \
   -Dcom.sun.management.jmxremote.access.file=$CATALINA_BASE/conf/jmxremote.access  \
   -Dcom.sun.management.jmxremote.password.file=$CATALINA_BASE/conf/jmxremote.password  \
   -Dcom.sun.management.jmxremote.port=5000 \
   -Dcom.sun.management.jmxremote.ssl=false"
```

`launch.sh` 와 같은 실행 스크립트에 위와 같은 형태로 옵션을 추가하면 된다.

주의할 점은 jmxremote.access 와 jmxremote.password 는 퍼미션 `600` 으로 지정되어 있어야만 한다. 그렇지 않으면 톰캣 실행이 되지 않는데, 오류 메시지를 찾기도 너무너무 힘들다.
