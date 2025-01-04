document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".card");
  const container = document.querySelector(".content");

  let draggingElement = null;

  sections.forEach((section) => {
    // Handle drag start
    section.addEventListener("dragstart", (e) => {
      draggingElement = section;
      section.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    // Handle drag end
    section.addEventListener("dragend", () => {
      section.classList.remove("dragging");
      draggingElement = null;
    });
  });

  // Handle drag over container
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("Dragging over: ", e.target);
    const afterElement = getDragAfterElement(container, e.clientY);
    if (draggingElement) {
      if (afterElement == null) {
        container.appendChild(draggingElement);
      } else {
        container.insertBefore(draggingElement, afterElement);
      }
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".card:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});
