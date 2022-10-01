import category, { categories } from "./category";
import { appData, loadApp, storeData, updateLocalStorage } from "./data";
import {
	createSvgIcon,
	dayAndNightIcon,
	dayIcon,
	dotsHorizontal,
	nightIcon,
} from "./icons";
import { updateMediaQuery } from "./media-query";
import tag, { tags } from "./tag";
import todo, { todoItemList } from "./todo-items";
import {
	createTaskCard,
	expandedCardCheckListItem,
	expandCard,
	settingsPageContainer,
} from "./view";

// Colors
let colors = getColors;
function getColors() {
	let colors = {};
	const html = getComputedStyle(document.querySelector("html"));
	const accent = html.getPropertyValue("--color-3");
	colors["Inbox"] = accent;
	for (let i = 0; i < categories.length; i++) {
		const element = categories[i];
		colors[element.getCategoryName()] = element.getCategoryColor();
	}
	return colors;
}

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

// Theme Switcher
// media query for default theme
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
// media query event
prefersDark.addEventListener("change", (e) => {
	systemTheme(e.matches);
});
// load default theme
systemTheme(prefersDark.matches);
// update Storage
function updateStorage() {
	let data = JSON.stringify(storeData());
	let active = localStorage.getItem("active");

	localStorage.setItem(`${active}`, `${data}`);
}
// Event to load & select theme
document.addEventListener("click", (e) => {
	loadTheme(e);
	selectTheme(e);

	// Show Users
	if (e.target.classList.contains("user-name")) {
		loadUsers();
	} else {
		let users = document.querySelector(".user-name .list");
		document
			.querySelector(".user-name .span-icon")
			.classList.remove("rotate90");
		users.style.height = "0";
		setTimeout(() => {
			users.style.opacity = 0;
			users.style.visibility = "hidden";
		}, 300);
	}
	// Change Users
	if (e.target.classList.contains("users")) {
		let username = e.target.firstElementChild.textContent.toLowerCase();

		console.log(username);

		console.log(appData.active);
		appData.active = username;
		console.log(appData.active);
		// updateStorage()

		// Remove previous projects and tags
		const ul = document.querySelector(".project-ul");
		ul.replaceChildren();
		const ul1 = document.querySelector(".tag-ul");
		ul1.replaceChildren();


		localStorage.setItem("active", `${username}`);
		loadApp();
	}

	// Expand User Picture
	if (e.target.classList.contains("user-picture")) {
		app.append(expandImage("user-picture"));
		let blur = document.querySelector(".e-card-blur");
		blur.addEventListener("click", (e) => {
			if (
				e.target.classList.contains("e-card-blur") ||
				e.target.classList.contains("e-card__close")
			) {
				blur.remove();
			}
		});
	}
});
// Image function
function expandImage(e) {
	const pic = document.querySelector(`.${e} img`);
	const bg = document.createElement("div");
	bg.classList = "e-card-blur";
	const imgContainer = document.createElement("div");
	imgContainer.classList = "expanded-image e-card-bg";
	console.log(pic.src);
	const image = new Image();
	image.src = pic.src;
	image.alt = "User Image";
	imgContainer.appendChild(image);
	bg.appendChild(imgContainer);

	const eCardClose = document.createElement("div");
	eCardClose.classList = "e-card__close btn";
	const eCardCloseIcon = "M6 18L18 6M6 6l12 12";
	createSvgIcon(eCardClose, eCardCloseIcon);
	imgContainer.appendChild(eCardClose);
	return bg;
}
// Users functions
const loadUsers = (e) => {
	let users = document.querySelector(".user-name .list");
	let u = document.querySelector(".user-name ul");

	document.querySelector(".user-name .span-icon").classList.toggle("rotate90");

	if (users.clientHeight <= 10) {
		users.style.height = "10.4rem";
		users.style.opacity = 1;
		users.style.visibility = "visible";
		// Array.from(
		// 	document.querySelectorAll(".user-name li").forEach((e) => {
		// 		e.textContent;
		// 	})
		// );
	} else {
		users.style.height = "0";
		setTimeout(() => {
			users.style.opacity = 0;
			users.style.visibility = "hidden";
		}, 300);
	}
};

// Theme functions
const loadTheme = (e) => {
	let theme = document.querySelector(".theme .list");

	if (e.target.classList.contains("theme")) {
		if (theme.clientHeight <= 10) {
			theme.style.height = "11rem";
			theme.style.opacity = 1;
			theme.style.visibility = "visible";
		} else {
			theme.style.height = "0";
			setTimeout(() => {
				theme.style.opacity = 0;
				theme.style.visibility = "hidden";
			}, 300);
		}
	} else {
		theme.style.height = "0";
		setTimeout(() => {
			theme.style.opacity = 0;
			theme.style.visibility = "hidden";
		}, 300);
	}
};

const selectTheme = (e) => {
	if (e.target.classList.contains("theme-dark")) {
		darkTheme();
		updateStorage();
	} else if (e.target.classList.contains("theme-light")) {
		lightTheme();
		updateStorage();
	} else if (e.target.classList.contains("theme-system")) {
		systemTheme(prefersDark.matches);
		updateStorage();
	}
};
export function autoTheme(theme) {
	theme === "light"
		? lightTheme()
		: theme === "dark"
		? darkTheme()
		: systemTheme();
}
function systemTheme(isDark) {
	const doc = document.querySelector("html");
	const icon = document.querySelector(".theme-icon");
	const path = document.querySelector(".theme-icon path");
	path.setAttribute("d", dayAndNightIcon);
	icon.classList = "theme-icon theme-system";
	if (isDark) {
		doc.dataset.theme = "dark";
	} else doc.dataset.theme = "light";
}
function darkTheme() {
	const doc = document.querySelector("html");
	const icon = document.querySelector(".theme-icon");
	const path = document.querySelector(".theme-icon path");
	doc.dataset.theme = "dark";
	path.setAttribute("d", nightIcon);
	icon.classList = "theme-icon theme-dark";
}
function lightTheme() {
	const doc = document.querySelector("html");
	const icon = document.querySelector(".theme-icon");
	const path = document.querySelector(".theme-icon path");
	doc.dataset.theme = "light";
	path.setAttribute("d", dayIcon);
	icon.classList = "theme-icon theme-light";
}

// Main Events
addBtn.addEventListener("click", () => {
	buttonFunction();
});
overview.addEventListener("click", () => {
	openOverview(todoItemList);
});
today.addEventListener("click", () => {
	openToday(todoItemList);
});
inbox.addEventListener("click", () => {
	openInbox(todoItemList);
});
projectList.addEventListener("click", () => {
	toggleProject(categories);
});
tagList.addEventListener("click", () => {
	renderTags(tags);
});
searchBar.addEventListener("input", (e) => {
	displaySearch(e);
});
settings.addEventListener("click", (e) => {
	app.append(settingsPageContainer());
	let set = document.querySelector(".settings-page-bg");
	set.addEventListener("click", (e) => {
		if (e.target.classList.contains("settings__header-close")) {
			set.remove();
		}
	});
});
document
	.querySelector(".project-okay-btn")
	.addEventListener("click", addProject);

document.querySelector(".tag-okay-btn").addEventListener("click", addTag);

// Overview
export function openOverview(arr) {
	title = "Overview";

	clearAllAddedStyle();
	collapseTagMenu();
	collapseProjectMenu();
	overview.classList.add("selected-menu");
	header.textContent = "All Tasks";

	const btn = function () {
		todo().createTodoItem();

		expandView(todoItemList.length - 1);
		addTodoEvent(todoItemList[todoItemList.length - 1]);
	};
	buttonFunction = btn;
	currentArray = () => todoItemList;
	displayTodo(arr);
}

// Today Display
export function openToday(arr) {
	title = "Today";
	clearAllAddedStyle();
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

		expandView(todoItemList.length - 1);
		addTodoEvent(todoItemList[todoItemList.length - 1], todoItemList);
	};
	buttonFunction = btn;
	currentArray = filtered;

	displayTodo(currentArray());
}

// Inbox Display
export function openInbox(arr) {
	title = "Inbox";
	clearAllAddedStyle();
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

		expandView(todoItemList.length - 1);
		addTodoEvent(todoItemList[todoItemList.length - 1], todoItemList);
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
	collapseTagMenu();

	if (projectUlCon.style.display === "none") {
		projectUlCon.style.display = "block";
		projectBtn.style.marginTop =
			projectUl.getBoundingClientRect().height + 10 + "px";
		projectList.style.marginBottom = "15px";
		openProject();
	} else {
		projectUlCon.style.display = "none";
		projectList.style.marginBottom = "25px";
	}
}

export function showProjectList(arr) {
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
				clearAllAddedStyle();

				const name = categories[index].getCategoryName();
				title = "Project: " + name;
				header.textContent = title;
				element.classList.add("selected-menu");

				let filtered = function () {
					return todoItemList.filter((e) => {
						return e.getCategory() === name;
					});
				};

				const btn = function () {
					todo().createTodoItem();
					todoItemList[todoItemList.length - 1].setCategory(name);

					expandView(todoItemList.length - 1);
					addTodoEvent(todoItemList[todoItemList.length - 1]);
				};
				buttonFunction = btn;
				currentArray = filtered;
				displayTodo(filtered());
			});
		}
	);
}

// Add Project Button
function addProject() {
	const ul = document.querySelector(".project-ul");
	let name = document.querySelector(".add-project-btn .add-input").value;
	let color = document.querySelector(".add-project-btn .color-selector").value;

	category().createCategory(name, color);
	ul.replaceChildren();

	showProjectList(categories);
	openProject();
	updateStorage();
}

// Tag Display
function renderTags(arr) {
	const tagUl = document.querySelector(".tag-ul");
	const tagBtn = document.querySelector(".add-tag-btn");
	const tagUlCon = document.querySelector(".tag-ul-container");
	collapseProjectMenu();

	if (tagUlCon.style.display === "none") {
		tagUlCon.style.display = "block";
		tagBtn.style.marginTop = tagUl.getBoundingClientRect().height + 10 + "px";
		tagList.style.marginBottom = "15px";
		openTag();
	} else {
		tagUlCon.style.display = "none";
		tagList.style.marginBottom = "25px";
	}
}
export function loopTags(array) {
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
	Array.from(document.querySelectorAll(".tag-ul li")).forEach(
		(element, index) => {
			element.addEventListener("click", (e) => {
				clearAllAddedStyle();

				const filtered = () => {
					const filteredArr = [];
					todoItemList.forEach((e, i) => {
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

				const name = tags[index].getTagName();
				title = "Tag: " + name;
				header.textContent = title;
				element.classList.add("tag-selected");

				const btn = function () {
					todo().createTodoItem();
					todoItemList[todoItemList.length - 1].addTag(name);

					expandView(todoItemList.length - 1);
					addTodoEvent(todoItemList[todoItemList.length - 1]);
				};
				buttonFunction = btn;
				currentArray = filtered;
				displayTodo(filtered());
			});
		}
	);
}

// Add Tag Button
function addTag(params) {
	const ul = document.querySelector(".tag-ul");
	let name = document.querySelector(".add-tag-btn .add-input").value;

	tag().createTag(name);
	ul.replaceChildren();

	loopTags(tags);
	openTag();
	updateStorage();
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
		updateStorage();
	}
	// Update tasks count
	document.querySelector(".list-heading span").textContent = count1;

	document.querySelector(".completed-tasks-list span").textContent = count2;

	// Add event listener to all cards
	let cards = Array.from(document.querySelectorAll(".card"));
	cards.forEach((e, index) => {
		e.addEventListener("click", (m) => {
			if (m.target.classList.contains("outer-check")) {
				for (let i = todoItemList.length - 1; i >= 0; i--) {
					const arrayId = todoItemList[i].getUniqueId();
					const filteredId = e.dataset.pos;
					if (filteredId === arrayId) {
						todoItemList[i].toggleStatus();
						cards[index].classList.toggle("completed");
						setTimeout(() => {
							displayTodo(currentArray());
						}, 1000);

						break;
					}
				}
			} else {
				for (let i = todoItemList.length - 1; i >= 0; i--) {
					const arrayId = todoItemList[i].getUniqueId();
					const filteredId = e.dataset.pos;
					if (filteredId === arrayId) {
						expandView(i);
						break;
					}
				}
			}
		});
	});
	updateMediaQuery();
}

// Completed tasks list
document
	.querySelector(".completed-tasks-list .list-heading")
	.addEventListener("click", () => {
		let c = document.querySelector(".completed-tasks");
		let d = document.querySelector(".completed-tasks-list");

		document
			.querySelector(".completed-icon .span-icon")
			.classList.toggle("rotate90");
		if (d.clientHeight === 45) {
			d.style.height = 55 + c.getBoundingClientRect().height + "px";
		} else d.style.height = 45 + "px";
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
		todoItemList.pop();
		card.remove();
	});
	closeBtn.addEventListener("click", () => {
		todoItemList.pop();
		card.remove();
	});
}

function toggleLoadCategory() {
	const category = document.querySelector(".e-card__category");
	const cate = document.querySelector(".e-card__category .list");

	document
		.querySelector(".e-card__category .span-icon")
		.classList.toggle("rotate90");
	let u = document.querySelector(".e-card__category ul");

	if (cate.clientHeight <= 10) {
		cate.style.height = `${
			u.getBoundingClientRect().height + cate.clientHeight
		}px`;
		cate.style.opacity = 1;
		cate.style.visibility = "visible";
	} else {
		cate.style.height = "0";
		setTimeout(() => {
			cate.style.opacity = 0;
			cate.style.visibility = "hidden";
		}, 300);
	}
}

function toggleLoadTags() {
	const tag = document.querySelector(".tag-list-btn");
	const cate = document.querySelector(".tag-list-btn .list");

	// document
	// 	.querySelector(".tag-list-btn .span-icon")
	// 	.classList.toggle("rotate90");

	let u = document.querySelector(".tag-list-btn ul");

	if (cate.clientHeight <= 10) {
		cate.style.height = `${
			u.getBoundingClientRect().height + cate.clientHeight
		}px`;
		cate.style.opacity = 1;
		cate.style.visibility = "visible";
	} else {
		cate.style.height = "0";
		setTimeout(() => {
			cate.style.opacity = 0;
			cate.style.visibility = "hidden";
		}, 300);
	}
}

// Expanded Card Events
function expandCardEvents(a) {
	const todo = todoItemList[a];
	const card = document.querySelector(".e-card-blur");
	const eCard = document.querySelector(".e-card-bg");
	const oldTodoChecklists = JSON.parse(JSON.stringify(todo.getCheckLists()));
	const oldTodoTags = JSON.parse(JSON.stringify(todo.getTags()));

	const ul = document.querySelector(".e-card__category .list");
	const ul2 = document.querySelector(".tag-list-btn .list");
	const spanIcon = document.querySelector(".e-card__category .span-icon");

	// EVENTS
	eCard.addEventListener("click", function (e) {
		// CATEGORY
		// Show Categories
		if (e.target.classList.contains("e-card__category")) {
			toggleLoadCategory();
		} else if (!e.target.classList.contains("e-card__category")) {
			ul.style.height = "0";
			setTimeout(() => {
				ul.style.opacity = 0;
				ul.style.visibility = "hidden";
			}, 300);

			spanIcon.classList.remove("rotate90");
		}
		// Select Category
		if (e.target.classList.contains("e-card__category-item")) {
			const category = document.querySelector(".e-card__category");
			const categoryText = document.querySelector(".e-card__category p");

			category.style.outlineColor = colors()[e.target.textContent];
			categoryText.textContent = e.target.textContent + "";
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
			todoItemList.splice(a, 1);
			displayTodo(currentArray());
			card.remove();
		}

		// TAGS
		// Toggle tag list
		if (e.target.classList.contains("tag-list-btn")) {
			toggleLoadTags();
		} else if (!e.target.classList.contains("tag-list-btn")) {
			ul2.style.height = "0";
			setTimeout(() => {
				ul2.style.opacity = 0;
				ul2.style.visibility = "hidden";
			}, 300);
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
			ul2.style.height = "0";
			setTimeout(() => {
				ul2.style.opacity = 0;
				ul2.style.visibility = "hidden";
			}, 300);
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

			syncChecklists();

			for (let i = list.length - 1; i >= 0; i--) {
				if (parentId === list[i].uniqueId) {
					list[i].status = list[i].status === true ? false : true;
					// list[i].description = e.target.nextSibling.value;

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

			syncChecklists();

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

			syncChecklists();

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
	function syncChecklists() {
		const list = todo.getCheckLists();
		const tasks = document.querySelectorAll(".e-card__todo-item input");
		let arr = [];
		Array.from(tasks).forEach((e) => {
			arr.unshift(e.value || "");
		});
		list.forEach((e, i) => {
			list[i].description = arr[i];
		});
	}
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
	app.append(expandCard(todoItemList[e], colors(), categories, tags));
	expandCardEvents(e);
}

function clearAddedStyle(array, className) {
	array.forEach((element) => {
		element.classList.remove(className);
	});
}
function clearAllAddedStyle() {
	const projectMenu = document.querySelectorAll(".project-ul li");
	const tagsElement = document.querySelectorAll(".tag-ul li");
	clearAddedStyle(tagsElement, "tag-selected");
	clearAddedStyle(projectMenu, "selected-menu");
	clearAddedStyle(menu, "selected-menu");
}

function collapseProjectMenu() {
	const projectUlCon = document.querySelector(".project-ul-container");
	const ul = document.querySelector(".project-ul");
	if (projectUlCon) {
		projectUlCon.style.display = "none";
		// ul.replaceChildren();
		projectList.style.marginBottom = "25px";
	}
}
function collapseTagMenu() {
	const tagUl = document.querySelector(".tag-ul");
	const tagList = document.querySelector(".tags");
	const tagUlCon = document.querySelector(".tag-ul-container");
	if (tagUlCon) {
		tagUlCon.style.display = "none";
		// tagUl.replaceChildren();
		tagList.style.marginBottom = "25px";
	}
}

// Search Function
function displaySearch(e) {
	const time = document.querySelector(".sort-time");
	const button = document.querySelector(".btn-div");
	const searchTerm = e.target.value.toLowerCase();

	const filtered = () =>
		todoItemList.filter((e) => {
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
