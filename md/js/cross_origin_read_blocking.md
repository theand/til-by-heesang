[TOC]

# CORB

크롬에서 적용된 브라우저 보안 정책으로 CORS와는 다르다. CORS가 허용된 상황이더라도 응답의 `Content-Type` 이 정확하지 않고 의심스러운 상황에서 브라우저가 응답을 빈 응답으로 처리하게 된다.

이를테면, img 태그의 src 경로에 이미지가 아닌 웹 요청이 들어가는 경로를 지정해두고 이를 사용자분석 등에 사용하는 경우에 이런 CORB 에 걸릴 수가 있다.

다만, 내가 겪었던 케이스에서는 웹 요청이 들어가기만 하면 되고 그 응답을 브라우저에서 사용하지는 않아서 CORB에 의해 빈 응답으로 처리된다고 하더라도 별 이슈가 없어서 특별히 다른 조치를 취하지는 않았다

참고

- https://www.chromestatus.com/feature/5629709824032768
- https://www.chromium.org/Home/chromium-security/corb-for-developers
- https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
- https://anforowicz.github.io/xsdb-demo/index.html
- https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md
- https://github.com/whatwg/fetch/issues/681
