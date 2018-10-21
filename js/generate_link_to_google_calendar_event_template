
# 구글 캘린더에 일정 바로 등록하는 템플릿 링크 만들기

일정을 ics 파일로 생성하는 것 말고 구글 캘린더 템플릿 링크를 통해 추가하는 것도 해보자.

## 파라메터

URL 파라메터 포맷은 대충 알지만, 공식 문서에 나온게 있을까 찾아보니 잘 안 나옴.

참고

- https://stackoverflow.com/questions/22757908/google-calendar-render-action-template-parameter-documentation

## 직접할까 모듈 찾아볼까

URL 파라메터 조립하는건 뻔한 일이라 그냥 할까 하다가 npm 모듈 있나 찾아보니까 역시 있음.

https://github.com/contra/generate-calendar-url/

https://github.com/contra/generate-calendar-url/blob/master/lib/google.js 소스도 간단한데, 그냥 이걸 쓰기로함.

## browserify

어제 만들었던 `ics-browserify` 저장소를 `userscript-browserify` 로 이름을 바꾸고, 이 모듈은 `gencal` 이라는 이름으로 쓸 수 있도록 파일하나 만들고 번들도 생성함.

https://github.com/theand/userscript-browserify/blob/master/main-generate-calendar-url.js

## 사용 코드

어제 했던 코드에 이어서..

```javascript
const gcalEvent = {
    title: calEvent.title,
    start: start.toDate(),
    end: end.toDate(),
    description: calEvent.description
};
const googleCalendarUri = gencal.google(gcalEvent);
const link = document.createElement("a");
link.text = "add to google calendar";
link.href = googleCalendarUri;
link.target = "_blank";
link.className = "msg-button msg-button--clickable";

const insertHere = document.querySelector(".msg-button");
insertHere.parentNode.insertBefore(link, insertHere);

```
