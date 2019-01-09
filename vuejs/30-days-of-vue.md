
[30 days of vue](https://www.fullstack.io/30-days-of-vue/)라는 강좌사이트가 눈에 띄었는데, vue도 까먹어가고 있는지 한참이기도 해서 하루에 한개씩 보면서 해치우기 좋은 구성인 것 같아서 바로 시작.

# 2019-01-09 : day 1 - what is vue
https://www.fullstack.io/30-days-of-vue/day-01-what-is-vue/

- progressive : 간단히 쓸때는 빌드 툴 필요 없이 jquery 처럼 `<script src="https://cdn.jsdelivr.net/npm/vue"></script>` 으로 바로 쓸 수 있다. 복잡해지면 관련 툴 생태계의 도움을 받아 더 생산적인 구성을 할 수도 있다.
- approachable : html, css, js만 알면 된다.
- versatile : vue 코어팀에 의해 관리되는 에코시스템이 있다. `vue-cli`, `vue-router`, `vuex`, `vue-test-utils` 등.
- performant : virtual DOM 으로 빠른 렌더링의 장점을 확보한다.

헬로월드 찍기

```javascript

new Vue({
  el: '#app',
  data: {
    greeting: 'Hello World!',
  },
});
```

```html
<html>
  <body>
    <div id="app">
      <h2>{{ greeting }}</h2>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```
