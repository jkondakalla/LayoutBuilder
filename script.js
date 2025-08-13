let boxCount = 0;

function addBox() {
  const canvas = document.getElementById('canvas');
  const box = document.createElement('div');
  box.className = 'box';
  box.style.top = `${50 + boxCount * 10}px`;
  box.style.left = `${50 + boxCount * 10}px`;
  box.style.position = 'absolute';

  // Create content area
  const content = document.createElement('div');
  content.contentEditable = true;
  content.innerText = 'Type here...';
  content.style.minHeight = '80px';

  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.innerText = '×';
  removeBtn.style.position = 'absolute';
  removeBtn.style.top = '2px';
  removeBtn.style.right = '2px';
  removeBtn.style.background = 'red';
  removeBtn.style.color = 'white';
  removeBtn.style.border = 'none';
  removeBtn.style.cursor = 'pointer';
  removeBtn.style.padding = '2px 6px';
  removeBtn.style.zIndex = '10';
  removeBtn.onclick = () => {
    box.remove();
    updateCanvasHeight();
  };

  box.appendChild(removeBtn);
  box.appendChild(content);

  // Make box draggable
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
      updateCanvasHeight();
    }
  });

  canvas.appendChild(box);
  boxCount++;
  updateCanvasHeight();
}

function updateCanvasHeight() {
  const canvas = document.getElementById('canvas');
  const boxes = canvas.querySelectorAll('.box');
  let maxBottom = 0;

  boxes.forEach(box => {
    const bottom = box.offsetTop + box.offsetHeight;
    if (bottom > maxBottom) maxBottom = bottom;
  });

  canvas.style.height = `${Math.max(maxBottom + 50, window.innerHeight * 0.8)}px`;
}
