const addGlobalStyle = (css) => {
    const head = document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
};

const utterancesStyle = `
.utterances-frame{
  position: relative;
}

html, .wy-body-for-nav{
  overflow: visible;
}

.wy-nav-content-wrap {
  background: #fcfcfc;
}

@media screen and (min-width: 1400px){
  .utterances {
    min-height: 268px;
    display: block;
    margin-left: 310px;
  }
}

@media screen and (max-width: 768px){
  .utterances {
    min-height: 268px;
    display: block;
    margin-left: 2em;
  }
}
`;

addGlobalStyle(utterancesStyle);

setTimeout(() => {
  if( document.querySelector(".utterances") ){
    const dynamicStyle = `
@media screen and (min-width: 1400px){
  .utterances {
    top: ${document.querySelector(".wy-nav-content").scrollHeight}px;
  }
}

@media screen and (max-width: 768px){
  .utterances {
    top: ${document.querySelector(".wy-nav-content").scrollHeight + 30}px;
  }
}
    `;
    addGlobalStyle(dynamicStyle);
  }
}, 1000);
