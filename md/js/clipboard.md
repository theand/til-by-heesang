[TOC]


# 지정한 HTML 요소의 텍스트를 클립보드로 복사하기

옛날에는 [zeroclipboard](https://github.com/zeroclipboard/zeroclipboard)라는걸 쓰기도 했지만 이 녀석은 안 보이는 플래쉬를 이용해 시스템 클립보드에 접근하는 방식이라 플래쉬를 사용하지 않게된 모오던 환경에서는 쓸수가 없고, 플래쉬도 필요 없고 jQuery 같은거에 의존성도 없는 [clipboard.js](https://clipboardjs.com/)를 이용한다. IE9 이상을 지원하기 때문에 쓸만하다. 해당 사이트에 자세한 사용법이 친절하게 나와있는데, 나는 아래와 같이 사용했다.

```javascript

<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>

<div>
	<button id='copy-button'  data-clipboard-target='#copyTarget' style='margin: 5px;
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
        display: inline-block;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-appearance: button;
        overflow: visible;'>Copy</button>
	<br />
	<br />
</div>


<div id="copyTarget">
blah blah
</div>

<script>
bindClipboardAction = (sel) => {
    if (!sel) {
        sel = "#copy-button";
    }
    const clipboard = new Clipboard(sel);

    clipboard.on("success", function (e) {

        e.clearSelection();
        document.querySelector(sel).style.backgroundColor = "#d9534f";
        document.querySelector(sel).style.borderColor = "#d43f3a";

    });

    clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
    });

};

bindClipboardAction();
</script>
```


# HTML 요소의 텍스트가 아닌 문자열을 클립보드로 복사하기

위에서 사용한 방법은, 복사할 소스 문자열이 HTML 요소의 텍스트로 들어있어야 하는데, 별도의 HTML 요소의 텍스트가 아니라 그냥 어딘가에 뒀다가 복사해야하는 경우가 생겼다. 그런 경우에 `data-clipboard-text` 속성을 사용할 수 있다.

아래와 같은 형태로 문자열을 두고

```
<a class="clipperArea"
    id="clipperLink"
    data-clipboard-text="blah blah blah blah blah blah"
    href="https://someurl.com"
    target="_blank" >Copy Text and Open Link</a>

```

복사 액션은 똑같이 바인딩해두면 된다.

```
bindClipboardAction("#clipperJiraLink");
```
