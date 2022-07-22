// Factory for Todo Items
const TodoItem = () => {
	let title = null;
	let description = null;
	let dueDate = null;
	let priority = null;
	let category = null;
	let note = null;
	let status = true;

	const getStatus = () => {
		return title;
	};
	const toggleStatus = () => {
		title = status === true ? false : true;
	};
	const getTitle = () => {
		return title;
	};
	const setTitle = (newTitle) => {
		title = newTitle;
	};
	const getDescription = () => {
		return description;
	};
	const setDescription = (newDescription) => {
		description = newDescription;
	};
	const getDueDate = () => {
		return dueDate;
	};
	const setDueDate = (newDueDate) => {
		dueDate = newDueDate;
	};
	const getCreationDate = () => {
		return dueDate;
	};
	const setCreationDate = (newCreationDate) => {
		creationDate = newCreationDate;
	};
	const getPriority = () => {
		return priority;
	};
	const setPriority = (newPriority) => {
		priority = newPriority;
	};
	const getCategory = () => {
		return category;
	};
	const setCategory = (newCategory) => {
		category = newCategory;
	};
	const getNote = () => {
		return note;
	};
	const setNote = (newNote) => {
		note = newNote;
	};
	const getCheckLists = () => {
		return checkLists;
	};
	const setCheckLists = (newCheckLists) => {
		checkLists = newCheckLists;
	};

	// Create a list for checklist option inside each todo-item
	let checkLists = [];
	const addCheckList = (input) => {
		const checkList = {};
		checkList.description = input;
		checkList.status = true;
		checkLists.push(checkList);
	};
	const deleteCheckList = (checkList) => {
		for (let i = checkLists.length - 1; i >= 0; i--) {
			if (i === checkList) {
				checkLists.splice(i, 1);
			}
		}
	};

	return {
		getStatus,
		toggleStatus,
		getTitle,
		setTitle,
		getDescription,
		setDescription,
		getDueDate,
		setDueDate,
		getCreationDate,
		setCreationDate,
		getPriority,
		setPriority,
		getCategory,
		setCategory,
		getNote,
		setNote,
		getCheckLists,
		setCheckLists,
		addCheckList,
		deleteCheckList,
	};
};

// Create, get, set and delete todo-items
let todoItemList = [];
export default function todo() {
	const getTodoItemList = () => {
		return todoItemList;
	};
	const setTodoItemList = (newList) => {
		todoItemList = newList;
	};

	// Create todo-items and push to todo-list
	const createTodoItem = (itemData) => {
		const newTodoItem = TodoItem();

		newTodoItem.setTitle(itemData.title);
		newTodoItem.setDescription(itemData.description);
		newTodoItem.setPriority(itemData.priority);
		newTodoItem.setCategory(itemData.category);
		newTodoItem.setDueDate(itemData.dueDate);
		newTodoItem.setCreationDate(itemData.creationDate);
		newTodoItem.setNote(itemData.note);
		newTodoItem.setCheckLists(itemData.checkLists);

		todoItemList.push(newTodoItem);
	};

	const deleteTodoItem = (item) => {
		// Iterate todo-list backward and delete the todo item
		for (let i = todoItemList.length - 1; i >= 0; i--) {
			if (i === item) {
				todoItemList.splice(i, 1);
			}
		}
	};

	return {
		getTodoItemList,
		setTodoItemList,
		createTodoItem,
		deleteTodoItem,
	};
}
