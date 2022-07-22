import Todo from "./todo-items.js";

// Get todo-items list
const arr = Todo().getTodoItemList();

// Category list factory
const CategoryItem = (name) => {
	const categoryName = name;

	const getCategoryName = () => {
		return categoryName;
	};
	const changeCategoryName = (newName) => {
		updateCategory(categoryName, newName);
		categoryName = newName;
	};

	const categoryTodo = (categoryName) => {
		return arr.filter((v) => v.category === categoryName);
	};
	const createTodoItemInList = () => {
		Todo().createTodoItem({ category: categoryName });
	};

	return {
		getCategoryName,
		changeCategoryName,
		categoryTodo,
		createTodoItemInList,
	};
};

// Loop through todo-items list and change category name
const updateCategory = (oldCat, newCat) => {
	arr.forEach((li) => {
		if (li.category === oldCat) {
			li.category = newCat;
		}
	});
	// push the updated array to the default array
	Todo().setTodoItemList(arr);
};


let categories = [];
export default function category() {
	const getCategories = () => {
		return categories;
	};
	const setCategories = (newCategoriesArray) => {
		categories = newCategoriesArray;
	};

	const createCategory = (name) => {
		const newCategory = CategoryItem(name);

		categories.push(newCategory);
	};

	const deleteCategory = (categoryIndex, deleteEverything = false) => {
		let name = categories[categoryIndex].category;


		if (deleteEverything) { // delete both the list and all items in the category
			// delete category from categories list
			for (let i = categories.length - 1; i >= 0; i--) {
				if (i === categoryIndex) {
					categories.splice(i, 1);
				}
			}
			// delete todo-items in the category
			for (let i = arr.length - 1; i >= 0; i--) {
				if (arr[i].category === name) {
					arr.splice(i, 1);
				}
				// push the updated array to the default array
				Todo().setTodoItemCategory(arr);
			}
		} else { // delete the list and change items to the default category
			for (let i = categories.length - 1; i >= 0; i--) {
				if (i === categoryIndex) {
					categories.splice(i, 1);
				}
				updateCategory(name, "Inbox");
			}
		}
	};

	return {
		createCategory,
		deleteCategory,
		getCategories,
		setCategories,
	};
}
