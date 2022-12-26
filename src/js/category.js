import { storeData } from "./data.js";
import Todo, { todoItemList } from "./todo-items.js";

// Get todo-items list
const arr = todoItemList;

// Category list factory
const CategoryItem = (name, color) => {
	let categoryName = name;
	let categoryColor = color || getRandomColor();
	function getRandomColor() {
		var letters = "0123456789ABCDEF".split("");
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}

	const getCategoryName = () => {
		return categoryName;
	};
	const changeCategoryName = (newName) => {
		updateCategory(categoryName, newName);
		categoryName = newName;
	};
	const getCategoryColor = () => {
		return categoryColor;
	};
	const setCategoryColor = (newCategoryColor) => {
		categoryColor = newCategoryColor;
	};

	// const categoryTodo = (categoryName) => {
	// 	return arr.filter((v) => v.getCategory() === categoryName);
	// };
	const createTodoItemInList = () => {
		Todo().createTodoItem({ category: categoryName });

	};

	return {
		getCategoryName,
		changeCategoryName,
		getCategoryColor,
		setCategoryColor,
		// categoryTodo,
		createTodoItemInList,
	};
};

// Loop through todo-items list and change category name
const updateCategory = (oldCat, newCat) => {
	todoItemList.forEach((li) => {
		if (li.getCategory() === oldCat) {
			li.setCategory(newCat);
		}
	});
	// push the updated array to the default array
	// Todo().setTodoItemList(arr);
};

export let categories = [];
export default function category() {
	const getCategories = () => {
		return categories;
	};
	const setCategories = (newCategoriesArray) => {
		categories = newCategoriesArray;
	};

	const createCategory = (name, color) => {
		const newCategory = CategoryItem(name, color);
		categories.push(newCategory);
		return newCategory;
	};

	const deleteCategory = (categoryName, deleteEverything) => {
		console.log('inside here now');
		console.log(todoItemList);
		console.log(arr);
		if (deleteEverything) {
			// delete both the list and all items in the category
			// delete category from categories list
			for (let i = categories.length - 1; i >= 0; i--) {
				if (categories[i].getCategoryName() === categoryName) {
					categories.splice(i, 1);
				}
			}
			// delete todo-items in the category
			for (let i = todoItemList.length - 1; i >= 0; i--) {
				if (todoItemList[i].getCategory() === categoryName) {
					todoItemList.splice(i, 1);
				}
				// push the updated array to the default array
				// Todo().setTodoItemList(arr);
			}
		} else {
			// delete the list and change items to the default category
			for (let i = categories.length - 1; i >= 0; i--) {
				if (categories[i].getCategoryName() === categoryName) {
					categories.splice(i, 1);
				}
			}
			updateCategory(categoryName, 'Inbox');
			// storeData()
		}
	};

	return {
		createCategory,
		deleteCategory,
		getCategories,
		setCategories,
	};
}
