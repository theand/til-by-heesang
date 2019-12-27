[TOC]

# netcat 으로 목적지의 포트 접속 가능한지 체크하기

각종 리전, 존, 방화벽 등을 거쳐야하는 사내 다른 서버에 연결을 하다보면 내가 뭘 잘못해서 연결이 안되는건지 네트웍 설정 자체의 문제로 접근이 안되고 있는 것인지 확인이 필요할때가 있는데, 주로 나는 telnet 이나 nc 로 포트 체크를 한다.

출발지 서버에 접속해서 아래 명령으로 간단하게 포트 확인이 된다.

```
nc dest_ip dest_port
telnet dest_ip dest_port
```


경우에 따라 커맨드가 없으면 yum 이나 apt-get 등으로 적절하게 설치해줘야 한다.  

참고
- https://www.digitalocean.com/community/tutorials/how-to-use-netcat-to-establish-and-test-tcp-and-udp-connections-on-a-vps
