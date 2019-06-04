[TOC]

# Kerberos
https://web.mit.edu/kerberos/

네트웍 인증 프로토콜

사내 시스템들이 커버로스 인증을 사용하게 되어 있는데, 몇개 커맨드를 새로 알게된 김에 정리해봄.

## 주요 명령어

### kinit

```
kinit --keychain USERID
```

비번을 키체인에 저장하여 매번 입력할 필요 없게 됨. 한번만 실행해두면 됨.

```
kinit USERID
```

키체인에 저장된 값을 이용해 인증을 진행함.

```
kinit -kt ~/.ssh/USERID.keytab USERID@DOMAIN
```

여러개의 REALM 을 쓰는 경우에는 `USERID@DOMAIN` 과 같이 REALM 정보를 명시해야 한다. 생략하면 디폴트 REALM 으로 간주된다. 디폴트 REALM 은 `/etc/krb5.conf` 에 설정되어 있다.

`-kt` 옵션은 비번이나 키체인 정보가 아니라 키탭 파일을 이용해 인증하도록 해준다.

### klist

```
klist -l
```

여러개의 REALM 에 인증을 했다면, 현재 인증되어 있는 REALM과 현재 활성화된 REALM 의 정보를 표시해준다.


### kswitch

```
kswitch -i
```

여러개의 REALM 에 인증이 되어 있다면, 현재 세션에 활성화할 인증정보를 선택할 수 있게 해준다.

### kdestroy

```
kdestroy -a
```

인증되어 있는 티켓 정보를 모두 제거한다.

### 키체인에 저장된 암호 업데이트하기

명시적인 옵션은 잘 찾질 못했고, 이 방법이 제일 간단한 것 같다.

```
To initialize Keychain entries for your Kerberos principal(s) in 10.6, the simplest method is to run kinit with no attached tty, e.g.:

    echo | kinit [principal]

or

    kinit [principal] < /dev/null
```

그래서 키체인을 초기화하고 새로 저장하는 것도 한번에 할 수 있도록 이런 alias를 만들어두었다.

```
alias krenew="echo | kinit --keychain [MY_ID]"
```




참고 : https://gist.github.com/jrk/204278
