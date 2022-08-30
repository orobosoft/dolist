import Todo from "./todo-items.js";

// Get todo-items list
const arr = Todo().getTodoItemList();

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
	arr.forEach((li) => {
		if (li.category === oldCat) {
			li.category = newCat;
		}
	});
	// push the updated array to the default array
	Todo().setTodoItemList(arr);
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

	const deleteCategory = (categoryName, deleteEverything = false) => {
		if (deleteEverything) {
			// delete both the list and all items in the category
			// delete category from categories list
			for (let i = categories.length - 1; i >= 0; i--) {
				if (categories[i].categoryName === categoryName) {
					categories.splice(i, 1);
				}
			}
			// delete todo-items in the category
			for (let i = arr.length - 1; i >= 0; i--) {
				if (arr[i].category === categoryName) {
					arr.splice(i, 1);
				}
				// push the updated array to the default array
				Todo().setTodoItemList(arr);
			}
		} else {
			// delete the list and change items to the default category
			for (let i = categories.length - 1; i >= 0; i--) {
				if (categories[i].categoryName === categoryName) {
					categories.splice(i, 1);
				}
			}
			updateCategory(categoryName, 'Inbox');
		}
	};

	return {
		createCategory,
		deleteCategory,
		getCategories,
		setCategories,
	};
}
