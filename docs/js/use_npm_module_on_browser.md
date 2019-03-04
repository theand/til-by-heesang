# 브라우저에서 npm 모듈 사용하기

요구사항 : 최근에 사용해본 npm ics 모듈을 브라우저에서 쓰고 싶다. 구체적으로는 1) cdn에 올려가있는 2) npm 모듈을 userscript 에서 불러다 쓰고 싶다. 3) 혼자 쓸거라 적당히 더티해도 괜찮다.

해결 :

 1. CDN : https://www.jsdelivr.com/ : npm 에 등록되있는 오픈소스를 쓰기에도 편하고, github public repo 에 있는 파일도 접근가능하다. `https://cdn.jsdelivr.net/gh/계정명/저장소명@태그/파일경로` 으로 접근가능하다. `@태그` 없으면 최근버전을 로딩하는데, CDN이라 캐쉬 문제가 있어서 귀찮아도 일일이 태깅해서 태그로 접근을 하고 안정화되면 태그를 latest 로 바꿔서 쓰고 있다. 비슷한 기능을 제공하는 오픈소스 CDN 서비스가 여럿있지만 요샌 그냥 이걸 쓰고 있다.
 2. npm 모듈을 브라우저에서 쓰기 : 이번에 처음 써봤는데 browserify 로 가능했다.

참고한 글

- https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072
- http://browserify.org/

## 과정 요약

- cli 설치 : `npm install -g browserify`
- 사용하려는 ics 모듈을 로딩하는 코드를 담은 저장소를 하나 만든다. : https://github.com/theand/ics-browserify
- require로 ics를 가져와서 window 네임스페이스에 모듈을 넣어버린다. 필요없는 단계일수도 있지만 여러번 테스트하기 귀찮아서 넣어버렸다.

  ```javascript
  const ics = require('ics')

  window.ics = ics;
  ```

- browserify 한다. require() 로 불러온 모듈들의 의존성을 알아서 파일 하나로 합쳐준다.
  `browserify main.js -o bundle.js`
- github 에 bundle.js 도 올리고 태깅.
- userscript 로 테스트하기 전에 일단 제대로 불러와지는지 본다. 아무 페이지에서나 콘솔을 열고 아래 코드를 넣어서 샘플 코드가 돌아가는지 본다. VCALENDAR 포맷이 제대로 출력되면 끝.

```javascript
injectExternalJavaScript = (src) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);
};
injectExternalJavaScript("https://cdn.jsdelivr.net/gh/theand/ics-browserify@0.2/bundle.js");
```

```javascript
//https://github.com/adamgibbons/ics 에 있는 첫번째 샘플코드에서 require 구문만 제거

const event = {
  start: [2018, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true },
    { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton' }
  ]
}

ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error)
    return
  }else{
    console.log(value)
  }
})
```
