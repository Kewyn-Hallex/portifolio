const slider = document.querySelector('.slider');

  slider.addEventListener('mousedown', (e) => {
    const startX = e.clientX;
    const scrollLeft = slider.scrollLeft;

    const onMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      slider.scrollLeft = scrollLeft - deltaX;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove',   
 onMouseMove);
    document.addEventListener('mouseup',   
 onMouseUp);
  });