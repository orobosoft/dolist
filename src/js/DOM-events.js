import category, { categories } from "./category";
import { createSvgIcon, dotsHorizontal } from "./icons";
import tag, { tags } from "./tag";
import todo, { todoItemList } from "./todo-items";
import {
	createTaskCard,
	expandedCardCheckListItem,
	expandCard,
	renderAside,
	renderMain,
} from "./view";

// Initial Load
app.append(renderAside(), renderMain());

// Colors
let colors = getColors;
function getColors() {
	let colors = {};
	colors["Inbox"] = "#6aa7b3";
	for (let i = 0; i < categories.length; i++) {
		const element = categories[i];
		colors[element.getCategoryName()] = element.getCategoryColor();
	}
	return colors;
}

// Data Properties
const tagArray = tags;
const todoArray = todoItemList;
const categoryArray = categories;

let currentArray;
let searchArray;
let buttonFunction;
let title;

const menu = document.querySelectorAll("menu li");
const overview = document.querySelector("#overview");
const today = document.querySelector("#today");
const inbox = document.querySelector("#inbox");
const projectList = document.querySelector("#projects");
const tagList = document.querySelector("#tags");
const settings = document.querySelector("#settings");

const searchBar = document.querySelector("#search-bar");
const header = document.querySelector(".title h2");
const addBtn = document.querySelector(".btn-add");

const unCompletedList = document.querySelector(".uncompleted-tasks");
const completedList = document.querySelector(".completed-tasks");

// Main Events
addBtn.addEventListener("click", () => {
	buttonFunction();
});
overview.addEventListener("click", () => {
	openOverview(todoArray);
});
today.addEventListener("click", () => {
	openToday(todoArray);
});
inbox.addEventListener("click", () => {
	openInbox(todoArray);
});
projectList.addEventListener("click", () => {
	toggleProject(categoryArray);
});
tagList.addEventListener("click", () => {
	renderTags(tagArray);
});
searchBar.addEventListener("input", (e) => {
	displaySearch(e);
});
document
	.querySelector(".project-okay-btn")
	.addEventListener("click", addProject);

document.querySelector(".tag-okay-btn").addEventListener("click", addTag);

// Overview
export function openOverview(arr) {
	title = "Overview";

	clearAddedStyle(menu, "selected-menu");
	collapseTagMenu();
	collapseProjectMenu();
	overview.classList.add("selected-menu");
	header.textContent = "All Tasks";

	const btn = function () {
		todo().createTodoItem();

		expandView(todoArray.length - 1);
		addTodoEvent(todoArray[todoArray.length - 1]);
	};
	buttonFunction = btn;
	currentArray = () => todoArray;
	displayTodo(arr);
}

// Today Display
export function openToday(arr) {
	title = "Today";
	clearAddedStyle(menu, "selected-menu");
	collapseTagMenu();
	collapseProjectMenu();
	header.textContent = "Today";
	today.classList.add("selected-menu");

	let currDate = getCurrentDate();
	const filtered = () =>
		arr.filter((e) => {
			return e.getDueDate() === currDate;
		});

	const btn = function () {
		todo().createTodoItem();

		expandView(todoArray.length - 1);
		addTodoEvent(todoArray[todoArray.length - 1], todoArray);
	};
	buttonFunction = btn;
	currentArray = filtered;

	displayTodo(currentArray());
}

// Inbox Display
function openInbox(arr) {
	title = "Inbox";
	clearAddedStyle(menu, "selected-menu");
	collapseTagMenu();
	collapseProjectMenu();
	header.textContent = "Inbox";
	inbox.classList.add("selected-menu");

	const filtered = () =>
		arr.filter((e) => {
			return e.getCategory() === "Inbox";
		});

	const btn = function () {
		todo().createTodoItem();

		expandView(todoArray.length - 1);
		addTodoEvent(todoArray[todoArray.length - 1], todoArray);
	};
	buttonFunction = btn;
	currentArray = filtered;

	displayTodo(currentArray());
}

// Project Display
function toggleProject(arr) {
	const projectUl = document.querySelector(".project-ul");
	const projectBtn = document.querySelector(".add-project-btn");
	const projectUlCon = document.querySelector(".project-ul-container");
	const ul = document.querySelector(".project-ul");
	collapseTagMenu();

	if (projectUlCon.style.display === "none") {
		showProjectList(arr);
		projectUlCon.style.display = "block";
		projectBtn.style.marginTop =
			projectUl.getBoundingClientRect().height + 10 + "px";
		projectList.style.marginBottom = "15px";
		openProject();
	} else {
		projectUlCon.style.display = "none";
		projectList.style.marginBottom = "25px";
		ul.replaceChildren();
	}
}

function showProjectList(arr) {
	const ul = document.querySelector(".project-ul");

	for (let i = 0; i < arr.length; i++) {
		const e = arr[i];
		const li = createInnerList(e.getCategoryName(), e.getCategoryColor());
		ul.append(li);
	}
}
function createInnerList(name, color) {
	const li = document.createElement("li");
	const c = document.createElement("div");
	c.style.backgroundColor = color;
	const liText = document.createElement("p");
	liText.textContent = name;
	li.append(c, liText);
	return li;
}
function openProject() {
	Array.from(document.querySelectorAll(".project-ul li")).forEach(
		(element, index) => {
			element.addEventListener("click", () => {
				const projectMenu = document.querySelectorAll(".project-ul li");

				clearAddedStyle(menu, "selected-menu");
				clearAddedStyle(projectMenu, "selected-menu");

				const name = categories[index].getCategoryName();
				title = "Project: " + name;
				header.textContent = title;
				element.classList.add("selected-menu");

				let filtered = function () {
					return todoArray.filter((e) => {
						return e.getCategory() === name;
					});
				};

				const btn = function () {
					todo().createTodoItem();
					todoArray[todoArray.length - 1].setCategory(name);

					expandView(todoArray.length - 1);
					addTodoEvent(todoArray[todoArray.length - 1]);
				};
				buttonFunction = btn;
				currentArray = filtered;
				displayTodo(filtered());
			});
		}
	);
}

// Add Project Button
function addProject(params) {
	const ul = document.querySelector(".project-ul");
	let name = document.querySelector(".add-project-btn .add-input").value;
	let color = document.querySelector(".add-project-btn .color-selector").value;

	category().createCategory(name, color);
	ul.replaceChildren();

	showProjectList(categoryArray);
	openProject();
}

// Tag Display
function renderTags(arr) {
	const tagUl = document.querySelector(".tag-ul");
	const tagBtn = document.querySelector(".add-tag-btn");
	const tagUlCon = document.querySelector(".tag-ul-container");
	collapseProjectMenu();

	if (tagUlCon.style.display === "none") {
		loopTags(arr);
		tagUlCon.style.display = "block";
		tagBtn.style.marginTop = tagUl.getBoundingClientRect().height + 10 + "px";
		tagList.style.marginBottom = "15px";
		openTag();
	} else {
		tagUlCon.style.display = "none";
		tagList.style.marginBottom = "25px";
		tagUl.replaceChildren();
	}
}
function loopTags(array) {
	const tagUl = document.querySelector(".tag-ul");

	for (let i = 0; i < array.length; i++) {
		const item = array[i].getTagName();
		const li = document.createElement("li");
		li.textContent = item;
		tagUl.append(li);
	}
}
// Display the tag todo
function openTag() {
	const tags = document.querySelectorAll(".tag-ul li");
	Array.from(tags).forEach((element, index) => {
		element.addEventListener("click", (e) => {
			clearAddedStyle(menu, "selected-menu");
			clearAddedStyle(tags, "tag-selected");

			const filtered = () => {
				const filteredArr = [];
				todoArray.forEach((e, i) => {
					const t = e.getTags();
					for (let n = 0; n < t.length; n++) {
						if (t[n] === name) {
							filteredArr.push(e);
							break;
						}
					}
				});
				return filteredArr;
			};

			const name = tagArray[index].getTagName();
			title = "Tag: " + name;
			header.textContent = title;
			element.classList.add("tag-selected");

			const btn = function () {
				todo().createTodoItem();
				todoArray[todoArray.length - 1].addTag(name);

				expandView(todoArray.length - 1);
				addTodoEvent(todoArray[todoArray.length - 1]);
			};
			buttonFunction = btn;
			currentArray = filtered;
			displayTodo(filtered());
		});
	});
}

// Add Tag Button
function addTag(params) {
	const ul = document.querySelector(".tag-ul");
	let name = document.querySelector(".add-tag-btn .add-input").value;

	tag().createTag(name);
	ul.replaceChildren();

	loopTags(tagArray);
	openTag();
}

// Display TODO
function displayTodo(array) {
	// Clear previous todo
	unCompletedList.replaceChildren();
	completedList.replaceChildren();

	let count1 = 0;
	let count2 = 0;

	for (let i = array.length - 1; i >= 0; i--) {
		let e = array[i];
		if (e.getStatus() === true) {
			count1++;
			const card = createTaskCard(e, colors());
			card.setAttribute("data-pos", `${e.getUniqueId()}`);
			unCompletedList.append(card);
			card.classList.remove("completed");
		} else {
			count2++;
			const card = createTaskCard(e, colors());
			card.setAttribute("data-pos", `${e.getUniqueId()}`);
			completedList.append(card);
			card.classList.add("completed");
		}
	}
	// Update tasks count
	document.querySelector(".list-heading span").textContent = count1;

	document.querySelector(".completed-tasks-list span").textContent = count2;

	// Add event listener to all cards
	let cards = Array.from(document.querySelectorAll(".card"));
	cards.forEach((e, index) => {
		e.addEventListener("click", (m) => {
			if (m.target.classList.contains("outer-check")) {
				for (let i = todoArray.length - 1; i >= 0; i--) {
					const arrayId = todoArray[i].getUniqueId();
					const filteredId = e.dataset.pos;
					if (filteredId === arrayId) {
						todoArray[i].toggleStatus();
						cards[index].classList.toggle("completed");
						setTimeout(() => {
							displayTodo(currentArray());
						}, 1000);

						break;
					}
				}
			} else {
				for (let i = todoArray.length - 1; i >= 0; i--) {
					const arrayId = todoArray[i].getUniqueId();
					const filteredId = e.dataset.pos;
					if (filteredId === arrayId) {
						expandView(i);
						break;
					}
				}
			}
		});
	});
}

document
	.querySelector(".completed-tasks-list .list-heading")
	.addEventListener("click", () => {
		let c = document.querySelector(".completed-tasks");

		document
			.querySelector(".completed-icon .span-icon")
			.classList.toggle("rotate90");

		if (c.style.display === "none" || c.style.display === "") {
			c.style.display = "flex";
		} else if (c.style.display === "flex") {
			c.style.display = "none";
		}
	});

// Add New Item Event
// Add btn

// Add Todo Function
function addTodoEvent(e) {
	const cancelBtn = document.querySelector(".e-card__cancel");
	const closeBtn = document.querySelector(".e-card__close");
	const saveBtn = document.querySelector(".e-card__save");
	const card = document.querySelector(".e-card-blur");
	cancelBtn.addEventListener("click", () => {
		todoArray.pop();
		card.remove();
	});
	closeBtn.addEventListener("click", () => {
		todoArray.pop();
		card.remove();
	});
}

function toggleLoadCategory() {
	const category = document.querySelector(".e-card__category");
	const ul = document.querySelector(".e-card__category-container");

	document
		.querySelector(".e-card__category .span-icon")
		.classList.toggle("rotate90");

	if (ul.style.display === "flex") {
		setTimeout(() => {
			ul.style.display = "none";
			ul.replaceChildren();
		}, 150);
	} else if (ul.style.display === "none" || ul.style.display === "") {
		const li = document.createElement("li");
		li.classList = "e-card__category-item";
		li.textContent = "Inbox";
		li.style.outlineColor = colors()[li.textContent];
		ul.appendChild(li);
		categoryArray.forEach((e) => {
			const li = document.createElement("li");
			li.classList = "e-card__category-item";
			li.textContent = e.getCategoryName();
			li.style.outlineColor = colors()[li.textContent];
			ul.appendChild(li);
		});
		setTimeout(() => {
			ul.style.display = "flex";
		}, 150);
	}
}

function toggleLoadTags() {
	const tag = document.querySelector(".tag-list-btn");
	const ul = document.querySelector(".e-card__tag-container");

	if (ul.style.display === "flex") {
		setTimeout(() => {
			ul.style.display = "none";
			ul.replaceChildren();
		}, 150);
	} else if (ul.style.display === "none" || ul.style.display === "") {
		tagArray.forEach((e) => {
			const li = document.createElement("li");
			li.classList = "tag-list-item";
			li.textContent = e.getTagName();
			ul.appendChild(li);
		});
		setTimeout(() => {
			ul.style.display = "flex";
		}, 150);
	}
}

// Expanded Card Events
function expandCardEvents(a) {
	const todo = todoArray[a];
	const card = document.querySelector(".e-card-blur");
	const eCard = document.querySelector(".e-card-bg");
	const oldTodoChecklists = JSON.parse(JSON.stringify(todo.getCheckLists()));
	const oldTodoTags = JSON.parse(JSON.stringify(todo.getTags()));

	const ul = document.querySelector(".e-card__category-container");
	const ul2 = document.querySelector(".e-card__tag-container");
	const spanIcon = document.querySelector(".e-card__category .span-icon");

	eCard.addEventListener("click", function (e) {
		// CATEGORY
		// Show Categories
		if (e.target.classList.contains("e-card__category")) {
			toggleLoadCategory();
		} else if (!e.target.classList.contains("e-card__category")) {
			setTimeout(() => {
				ul.style.display = "none";
				ul.replaceChildren();
			}, 150);

			spanIcon.classList.remove("rotate90");
		}
		// Select Category
		if (e.target.classList.contains("e-card__category-item")) {
			const category = document.querySelector(".e-card__category");
			const categoryText = document.querySelector(".e-card__category p");

			category.style.outlineColor = colors()[e.target.textContent];
			categoryText.textContent = e.target.textContent + "";
			ul.style.display = "none";
			ul.replaceChildren();
		}

		// EXIT E-CARD
		if (e.target.classList.contains("e-card__cancel")) {
			card.remove();
			todo.setCheckLists(oldTodoChecklists);
			todo.setTags(oldTodoTags);
		}
		if (e.target.classList.contains("e-card__close")) {
			card.remove();
			todo.setCheckLists(oldTodoChecklists);
			todo.setTags(oldTodoTags);
		}
		// SAVE
		if (e.target.classList.contains("e-card__save")) {
			saveCardItem(todo);
			if (searchArray) {
				displayTodo(searchArray());
			} else {
				displayTodo(currentArray());
			}
			card.remove();
		}
		// DELETE todo
		if (e.target.classList.contains("e-card__delete")) {
			todoArray.splice(a, 1);
			displayTodo(currentArray());
			card.remove();
		}

		// TAGS
		// Toggle tag list
		if (e.target.classList.contains("tag-list-btn")) {
			toggleLoadTags();
		} else if (!e.target.classList.contains("tag-list-btn")) {
			ul2.style.display = "none";
			ul2.replaceChildren();
		}
		// Select Tag
		if (e.target.classList.contains("tag-list-item")) {
			const tags = document.querySelector(".e-card__tag-value");
			todo.addTag(e.target.textContent);
			tags.replaceChildren();
			todo.getTags().forEach((e, i) => {
				const tag = document.createElement("span");
				tag.classList = "e-card__tag-item";
				tag.textContent = e;

				if (i < 5) {
					tags.append(tag);
				} else if (i === 5) {
					const p = document.createElement("span");
					p.classList = "expand-tags ellipsis";
					createSvgIcon(p, dotsHorizontal);
					tags.appendChild(p);
				}
			});
			ul2.style.display = "none";
			ul2.replaceChildren();
		}

		// // Delete checklist item
		// if (e.target.classList.contains("e-card__todo-delete")) {
		// 	const list = todo.getCheckLists();
		// 	for (let i = 0; i < list.length; i++) {
		// 		if (parentId === list[i].uniqueId) {
		// 			list.splice(i, 1);
		// 			cardList.replaceChildren();
		// 			list.forEach((e) => {
		// 				cardList.appendChild(expandedCardCheckListItem(e));
		// 			});
		// 		}
		// 	}
		// }
		// // Add checklist item
		// if (e.target.classList.contains("e-card__todo-add")) {
		// 	// todo.addCheckList();
		// 	cardList.replaceChildren();
		// 	list.forEach((e) => {
		// 		cardList.appendChild(expandedCardCheckListItem(e));
		// 	});
		// }

		// CHECKLIST

		// Toggle complete checklist item
		if (e.target.classList.contains("e-card__todo-check")) {
			const parentId = e.target.parentNode.dataset.pos;
			const cardList = document.querySelector(".e-card__todo-list");
			const list = todo.getCheckLists();
			for (let i = 0; i < list.length; i++) {
				if (parentId === list[i].uniqueId) {
					list[i].status = list[i].status === true ? false : true;
					list[i].description = e.target.nextSibling.value;

					cardList.replaceChildren();
					// list.forEach((e) => {
					// 	cardList.appendChild(expandedCardCheckListItem(e));
					// });
					for (let i = list.length - 1; i >= 0; i--) {
						const e = list[i];
						cardList.appendChild(expandedCardCheckListItem(e));
					}
				}
			}
		}
		// Delete checklist item
		if (e.target.classList.contains("e-card__todo-delete")) {
			const list = todo.getCheckLists();
			const cardList = document.querySelector(".e-card__todo-list");
			const parentId = e.target.parentNode.dataset.pos;

			for (let i = 0; i < list.length; i++) {
				if (parentId === list[i].uniqueId) {
					list.splice(i, 1);
					cardList.replaceChildren();
					// list.forEach((e) => {
					// 	cardList.appendChild(expandedCardCheckListItem(e));
					// });
					for (let i = list.length - 1; i >= 0; i--) {
						const e = list[i];
						cardList.appendChild(expandedCardCheckListItem(e));
					}
				}
			}
		}
		// Add checklist item
		if (e.target.classList.contains("e-card__todo-add")) {
			const list = todo.getCheckLists();

			const cardList = document.querySelector(".e-card__todo-list");

			todo.addCheckList();
			cardList.replaceChildren();
			// list.forEach((e) => {
			// 	cardList.appendChild(expandedCardCheckListItem(e));
			// });
			for (let i = list.length - 1; i >= 0; i--) {
				const e = list[i];
				cardList.appendChild(expandedCardCheckListItem(e));
			}
		}
	});
}

function saveCardItem(item) {
	let project =
		document.querySelector(".e-card__category p").textContent ||
		document.querySelector(".e-card__category p").innerText;
	let title = document.querySelector(".e-card__title").value;
	let stats =
		document.querySelector(".e-card__status-value").value === "true"
			? true
			: false;
	let date = document.querySelector(".e-card__date-value").value;
	let priority = document.querySelector(".e-card__priority-value").value;
	let description = document.querySelector(
		".e-card__description-area textarea"
	).value;

	let tagArr = Array.from(document.querySelectorAll(".e-card__tag-item"));
	let tag = [];

	tagArr.forEach((i) => {
		tag.push(i.textContent);
	});

	let listArr = Array.from(document.querySelectorAll(".e-card__todo-item"));

	let checkList = [];
	listArr.forEach((i) => {
		let list = {};
		if (i.classList.contains("completed")) {
			list.status = false;
		} else list.status = true;
		list.description = i.children[1].value;
		checkList.push(list);
	});

	console.log(title);
	console.log(description);
	console.log(date);
	console.log(priority);
	console.log(stats);
	console.log(checkList);

	item.setTitle(title);
	item.setDescription(description);
	item.setDueDate(date);
	item.setPriority(priority);
	item.setCategory(project);
	item.setStatus(stats);
	item.setTags(tag);
	// item.setCheckLists(checkList);
}

// UTILITY FUNCTIONS //

function expandView(e) {
	app.append(expandCard(todoArray[e], colors()));
	expandCardEvents(e);
}

function clearAddedStyle(array, className) {
	array.forEach((element) => {
		element.classList.remove(className);
	});
}

function collapseProjectMenu() {
	const projectUlCon = document.querySelector(".project-ul-container");
	const ul = document.querySelector(".project-ul");
	if (projectUlCon) {
		projectUlCon.style.display = "none";
		ul.replaceChildren();
		projectList.style.marginBottom = "25px";
	}
}
function collapseTagMenu() {
	const tagUl = document.querySelector(".tag-ul");
	const tagList = document.querySelector(".tags");
	const tagUlCon = document.querySelector(".tag-ul-container");
	if (tagUlCon) {
		tagUlCon.style.display = "none";
		tagUl.replaceChildren();
		tagList.style.marginBottom = "25px";
	}
}

// Search Function
function displaySearch(e) {
	const time = document.querySelector(".sort-time");
	const button = document.querySelector(".btn-div");
	const searchTerm = e.target.value.toLowerCase();

	const filtered = () =>
		todoArray.filter((e) => {
			return (
				e.getTitle().toLowerCase().includes(searchTerm) ||
				e.getDescription().toLowerCase().includes(searchTerm)
			);
		});

	if (searchTerm === "") {
		header.textContent = title;
		time.style.display = "";
		button.style.display = "";
		searchArray = false;
		displayTodo(currentArray());
	} else {
		time.style.display = "none";
		button.style.display = "none";
		header.textContent = "Search Result";
		searchArray = filtered;
		displayTodo(searchArray());
	}
}

function getCurrentDate() {
	const date = new Date();
	const day = ("0" + date.getDate()).slice(-2);
	const month = ("0" + date.getMonth()).slice(-2);
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
}

openOverview(todoArray);
