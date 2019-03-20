
# 지정한 HTML 요소를 클립보드로 복사하기

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
