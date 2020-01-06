[TOC]

공백없이 긴 문자열을 처리하는 스타일

# 말줄임표로 처리하기

```
<div class="longArea">
https://domain.com/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong/addresssssssssssssssssssssssssssssssssssssssssssssss
</div>
```

```
.longArea{
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}
```

https://jsfiddle.net/nm0xr29v/15/
