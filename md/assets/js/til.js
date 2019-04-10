
setTimeout(() => {
  if( document.querySelector(".utterances") ){
    document.querySelector(".utterances").style = `
      top: ${document.querySelector(".wy-nav-content").scrollHeight}px;
      min-height: 268px;
      display: block;
    `;
  }
}, 1000);
