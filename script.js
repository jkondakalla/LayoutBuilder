let boxCount = 0;

function addBox() {
  const canvas = document.getElementById('canvas');
  const box = document.createElement('div');
  box.className = 'box';
  box.contentEditable = true;
  box.innerText = 'Type here...';
  box.style.top = `${50 + boxCount * 10}px`;
  box.style.left = `${50 + boxCount * 10}px`;
  box.draggable = true;

  box.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', null);
    box.dataset.dragging = true;
    box.dragOffsetX = e.offsetX;
    box.dragOffsetY = e.offsetY;
  });

  canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingBox = document.querySelector('.box[data-dragging="true"]');
    if (draggingBox) {
      draggingBox.style.left = `${e.clientX - draggingBox.dragOffsetX}px`;
      draggingBox.style.top = `${e.clientY - draggingBox.dragOffsetY}px`;
    }
  });

  canvas.addEventListener('drop', () => {
    const draggingBox = document.querySelector('.box[data-dragging="true"]');
    if (draggingBox) {
      delete draggingBox.dataset.dragging;
    }
  });

  box.addEventListener('dblclick', () => {
    box.remove();
  });

  canvas.appendChild(box);
  boxCount++;
}
