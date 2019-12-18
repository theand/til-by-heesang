[TOC]

# HttpOnly

사이트별 쿠키 중에 HttpOnly로 설정된 쿠키는 js에서 접근할 수 없다.

```
console.log(document.cookie)
```

찍어보아도 노출되지 않는다.


참고
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- https://www.owasp.org/index.php/HttpOnly
