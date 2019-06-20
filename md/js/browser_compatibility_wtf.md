[TOC]

# 브라우저 호환성 똥 밟은 케이스 모음

## 잘못된 셀렉터에 대한 관용도 차이

```
document.querySelectorAll('.wrap_item[data-shown=true')
```

깜박하고, 닫는 `]` 을 빼먹은 내가 잘못 쓴 코드인데, 이 잘못 쓴 코드를 IE, Chrome, FF, Opera에서는 제대로 실행시켜주고 원하는 결과까지 얻어주지만, Safari에서만 에러를 발생시킨다.

## dataset

`el.dataset.blockIndex` 와 같이 `data-xxx` 에 접근할 수 있는  `dataset`을 IE에서는 11이상에서만 제대로 지원함. html5 지원브라우저면 당연히 되는거 아닌가 했다가 IE10에서 에러 발생.


https://caniuse.com/#feat=dataset

## css unset

IE 에서는 아예 지원 안함.

https://caniuse.com/#feat=css-unset-value
