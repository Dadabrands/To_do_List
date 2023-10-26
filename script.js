//Add a new to-do item
const addTodo = () => {
  const taskInput = document.getElementById("todo");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const todoList = document.getElementById("todo-list");
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Add a click event listener to remove the item when clicked
    listItem.addEventListener("click", () => {
      listItem.remove();
      updateLocalStorage(); // Update local storage after removal
    });

    todoList.appendChild(listItem);
    taskInput.value = ""; // Clear the input field
    updateLocalStorage(); // Update local storage after addition
  }
};

// Add a to-do item when the "Add" button is clicked
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTodo);

// Add a to-do item when the Enter key is pressed in the input field
const taskInput = document.getElementById("todo");
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Update local storage with the to-do list items
const updateLocalStorage = () => {
  const todoList = document.getElementById("todo-list");
  const items = todoList.querySelectorAll("li");
  const todoItems = [];

  items.forEach((item, index) => {
    todoItems.push(item.textContent);
  });

  localStorage.setItem("todos", JSON.stringify(todoItems));
};

// Load the to-do list items from local storage
const loadFromLocalStorage = () => {
  const storedItems = JSON.parse(localStorage.getItem("todos"));

  if (storedItems) {
    const todoList = document.getElementById("todo-list");
    storedItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      listItem.addEventListener("click", () => {
        listItem.remove();
        updateLocalStorage();
      });

      todoList.appendChild(listItem);
    });
  }
};

// Load stored to-do items when the page loads
loadFromLocalStorage();
