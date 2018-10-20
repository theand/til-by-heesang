
# data uri scheme 으로 웹페이지에 리소스 인라인 첨부


동적으로 생성한 ics 파일 컨텐츠를 다운로드할 수 있게 하기 위해 data uri 를 써서 리소스를 인라인으로 넣었는데, 대충 써오던거를 자세히 알아보고자 좀더 조사해봄.

참고 문서

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
- https://en.wikipedia.org/wiki/Data_URI_scheme

## 형식

```
data:[<mediatype>][;base64],<data>
```

ics 를 넣고자 한다면

```
data:text/calendar,<data>
```

data 부분을 base64 인코딩했으면 `;base64` 라는 구문이 들어가야하고, text 인 경유에는 base64 할 필요는 없이 `encodeURIComponent()` 로 인코딩해서 넣으면 된다.

그리고 `<data>` 영역 앞에 `,` 를 빼먹으면 안됨.

### 실제 사용한 코드

```javascript

ics.createEvent(calEvent, (error, value) => {
    if (error) {
        console.error(error);
    } else {
        const uriContent = "data:text/calendar," + encodeURIComponent(value);

        const link = document.createElement("a");
        link.text = "download ics";
        link.download = `${title}.ics`;
        link.href = uriContent;
        link.className = "msg-button msg-button--clickable";

        const insertHere = document.querySelector(".msg-button");
        insertHere.parentNode.insertBefore(link, insertHere);
    }
});
```
