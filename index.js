function animation() {
  const elements = document.getElementsByClassName('typing-animation');

  for (let i = 0; i < elements.length; i++) {
      main(elements[i]);
  }

  function main(el) {
      if (!el) {
          console.log("el = null\nReturning . . .");
          return;
      } else {
          console.log(`animating: ${el.innerText}`);
      }

      const replacement = document.createElement('div');
      replacement.classList.add('flex-row-center');
      const newspan = document.createElement('span');
      newspan.classList.add('blinking-caret');
      replacement.appendChild(el.cloneNode(true));
      replacement.appendChild(newspan);
      el.parentNode.replaceChild(replacement, el);

      el = replacement.firstChild;
      const text = el.innerText;
      const interval = 150; // ms
      let i = 0;

      function appendText() {
          if (i < text.length) {
              el.innerText = text.substring(0, ++i);
              setTimeout(appendText, interval);
          }
      }
      function blink() {
          if (newspan.style.visibility === 'visible') {
            newspan.style.visibility = 'hidden';
          } else {
            newspan.style.visibility = 'visible';
          }
      }

      el.innerText = '';
      setTimeout(appendText, interval);
      setInterval(blink, interval*3);
  }
}

window.addEventListener('load', animation);