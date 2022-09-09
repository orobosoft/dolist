import category, { categories } from "./category";
import tag, { tags } from "./tag";
import todo, { todoItemList } from "./todo-items";
import UserImage from "../img/user.jpg";
import {
	autoTheme,
	loopTags,
	openInbox,
	openOverview,
	openToday,
	showProjectList,
} from "./DOM-events";

const colors = [
	{
		color1: "#6aa7b3",
		color1a: "106, 167, 179",
		color2: "#fff",
	},
	{
		color1: "#71d400",
		color1a: "113, 212, 0",
		color2: "var(--bg-color)",
	},
	{
		color1: "#0063d4",
		color1a: "0, 99, 212",
		color2: "#fff",
	},
];
function updateAccentColor(num) {
	const html = document.querySelector("html");
	const p = colors[Number(num) - 1];
	html.style.setProperty("--color-3", `${p.color1}`);
	html.style.setProperty("--color-3-t", `${p.color1a}`);
	html.style.setProperty("--color-5", `${p.color2}`);
}
function getAccentColorNumber() {
	const html = getComputedStyle(document.querySelector("html"));
	const accent = html.getPropertyValue("--color-3");

	for (let i = 0; i < colors.length; i++) {
		const element = colors[i];
		if (element.color1 === accent) return i + 1;
	}
}

function setData(data) {
	let newTags = [];
	let newCategories = [];
	let newTodoItemList = [];

	let tags = data.tags;
	for (let i = 0; i < tags.length; i++) {
		const name = tags[i];
		const newTag = tag().createTag(name);
		newTags.push(newTag);
	}
	let categories = data.categories;
	for (let i = 0; i < categories.length; i++) {
		const catName = categories[i].catName;
		const catColor = categories[i].catColor;
		const newCat = category().createCategory(catName, catColor);
		newCategories.push(newCat);
	}
	let todoItemList = data.todoItems;
	for (let i = 0; i < todoItemList.length; i++) {
		const element = todoItemList[i];

		let checkList = [];
		let tags = [];

		const ch = element.checkList;
		for (let i = 0; i < ch.length; i++) {
			let check = {};
			const e = ch[i];
			check.description = e.description;
			check.status = e.status;
			check.uniqueId = e.uniqueId;
			checkList.push(check);
		}
		let a = element.tags;
		for (let i = 0; i < a.length; i++) {
			const z = a[i];
			tags.push(z);
		}

		let title = element.title;
		let description = element.description;
		let dueDate = element.dueDate;
		let creationDate = element.creationDate;
		let priority = element.priority;
		let category = element.category;
		let note = element.note;
		let status = element.status;
		let uniqueId = element.uniqueId;

		const newTodo = todo().createTodoItem();

		newTodo.setUniqueId(uniqueId);
		newTodo.setStatus(status);
		newTodo.setTitle(title);
		newTodo.setDescription(description);
		newTodo.setDueDate(dueDate);
		newTodo.setCreationDate(creationDate);
		newTodo.setPriority(priority);
		newTodo.setTags(tags);
		newTodo.setCategory(category);
		newTodo.setNote(note);
		newTodo.setCheckLists(checkList);

		newTodoItemList.push(newTodo);
	}

	let name = document.querySelector(".user-name p");
	let img = document.querySelector(".user-picture img");

	name.textContent = data.name;
	img.src = data.picture;
	updateAccentColor(data.color);
	autoTheme(data.theme);

	todo().setTodoItemList(newTodoItemList);
	category().setCategories(newCategories);
	tag().setTags(newTags);

	// openToday(newTodoItemList);
	// openInbox(newTodoItemList)
}

const { todoArray, categoryArray, tagArray } = generateData();
const newDemo = {
	name: "Demo",
	picture: UserImage,
	theme: "system",
	color: "2",
	tagArray: tagArray,
	categoryArray: categoryArray,
	todoArray: todoArray,
};
let demo = newDemo;

const newUser = {
	name: "User",
	picture: UserImage,
	theme: "system",
	color: "2",
	tagArray: [
		tag().createTag("Home"),
		tag().createTag("Art"),
		tag().createTag("Love"),
		tag().createTag("Personal"),
	],
	categoryArray: [
		category().createCategory("doList", "red"),
		category().createCategory("Development", "blue"),
		category().createCategory("Office", "green"),
		category().createCategory("Personal", "yellow"),
	],
	todoArray: [],
};
let user = newUser;

function generateData() {
	const tagArray = [];
	const categoryArray = [];
	const todoArray = [];

	for (let i = 0; i < 10; i++) {
		const newTag = tag().createTag(`Tag ${i + 1}`);
		tagArray.push(newTag);
	}
	for (let i = 0; i < 5; i++) {
		let cat = category().createCategory(`Cate ${i + 1}`);
		categoryArray.push(cat);
	}

	for (let i = 0; i < 10; i++) {
		const n = categoryArray[Math.floor(Math.random() * categoryArray.length)];

		const newTodo = todo().createTodoItem();
		newTodo.setCategory(n.getCategoryName());
		newTodo.setTitle(`Task ${i + 1}`);

		for (let i = 0; i < 5; i++) {
			newTodo.addCheckList(`CheckList ${i + 1}`);
		}
		for (let i = 0; i < tagArray.length; i++) {
			newTodo.addTag(tagArray[i].getTagName());
		}
		todoArray.push(newTodo);
	}
	return { todoArray, categoryArray, tagArray };
}

let app = { active: "demo", demo: demo, user: user };

function firstLoad(data) {
	let name = document.querySelector(".user-name p");
	let img = document.querySelector(".user-picture img");

	name.textContent = data.name;
	img.src = data.picture;
	updateAccentColor(data.color);
	autoTheme(data.theme);

	todo().setTodoItemList(data.todoArray);
	category().setCategories(data.categoryArray);
	tag().setTags(data.tagArray);
}

function loadApp() {
	// localStorage.clear()
	if (localStorage.getItem(app.active)) {
		let sData = JSON.parse(localStorage.getItem(app.active));
		setData(sData);
		openToday(todoItemList);
		showProjectList(categories);
		loopTags(tags);
	} else {
		firstLoad(app[app.active]);
		openToday(todoItemList);
		showProjectList(categories);
		loopTags(tags);
		updateLocalStorage();
	}
}
export function updateLocalStorage() {
	let dataToSave = JSON.stringify(storeData());
	let activeData = app.active;

	localStorage.setItem("active", activeData);
	localStorage.setItem(activeData, dataToSave);
}

function storeData() {
	let newData = {};
	let newTags = [];
	let newCategories = [];
	let newTodoItemList = [];

	newData.name = document.querySelector(".user-name p").textContent;
	newData.picture = document.querySelector(".user-picture img").src;
	newData.theme = (() => {
		let test = document.querySelector(".theme-icon");
		return test.classList.contains("theme-system")
			? "system"
			: test.classList.contains("theme-light")
			? "light"
			: "dark";
	})();
	newData.color = getAccentColorNumber();

	// Get tags
	for (let i = 0; i < tags.length; i++) {
		const name = tags[i].getTagName();
		newTags.push(name);
	}

	// Get categories
	for (let i = 0; i < categories.length; i++) {
		const catName = categories[i].getCategoryName();
		const catColor = categories[i].getCategoryColor();
		newCategories.push({ catName, catColor });
	}

	// Get tasks
	for (let i = 0; i < todoItemList.length; i++) {
		const element = todoItemList[i];
		let tasks = {};

		let iCheckList = [];
		let iTags = [];
		const ch = element.getCheckLists();
		// Get checklist in task
		for (let i = 0; i < ch.length; i++) {
			let check = {};
			const e = ch[i];
			check.description = e.description;
			check.status = e.status;
			check.uniqueId = e.uniqueId;
			iCheckList.push(check);
		}

		// Get tags in task
		let a = element.getTags();
		for (let i = 0; i < a.length; i++) {
			const z = a[i];
			iTags.push(z);
		}

		// Get other details in task
		tasks.title = element.getTitle();
		tasks.description = element.getDescription();
		tasks.dueDate = element.getDueDate();
		tasks.creationDate = element.getCreationDate();
		tasks.priority = element.getPriority();
		tasks.category = element.getCategory();
		tasks.note = element.getNote();
		tasks.status = element.getStatus();
		tasks.uniqueId = element.getUniqueId();
		tasks.checkList = iCheckList;
		tasks.tags = iTags;

		// Add task to new tasks array
		newTodoItemList.push(tasks);
	}

	newData.tags = newTags;
	newData.categories = newCategories;
	newData.todoItems = newTodoItemList;

	return newData;
}

loadApp();
window.addEventListener("storage", () => {
	openToday(todoItemList);
});

console.log("data");
