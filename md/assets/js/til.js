
setTimeout(() => {
  if( document.querySelector(".utterances") ){
    document.querySelector(".utterances").style = `
      top: ${document.querySelector(".wy-nav-content").scrollHeight + 100}px;
      min-height: 15em;
    `;
  }
}, 1000);
