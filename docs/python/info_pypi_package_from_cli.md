
# 원하는 것

콘솔에서 `pip` 커맨드로 PyPi 패키지 상세 정보를 보고 싶다. `search` 는 되는데, 패키지 상세 정보를 볼 수가 없다. `show` 는 로컬에 인스톨된 패키지의 정보만 보여준다. `npm info`나 `gem info` 같은게 없나?

# 찾아본 결과

`pip`에는 그런 기능이 없다.  대신 `yolk` 라는 패키지를 깔아서 쓰면 된다고 한다.

```
pip3 install yolk3k
yolk3k -M cx_Oracle
```

source :
- https://superuser.com/questions/1210661/pip-get-long-description-of-uninstalled-package
- https://github.com/cakebread/yolk python2
- https://github.com/myint/yolk python3
