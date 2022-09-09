// Factory for Todo Items
const TodoItem = (...arg) => {
	let title = "";
	let description = "";
	let dueDate = getCurrentDate();
	let creationDate = getCurrentDate();
	let priority = "";
	let category = "Inbox";
	let note = "";
	let status = true;
	let uniqueId = uid();
	function uid() {
		return String(Date.now().toString(32) + Math.random().toString(16)).replace(
			/\./g,
			""
		);
	}

	const getUniqueId = () => {
		return uniqueId;
	};
	const setUniqueId = (newId) => {
		uniqueId = newId;
	};
	const getStatus = () => {
		return status;
	};
	const setStatus = (newStatus) => {
		status = newStatus;
	};
	const toggleStatus = () => {
		status = status === true ? false : true;
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
		return creationDate;
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

	let tags = [];
	// Tags
	const getTags = () => {
		return tags;
	};
	const setTags = (newTags) => {
		tags = newTags;
	};

	const addTag = (input) => {
		tags.push(input);
	};
	const deleteTag = (tagIndex) => {
		for (let i = tags.length - 1; i >= 0; i--) {
			if (i === tagIndex) {
				tags.splice(i, 1);
			}
		}
	};

	// Category
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
		let checkList = {};
		checkList.description = input;
		checkList.status = true;
		checkList.uniqueId = uid();
		function uid() {
			return String(
				Date.now().toString(32) + Math.random().toString(16)
			).replace(/\./g, "");
		}
		checkLists.push(checkList);
		return checkList;
	};
	const deleteCheckList = (checkListIndex) => {
		for (let i = checkLists.length - 1; i >= 0; i--) {
			if (i === checkListIndex) {
				checkLists.splice(i, 1);
			}
		}
	};

	return {
		getUniqueId,
		setUniqueId,
		getStatus,
		setStatus,
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
		getTags,
		setTags,
		addTag,
		deleteTag,
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
export let todoItemList = [];
export default function todo() {

	const getTodoItemList = () => {
		return todoItemList;
	};
	const setTodoItemList = (newListArray) => {
		todoItemList = newListArray;
	};

	// Create todo-items and push to todo-list
	const createTodoItem = () => {
		const newTodoItem = TodoItem();
		todoItemList.push(newTodoItem);
		return newTodoItem;
	};

	const deleteTodoItem = (todoItemIndex) => {
		// Iterate todo-list backward and delete the todo item
		for (let i = todoItemList.length - 1; i >= 0; i--) {
			if (i === todoItemIndex) {
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

function getCurrentDate() {
	const date = new Date();
	const day = ("0" + date.getDate()).slice(-2);
	const month = ("0" + date.getMonth()).slice(-2);
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
}
