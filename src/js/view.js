import UserImage from "../img/user.jpg";
import {
	createSvgIcon,
	overviewIcon,
	todayIcon,
	inboxIcon,
	projectIcon,
	tagIcon,
	settingsIcon,
	questionIcon,
	notificationIcon,
	searchIcon,
	arrowDownIcon,
	editIcon,
	flagIcon,
	deleteIcon,
	tickIcon,
} from "./icons";
const body = document.querySelector("body");
const app = document.createElement("div");
app.className = "app";
app.id = "app";
body.appendChild(app);

// Aside Section
function renderAside() {
	const aside = document.createElement("aside");
	aside.classList = "aside";

	// Logo div
	const logo = document.createElement("div");
	logo.className = "logo";
	const logoText = document.createElement("h1");
	logoText.textContent = ".dolist";
	logo.appendChild(logoText);

	// Nav menu
	const nav = document.createElement("nav");
	nav.classList = "nav";
	const menu = document.createElement("menu");
	nav.appendChild(menu);

	function createList(name, iconPath) {
		const i = document.createElement("li");
		const iIcon = createSvgIcon(i, iconPath);
		const iText = document.createElement("p");
		iText.textContent = name;
		i.append(iIcon, iText);
		return i;
	}

	const overview = createList("Overview", overviewIcon);
	const today = createList("Today", todayIcon);
	const inbox = createList("Inbox", inboxIcon);
	const project = createList("Projects", projectIcon);
	const tags = createList("Tags", tagIcon);

	menu.append(overview, today, inbox, project, tags);

	const extra = document.createElement("div");
	extra.className = "extra";

	const extraMenu = document.createElement("menu");
	extra.appendChild(extraMenu);

	const settings = createList("Settings", settingsIcon);
	extraMenu.appendChild(settings);

	aside.append(logo, nav, extra);
	return aside;
}

// MAIN
function renderMain() {
	const main = document.createElement("main");
	main.classList = "main";

	// Header Area
	const header = document.createElement("header");
	header.classList = "header";

	const searchContainer = document.createElement("div");
	searchContainer.classList = "search-container flex";

	const searchLabel = document.createElement("label");
	searchLabel.setAttribute("for", "search");
	createSvgIcon(searchLabel, searchIcon);

	const searchInput = document.createElement("input");
	searchInput.setAttribute("type", "search");
	searchInput.setAttribute("name", "search");
	searchInput.setAttribute("id", "search");
	searchInput.setAttribute("placeholder", "Search");

	searchContainer.append(searchLabel, searchInput);

	const question = document.createElement("div");
	question.classList = "question";
	createSvgIcon(question, questionIcon);

	const notification = document.createElement("div");
	notification.classList = "notification";
	createSvgIcon(notification, notificationIcon);
	// const notificationDot = document.createElement('span');
	// notificationDot.classList = 'notification-dot'
	// notification.appendChild(notificationDot)

	const userName = document.createElement("div");
	userName.classList = "user-name flex";
	const userNameText = document.createElement("p");
	userNameText.textContent = "Orobosa Ikpon";
	userName.appendChild(userNameText);
	createSvgIcon(userName, arrowDownIcon);

	const userPicture = document.createElement("div");
	userPicture.classList = "user-picture";
	const image = new Image();
	image.src = UserImage;
	image.alt = "User Image";
	userPicture.appendChild(image);

	header.append(searchContainer, question, notification, userName, userPicture);

	// Main Section
	const mainSection = document.createElement("section");
	mainSection.classList = "main-section";

	const titleContainer = document.createElement("div");
	titleContainer.classList = "title-container flex";
	const title = document.createElement("div");
	title.classList = "title";
	const titleText = document.createElement("h2");
	titleText.textContent = "Projects";
	title.appendChild(titleText);
	const sortTime = document.createElement("div");
	sortTime.classList = "sort-time flex";
	const sortTimeText = document.createElement("p");
	sortTimeText.textContent = "This Week";
	sortTime.appendChild(sortTimeText);
	createSvgIcon(sortTime, arrowDownIcon);

	// Task Lists
	const tasksList = document.createElement("div");
	tasksList.classList = "tasks-list";

	const heading = document.createElement("div");
	heading.classList = "list-heading flex";
	heading.textContent = "Tasks";
	const titleName = document.createElement("h3");
	const count = document.createElement("span");
	count.textContent = "2";
	heading.append(titleName, count);

	const addBtnDiv = document.createElement("div");
	addBtnDiv.classList = "btn-div";
	const addBtn = document.createElement("button");
	addBtn.classList = "btn btn-add";
	addBtn.textContent = "+";
	addBtnDiv.append(addBtn);
	tasksList.append(heading, addBtnDiv);
	tasksList.append(createTasksListContainer());

	titleContainer.append(title, sortTime);
	mainSection.append(titleContainer, tasksList);
	main.append(header, mainSection);

	return main;
}

app.append(renderAside(), renderMain());

// Task Card
function createTaskCard(
	status = true,
	title,
	description,
	tags = [],
	flag = "none",
	project,
	projectColorCode
) {
	const card = document.createElement("div");
	card.classList = "card flex";

	if (status === false) {
		card.classList.add("completed");
	} else card.classList.remove("completed");

	const cardAside = document.createElement("div");
	cardAside.classList = "card-aside flex";
	const cardMain = document.createElement("div");
	cardMain.classList = "card-main";

	// CheckBox button
	const outerCheck = document.createElement("div");
	outerCheck.classList = "outer-check";
	const innerCheck = document.createElement("div");
	innerCheck.classList = "inner-check";
	createSvgIcon(innerCheck, tickIcon);
	outerCheck.appendChild(innerCheck);
	cardAside.append(outerCheck);

	const cardTitle = document.createElement("h4");
	cardTitle.classList = "card__title";
	cardTitle.textContent = title;
	const cardDescription = document.createElement("p");
	cardDescription.classList = "card__description";
	cardDescription.textContent = description;
	const cardExtras = document.createElement("div");
	cardExtras.classList = "card__extras flex";

	const cardExtrasTags = document.createElement("span");
	cardExtrasTags.classList = "card__tags flex";
	createSvgIcon(cardExtrasTags, tagIcon);

	// loop tags to render all tags
	for (let i = 0; i < tags.length; i++) {
		const element = tags[i];

		const tag = document.createElement("span");
		tag.classList = "card__tag";
		tag.textContent = element;

		cardExtrasTags.append(tag);
	}

	// Priority
	const cardExtrasFlagContainer = document.createElement("div");
	cardExtrasFlagContainer.classList = "card__flag-container flex";
	createSvgIcon(cardExtrasFlagContainer, flagIcon);
	const cardExtrasFlag = document.createElement("span");
	cardExtrasFlag.textContent = flag;
	let flagColor;
	switch (flag) {
		case "high":
			flagColor = "high-priority";
			break;
		case "medium":
			flagColor = "medium-priority";
			break;
		case "low":
			flagColor = "low-priority";
			break;

		default:
			flagColor = "";
			break;
	}
	cardExtrasFlag.classList = `card__flag ${flagColor}`;
	cardExtrasFlagContainer.append(cardExtrasFlag);

	const cardExtrasProject = document.createElement("span");
	cardExtrasProject.classList = "card__project";
	cardExtrasProject.textContent = project;
	const projectColor = document.createElement("div");
	projectColor.classList = "card__project-color";
	projectColor.style.backgroundColor = projectColorCode;

	cardExtras.append(
		cardExtrasTags,
		cardExtrasFlagContainer,
		cardExtrasProject,
		projectColor
	);

	cardMain.append(cardTitle, cardDescription, cardExtras);

	card.append(cardAside, cardMain);
	return card;
}

function createTasksListContainer() {
	const listCardContainer = document.createElement("div");
	listCardContainer.classList = "flex list-card-container";

	// Uncompleted Tasks
	const cardContainer = document.createElement("div");
	cardContainer.classList = "flex card-container";
	listCardContainer.appendChild(cardContainer);

	const uncompletedTasks = document.createElement("div");
	uncompletedTasks.classList = "uncompleted-tasks tasks";

	// Completed Tasks
	const completedTasksList = document.createElement("div");
	completedTasksList.classList = "completed-tasks tasks";
	const completedTasksListHeading = document.createElement("div");
	completedTasksListHeading.classList = "list-heading flex";
	const completedTasksListTitle = document.createElement("h3");
	completedTasksListTitle.textContent = "Completed";
	const completedTasksListCount = document.createElement("span");
	completedTasksListCount.textContent = "5";

	completedTasksListHeading.append(
		completedTasksListTitle,
		completedTasksListCount
	);

	completedTasksList.append(completedTasksListHeading);

	cardContainer.append(uncompletedTasks, completedTasksList);
	return listCardContainer;
}

function expandCard(checkList = ["", "", "", ""]) {
	const blur = document.createElement("div");
	blur.classList = "e-card-blur";

	const background = document.createElement("div");
	background.classList = "e-card-bg";

	blur.appendChild(background);

	const eCardTop = document.createElement("p");
	eCardTop.textContent = "Heading";
	eCardTop.classList = "e-card__top";

	const eCardClose = document.createElement("div");
	eCardClose.classList = "e-card__close btn";
	const eCardCloseIcon = "M6 18L18 6M6 6l12 12";
	createSvgIcon(eCardClose, eCardCloseIcon);

	const eCardHead = document.createElement("div");
	eCardHead.classList = "e-card__header flex";
	const eCardTitle = document.createElement("h1");
	eCardTitle.textContent =
		"Doing something new can be. I dont know how to say it tho";
	eCardTitle.classList = "e-card__title";
	const eCardEdit = document.createElement("div");

	createSvgIcon(eCardEdit, editIcon);
	eCardEdit.classList = "e-card__edit btn";
	const eCardDelete = document.createElement("div");

	createSvgIcon(eCardDelete, deleteIcon);
	eCardDelete.classList = "e-card__delete btn";
	eCardHead.append(eCardTitle, eCardEdit, eCardDelete);

	const eCardStatus = document.createElement("div");
	eCardStatus.classList = "e-card__status flex";
	const eCardStatusName = document.createElement("p");
	eCardStatusName.textContent = "Status";
	eCardStatusName.classList = "e-card__status-name";
	const eCardStatusValue = document.createElement("p");
	eCardStatusValue.textContent = "Pending";
	eCardStatusValue.className = "e-card__status-value";
	eCardStatus.append(eCardStatusName, eCardStatusValue);

	const eCardDate = document.createElement("div");
	eCardDate.classList = "e-card__date flex";
	const eCardDateName = document.createElement("p");
	eCardDateName.textContent = "Date";
	eCardDateName.classList = "e-card__date-name";
	const eCardDateValue = document.createElement("p");
	eCardDateValue.textContent = "12 Sep 2022";
	eCardDateValue.classList = "e-card__date-value";
	eCardDate.append(eCardDateName, eCardDateValue);

	const eCardTag = document.createElement("div");
	eCardTag.classList = "e-card__tag flex";
	const eCardTagName = document.createElement("p");
	eCardTagName.textContent = "Tags";
	eCardTagName.classList = "e-card__tag-name";
	const eCardTagValue = document.createElement("div");
	eCardTagValue.classList = "e-card__tag-value flex";
	eCardTag.append(eCardTagName, eCardTagValue);

	const eCardPriority = document.createElement("div");
	eCardPriority.classList = "e-card__priority flex";
	const eCardPriorityName = document.createElement("p");
	eCardPriorityName.textContent = "Priority";
	eCardPriorityName.classList = "e-card__priority-name";
	const eCardPriorityValue = document.createElement("p");
	eCardPriorityValue.textContent = "Medium";
	eCardPriorityValue.classList = "e-card__priority-value";
	eCardPriority.append(eCardPriorityName, eCardPriorityValue);

	const eCardDescription = document.createElement("h2");
	eCardDescription.textContent = "Description";
	eCardDescription.classList = "e-card__description-title";
	const eCardDescriptionArea = document.createElement("div");
	eCardDescriptionArea.classList = "e-card__description-area";
	const eCardDescriptionText = document.createElement("textarea");
	eCardDescriptionArea.appendChild(eCardDescriptionText);

	// Expanded Card Checklist
	const eCardTodo = document.createElement("h2");
	eCardTodo.textContent = "Check List";
	eCardTodo.classList = "e-card__todo-title";

	const eCardTodoAdd = document.createElement("button");
	eCardTodoAdd.textContent = "Add";
	eCardTodoAdd.classList = "e-card__todo-add";

	const eCardTodoList = document.createElement("div");
	eCardTodoList.classList = "e-card__todo-list";

	// Expanded Card Checklist Item
	function expandedCardCheckListItem(status = true, description) {
		const eCardTodoItem = document.createElement("div");
		eCardTodoItem.classList = "e-card__todo-item flex";

		if (status === false) {
			eCardTodoItem.classList.add("completed");
		} else eCardTodoItem.classList.remove("completed");

		// Check button
		const eCardTodoItemCheck = document.createElement("div");
		eCardTodoItemCheck.classList = "e-card__todo-check";
		const eCardTodoItemCheckOuter = document.createElement("div");
		eCardTodoItemCheckOuter.classList = "e-card__todo-check-outer";
		const eCardTodoItemCheckInner = document.createElement("div");
		eCardTodoItemCheckInner.classList =
			"e-card__todo-check-inner checklist-done";
		createSvgIcon(eCardTodoItemCheckInner, tickIcon);

		eCardTodoItemCheckOuter.appendChild(eCardTodoItemCheckInner);

		eCardTodoItemCheck.appendChild(eCardTodoItemCheckOuter);

		// Check list text
		const eCardTodoItemText = document.createElement("div");
		eCardTodoItemText.textContent = description;
		eCardTodoItemText.classList = "e-card__todo-text";
		const eCardTodoItemDelete = document.createElement("div");
		// Check list delete icon
		eCardTodoItemDelete.classList = "e-card__todo-delete";
		createSvgIcon(eCardTodoItemDelete, deleteIcon);

		eCardTodoItem.append(
			eCardTodoItemCheck,
			eCardTodoItemText,
			eCardTodoItemDelete
		);
		return eCardTodoItem;
	}

	// Call check list items
	for (let i = 0; i < checkList.length; i++) {
		const element = checkList[i];

		const status = element.status;
		const text = element.description;

		eCardTodoList.appendChild(expandedCardCheckListItem(status, text));
	}

	const eCardFooter = document.createElement("div");
	eCardFooter.classList = "e-card__footer flex";
	const eCardProject = document.createElement("div");
	eCardProject.textContent = "Inbox";
	eCardProject.classList = "e-card__project";
	const eCardCancel = document.createElement("button");
	eCardCancel.textContent = "Cancel";
	eCardCancel.classList = "e-card__cancel btn";
	const eCardSave = document.createElement("button");
	eCardSave.textContent = "Save";
	eCardSave.classList = "e-card__save btn";
	eCardFooter.append(eCardProject, eCardCancel, eCardSave);

	background.append(
		eCardTop,
		eCardClose,
		eCardHead,
		eCardStatus,
		eCardDate,
		eCardTag,
		eCardPriority,
		eCardDescription,
		eCardDescriptionArea,
		eCardTodo,
		eCardTodoAdd,
		eCardTodoList,
		eCardFooter
	);

	return blur;
}

const unCompletedList = document.querySelector(".uncompleted-tasks");
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"none",
		"Inbox",
		"rgb(32, 123, 98)"
	)
);
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"high",
		"Inbox",
		"rgb(32, 123, 98)"
	)
);
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"low",
		"Inbox",
		"rgb(132, 123, 229)"
	)
);
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Success"],
		"high",
		"Inbox",
		"rgb(32, 13, 98)"
	)
);
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"medium",
		"Inbox",
		"rgb(32, 123, 98)"
	)
);
unCompletedList.append(
	createTaskCard(
		true,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"high",
		"Inbox",
		"rgb(32, 123, 98)"
	)
);

const completedList = document.querySelector(".completed-tasks");
completedList.append(
	createTaskCard(
		false,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"high",
		"Inbox",
		"rgb(32, 123, 98)"
	)
);
completedList.append(
	createTaskCard(
		false,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"medium",
		"Inbox",
		"rgb(32, 13, 98)"
	)
);
completedList.append(
	createTaskCard(
		false,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"medium",
		"Inbox",
		"rgb(32, 13, 98)"
	)
);
completedList.append(
	createTaskCard(
		false,
		"This is a demo",
		"This will be the first demo description",
		["Dev", "Web", "Book", "Success"],
		"medium",
		"Inbox",
		"rgb(32, 13, 98)"
	)
);

// app.append(expandCard());
