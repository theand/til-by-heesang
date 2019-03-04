
# 로컬테스트용으로 사용하는 .dev gTLD는 이제 그만

## 상황

한때 개발용 로컬 도메인으로 `.dev` 를 TLD로 쓰는 스타일이 마음에 들어서 그걸 차용했었고, 일일이 `hosts` 파일에 안적어줘도 되도록 해주는 툴들( [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) , [pow](http://pow.cx/) )이 있어서 제대로 들여다보진 않았지만 대충 튜토리얼 보고 설정을 해놓았음. 근데, 최근 2년넘도록 `.dev` 도메인을 써서 개발할 만한 작업이 없었음.

개발자들이 로컬용으로 쓰던 `.dev` gTLD를 구글이 정식으로 취득(?)했고, 덕분에 크롬63(2017/12)부터 `.dev ` 도메인에 대해서는 [https default로 적용된다](https://webdevstudios.com/2017/12/12/google-chrome-63/)는 것도 알고 있긴 했는데, 내 로컬에서도 안 쓰고 구글 사이트에서도 쓰는지 안 쓰는지 모르겠어서 크게 관심은 두지 않았는데..

그러다가 문득 V8 JS engine의 [블로그 링크](https://v8.dev/blog)를 보게 되어서 접속해보려고 하니 접속이 되지 않는 것. LTE폰에서는 접속이 됐다. 내가 설치해둔 `.dev`  관련 툴의 설정이 원인이라는 것은 감이 왔는데, 뭘 어떻게 했는지 도무지 기억이 나지 않는 상태.


참고

- https://icannwiki.org/.dev
- https://ma.ttias.be/chrome-force-dev-domains-https-via-preloaded-hsts/
- https://medium.engineering/use-a-dev-domain-not-anymore-95219778e6fd


## 경과

`dig`와 `traceroute`가 참고하는 설정이 어떻게 다른진 모르겠지만 dig 에서는 IP가 나왔지만 traceroute 에서는 찾아가지 못함.

```
$ dig +short v8.dev
151.101.65.195
151.101.1.195

$ traceroute v8.dev
traceroute: unknown host v8.dev
```

아래 경로에서 `dnsmasq`나 `pow`가 실행되도록 설정되었는지 찾아보았으나, 자주 쓰지 않는 툴이었기 때문에 내가 분명히 설정을 false로 바꾸어놓았었다.

```
/Library/LaunchDaemons
/Library/LaunchAgents
```

런칭 설정을 내가 잘못이해한 것일지도 모르니 `dnsmasq`, `pow` 의 설정 파일을 뒤져서 관련있음직한 부분을 주석처리했다.

```
/opt/boxen/config/dnsmasq/dnsmasq.conf
~/.powconfig
```

혹시 몰라 재부팅해도 여전히 마찬가지.

어차피 안 쓴지 오래됐으니 에라 모르겠다 , `brew uninstall --force dnsmasq pow` 하고 재부팅했으나 여전히 마찬가지.

혹시나 하고 맨처음에 세팅을 어떻게 했는지 찾아보았다.


- https://gist.github.com/ogrrd/5831371
- https://passingcuriosity.com/2013/dnsmasq-dev-osx/

아, `dnsmasq` 를 설치하고 설정하는 것과 별개로 `/etc/resolver/dev` 에 수동으로 설정을 추가하는 과정이 있었던 것이다.

```
$ cat /etc/resolver/dev
# nameserver 127.0.0.1
```

주석처리하니까 제대로 접속이 된다.

```
$ traceroute v8.dev
traceroute: Warning: v8.dev has multiple addresses; using 151.101.1.195
traceroute to v8.dev (151.101.1.195), 64 hops max, 52 byte packets
...생략
```

그땐 뭘 모르고 설정 따라했는데 지금 이 상황을 겪고 보니, `dnsmasq`는 `*.dev`를 `127.0.0.1` 로 resolve해주는 로컬 DNS서버이고, `/etc/resolver/dev` 는 macos가 `*.dev`에 대한 DNS 서버는 `127.0.0.1` 에 있으니 거기로 도메인 질의를 하라고 알려주는 설정으로 이해가 된다. 그래서 `dnsmasq` 를 지웠음에도 여전히 접속이 안 된 것.

## 로컬 개발용 도메인으로는 뭘 써야하나?

```
To safely satisfy these needs, four domain names are reserved as
   listed and described below.

                   .test
                .example
                .invalid
              .localhost

      ".test" is recommended for use in testing of current or new DNS
      related code.

      ".example" is recommended for use in documentation or as examples.

      ".invalid" is intended for use in online construction of domain
      names that are sure to be invalid and which it is obvious at a
      glance are invalid.

      The ".localhost" TLD has traditionally been statically defined in
      host DNS implementations as having an A record pointing to the
      loop back IP address and is reserved for such use.  Any other use
      would conflict with widely deployed code which assumes this use.
```

source: https://tools.ietf.org/html/rfc2606#section-2

RFC에 따르면 `.test` 를 쓰는걸 권장한다고 한다.
