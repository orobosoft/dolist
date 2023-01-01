import category, { categories, resetCategories } from "./category";
import tag, { resetTags, tags } from "./tag";
import todo, { resetTodoItemList, todoItemList } from "./todo-items";
import UserImage from "../img/user.png";
import UserImage1 from "../img/user_2.png";
import UserImage2 from "../img/user_3.jpg";
import {
	autoTheme,
	loopTags,
	openInbox,
	openOverview,
	openToday,
	showProjectList,
} from "./DOM-events";

export const themeColors = [
	{
		color1: "#6aa7b3",
		color1a: "106, 167, 179",
		color2: "#f5f5f5",
	},
	{
		color1: "#71d400",
		color1a: "113, 212, 0",
		color2: "var(--bg-color)",
	},
	{
		color1: "#0063d4",
		color1a: "0, 99, 212",
		color2: "#f5f5f5",
	},
	{
		color1: "#6e4458",
		color1a: "110, 68, 88",
		color2: "#f5f5f5",
	},
	{
		color1: "#c3807a",
		color1a: "195, 128, 122",
		color2: "#f5f5f5",
	},
];
export let appData = {
	demo: "Demo Person",
	user1: "New User 1",
	user2: "New User 2",
};

export function updateAccentColor(num) {
	const html = document.querySelector("html");
	const p = themeColors[Number(num) - 1];
	html.style.setProperty("--color-3", `${p.color1}`);
	html.style.setProperty("--color-3-t", `${p.color1a}`);
	html.style.setProperty("--color-5", `${p.color2}`);
}
function getAccentColorNumber() {
	const html = getComputedStyle(document.querySelector("html"));
	const accent = html.getPropertyValue("--color-3");

	for (let i = 0; i < themeColors.length; i++) {
		const element = themeColors[i];
		if (element.color1 === accent) return i + 1;
	}
}

function setData(data) {
	appData.id = data.id;
	appData.theme = data.theme;
	appData.picture = data.picture;
	appData.color = data.color;
	appData.name = data.name;

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

function generateData() {
	let newDemo = {};
	let tagArray = [];
	let categoryArray = [];
	let todoArray = [];

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
	newDemo.tagArray = tagArray;
	newDemo.categoryArray = categoryArray;
	newDemo.todoArray = todoArray;

	newDemo.id = "demo";
	newDemo.name = "Demo Person";
	newDemo.picture = UserImage;
	newDemo.theme = "system";
	newDemo.color = "1";

	return newDemo;
}

export let demo = generateData();

export const newUser1 = {
	id: "user1",
	name: "New User 1",
	picture: UserImage1,
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
export const newUser2 = {
	id: "user2",
	name: "New User 2",
	picture: UserImage2,
	theme: "system",
	color: "3",
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

export let defaultAppData = {
	active: "demo",
	demo: demo,
	user1: newUser1,
	user2: newUser2,
};

export function firstLoad(data) {
	resetCategories()
	resetTags()
	resetTodoItemList()

	appData.id = data.id;
	appData.picture = data.picture;
	appData.theme = data.theme;
	appData.name = data.name;
	appData.color = data.color;

	let name = document.querySelector(".user-name p");
	let img = document.querySelector(".user-picture img");

	name.textContent = data.name;
	img.src = data.picture;
	updateAccentColor(data.color);
	autoTheme(data.theme);



	todo().setTodoItemList(data.todoArray);
	category().setCategories(data.categoryArray);
	tag().setTags(data.tagArray);

	localStorage.setItem("active", `${data.id}`);
	localStorage.setItem(`${data.id}`, JSON.stringify(storeData()));
}

export function loadApp() {
	// localStorage.clear()
	let data = localStorage.getItem(localStorage.getItem("active"));

	if (data) {
		let sData = JSON.parse(data);
		setData(sData);
		openToday(todoItemList);
		showProjectList(categories);
		loopTags(tags);
		updateUserDetails();
	} else {
		firstLoad(defaultAppData[defaultAppData.active]);
		updateUserDetails();
		openToday(todoItemList);
		showProjectList(categories);
		loopTags(tags);
		updateUserDetails();
	}
}
export function updateUserDetails() {
	let data1 = localStorage.getItem("demo");
	let data2 = localStorage.getItem("user1");
	let data3 = localStorage.getItem("user2");

	if (data1) {
		let data = JSON.parse(data1);
		appData.demo = data.name;
	}
	if (data2) {
		let data = JSON.parse(data2);
		appData.user1 = data.name;
	}
	if (data3) {
		let data = JSON.parse(data3);
		appData.user2 = data.name;
	}

	let demo = document.querySelector('[data-user="demo"]');
	demo.textContent = appData.demo;
	let user1 = document.querySelector('[data-user="user1"]');
	user1.textContent = appData.user1;
	let user2 = document.querySelector('[data-user="user2"] ');
	user2.textContent = appData.user2;

	let pic = document.querySelector(".user-picture img");
	let name = document.querySelector(".user-name p");

	name.textContent = appData.name;
	pic.src = appData.picture;
	updateAccentColor(appData.color);
}

export function storeData() {
	let newData = {};
	let newTags = [];
	let newCategories = [];
	let newTodoItemList = [];

	newData.id = appData.id;
	newData.name = appData.name;
	newData.picture = appData.picture;
	newData.color = appData.color;

	// newData.name = document.querySelector(".user-name p").textContent;
	// newData.picture = document.querySelector(".user-picture img").src;
	newData.theme = (() => {
		let test = document.querySelector(".theme-icon");
		return test.classList.contains("theme-system")
			? "system"
			: test.classList.contains("theme-light")
			? "light"
			: "dark";
	})();

	appData.theme = newData.theme;

	// newData.color = getAccentColorNumber();

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

let acc = localStorage.getItem("active");
loadApp(acc);
window.addEventListener("storage", () => {
	openToday(todoItemList);
});
