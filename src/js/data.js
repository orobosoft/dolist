import category from "./category";
import { createTaskCard, expandCard } from "./view";

let defTasksArray = [];

for (let i = 0; i < 10; i++) {
	let item = {};
	item.status = true;
	item.title = `This is a demo (${i + 1})`;
	item.description = "This will be the first demo description";
	item.dueDate = "DATE";
	item.creationDate = "Date Created";
	item.priority = "medium";
	item.tags = ["Dev", "Web", "Book", "Success"];
	item.category = "Inbox";
	item.categoryColor = "#000";
	item.note = null;
	item.checkLists = [];

	for (let i = 0; i < 4; i++) {
		let checkList = {};
		checkList.status = true;
		checkList.description = `This is a checklist demo (${i + 1})`;

		item.checkLists.push(checkList);
	}
	defTasksArray.push(item);
}
for (let i = 0; i < 10; i++) {
	let item = {};
	item.status = false;
	item.title = `This is a demo (${i + 1})`;
	item.description = "This will be the first demo description";
	item.dueDate = "DATE";
	item.creationDate = "Date Created";
	item.priority = "medium";
	item.tags = ["Dev", "Web", "Book", "Success"];
	item.category = "Inbox";
	item.categoryColor = "#000";
	item.note = null;
	item.checkLists = [];

	for (let i = 0; i < 4; i++) {
		let checkList = {};
		checkList.status = true;
		checkList.description = `This is a checklist demo (${i + 1})`;
		item.checkLists.push(checkList);
	}
	defTasksArray.push(item);
}

const app = document.querySelector(".app");
const unCompletedList = document.querySelector(".uncompleted-tasks");
const completedList = document.querySelector(".completed-tasks");

console.log(category().getCategories()[category]);

// loop Task Array to render all cards
for (let i = 0; i < defTasksArray.length; i++) {
	const element = defTasksArray[i];
	if (element.status === true) {
		unCompletedList.append(createTaskCard(element));
	} else if (element.status === false) {
		completedList.append(createTaskCard(element));
	}
}



const card = document.querySelectorAll(".card");

Array.from(card).forEach((element, index) => {
	element.addEventListener("click", (e) => expandView(e, index));
});

function expandView(e, i) {
	app.append(expandCard(defTasksArray[i]));
}
