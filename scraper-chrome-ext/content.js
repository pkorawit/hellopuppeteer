console.log('Chrome extension go?');

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.command);
  if (message.command === 'startSelector') {
    createDOMSelector();
  }
}

function createDOMSelector(){
    var overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999999,
      background: 'transparent',
      cursor: 'crosshair'
    });
    document.body.append(overlay);
    
    function getElement(event) {
      overlay.style.pointerEvents = 'none';
      var element = document.elementFromPoint(event.clientX, event.clientY);
      overlay.style.pointerEvents = 'auto';
    
      return element;
    }
    
    document.addEventListener('mousemove', function(event) {
      var element = getElement(event);
      if (!element) return;
    
      var position = element.getBoundingClientRect();
    
      Object.assign(overlay.style, {
        background: 'rgba(0, 128, 255, 0.25)',
        outline: '1px solid rgba(0, 128, 255, 0.5)',
        top: '' + position.top + 'px',
        left: '' + position.left + 'px',
        width: '' + position.width + 'px',
        height: '' + position.height + 'px'
      });
    });
    
    overlay.addEventListener('click', function(event) {
      var element = getElement(event);
      var text = element.textContent || element.value;
    //   text = text.replace(/\n[ \n]+\n/g, "\n").replace(/\n\n+/g, "\n\n").replace(/^\n+|\n+$/g, '');
    //   if (!text.match("\n")) text = text.replace(/^ +| +$/, '')
      console.log(element.className);
      
      window.prompt('Press Ctrl+C to copy', text);
      document.body.removeChild(overlay);
    });
}
