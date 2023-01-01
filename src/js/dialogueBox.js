import { colors } from "./DOM-events";
import { arrowDownIcon, createSvgIcon, tickIcon } from "./icons";

export function createDialogueBoxInput(
	description,
	functionIfOkay,
	cancelText = "Cancel",
	okayText = "Okay"
) {
	const app = document.querySelector("#app");

	const background = document.createElement("div");
	background.classList = "dialogue__background";

	const dialogueBox = document.createElement("div");
	dialogueBox.classList = "dialogue__box";
	const primary = document.createElement("h2");
	primary.classList = "dialogue__title";
	primary.textContent = description;

	const textInput = document.createElement("input");
	textInput.setAttribute("type", "text");
	textInput.classList = "dialogue__textBox";

	const buttons = document.createElement("div");
	buttons.classList = "dialogue__buttons";
	const cancelButton = document.createElement("div");
	cancelButton.classList = "dialogue__button--cancel btn";
	cancelButton.textContent = cancelText;
	const okayButton = document.createElement("div");
	okayButton.classList = "dialogue__button--okay btn";
	okayButton.textContent = okayText;
	buttons.append(cancelButton, okayButton);

	dialogueBox.append(primary, textInput, buttons);
	background.append(dialogueBox);
	app.append(background);

	// DIALOGUE CARD EVENTS
	const dialogueBox1 = document.querySelector(".dialogue__box");
	const background1 = document.querySelector(".dialogue__background");

	dialogueBox1.addEventListener("click", function (e) {
		let text;
		if (e.target.classList.contains("dialogue__button--okay")) {
			text = document.querySelector(".dialogue__textBox").value;

			background1.remove();
			functionIfOkay(text);
		}
		if (e.target.classList.contains("dialogue__button--cancel")) {
			background1.remove();
		}
	});
}
export function createDialogueBoxDropdown(
	description,
	currentSelection,
	object,
	functionIfOkay,
	cancelText = "Cancel",
	okayText = "Okay"
) {
	const app = document.querySelector("#app");

	const background = document.createElement("div");
	background.classList = "dialogue__background";

	const dialogueBox = document.createElement("div");
	dialogueBox.classList = "dialogue__box";
	const primary = document.createElement("h2");
	primary.classList = "dialogue__title";
	primary.textContent = description;

	const dropdown = document.createElement("div");

	const dropdownText = document.createElement("p");
	dropdown.appendChild(dropdownText);
	const dropdownIcon = document.createElement("span");
	createSvgIcon(dropdownIcon, arrowDownIcon);
	dropdown.appendChild(dropdownIcon);
	dropdownText.textContent = currentSelection;
	dropdown.classList =
		"e-card__category dialogue__dropdown dropdown-select dropdown";

	const eCardCategoryOpenWrapper = document.createElement("div");
	eCardCategoryOpenWrapper.classList = "list";

	const eCardCategoryOpen = document.createElement("ul");
	eCardCategoryOpen.classList = "e-card__category-container";

	eCardCategoryOpenWrapper.appendChild(eCardCategoryOpen);

	createCategoryLi(eCardCategoryOpen);
	function createCategoryLi(ul) {
		const li = document.createElement("li");
		li.classList = "e-card__category-item";
		li.textContent = "Inbox";
		li.style.outlineColor = colors[li.textContent];
		ul.appendChild(li);
		object.forEach((e) => {
			const li = document.createElement("li");
			li.classList = "e-card__category-item";
			li.textContent = e.getCategoryName();
			li.style.outlineColor = colors[li.textContent];
			ul.appendChild(li);
		});
	}

	dropdown.appendChild(eCardCategoryOpenWrapper);





	dropdown.addEventListener("click", function (e) {
			const ul = document.querySelector(".e-card__category .list");
		const spanIcon = document.querySelector(".e-card__category .span-icon");

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
	});





	const buttons = document.createElement("div");
	buttons.classList = "dialogue__buttons";
	const cancelButton = document.createElement("div");
	cancelButton.classList = "dialogue__button--cancel btn";
	cancelButton.textContent = cancelText;
	const okayButton = document.createElement("div");
	okayButton.classList = "dialogue__button--okay btn";
	okayButton.textContent = okayText;
	buttons.append(cancelButton, okayButton);

	dialogueBox.append(primary, dropdown, buttons);
	background.append(dialogueBox);
	app.append(background);

	// DIALOGUE CARD EVENTS
	const dialogueBox1 = document.querySelector(".dialogue__box");
	const background1 = document.querySelector(".dialogue__background");

	dialogueBox1.addEventListener("click", function (e) {
		let text;
		if (e.target.classList.contains("dialogue__button--okay")) {
			text = document.querySelector(".dialogue__dropdown p").textContent;

			background1.remove();
			functionIfOkay(text);
		}
		if (e.target.classList.contains("dialogue__button--cancel")) {
			background1.remove();
		}
	});
}
export function createDialogueBoxColor(
	description,
	functionIfOkay,
	cancelText = "Cancel",
	okayText = "Okay"
) {
	const app = document.querySelector("#app");

	const background = document.createElement("div");
	background.classList = "dialogue__background";

	const dialogueBox = document.createElement("div");
	dialogueBox.classList = "dialogue__box";
	const primary = document.createElement("h2");
	primary.classList = "dialogue__title";
	primary.textContent = description;

	const colorBox = document.createElement("input");
	colorBox.setAttribute("type", "color");
	colorBox.classList = "dialogue__colorBox";

	const buttons = document.createElement("div");
	buttons.classList = "dialogue__buttons";
	const cancelButton = document.createElement("div");
	cancelButton.classList = "dialogue__button--cancel btn";
	cancelButton.textContent = cancelText;
	const okayButton = document.createElement("div");
	okayButton.classList = "dialogue__button--okay btn";
	okayButton.textContent = okayText;
	buttons.append(cancelButton, okayButton);

	dialogueBox.append(primary, colorBox, buttons);
	background.append(dialogueBox);
	app.append(background);

	// DIALOGUE CARD EVENTS
	const dialogueBox1 = document.querySelector(".dialogue__box");
	const background1 = document.querySelector(".dialogue__background");

	dialogueBox1.addEventListener("click", function (e) {
		let text;
		if (e.target.classList.contains("dialogue__button--okay")) {
			text = document.querySelector(".dialogue__colorBox").value;

			background1.remove();
			functionIfOkay(text);
		}
		if (e.target.classList.contains("dialogue__button--cancel")) {
			background1.remove();
		}
	});
}
export function createDialogueBox(
	description,
	option = false,
	optionDescription,
	functionIfOkay,
	functionIfOkayAndOptionIsSelected,
	cancelText = "Cancel",
	okayText = "Okay"
) {
	const app = document.querySelector("#app");

	const background = document.createElement("div");
	background.classList = "dialogue__background";

	const dialogueBox = document.createElement("div");
	dialogueBox.classList = "dialogue__box";
	const primary = document.createElement("h2");
	primary.classList = "dialogue__title";
	primary.textContent = description;

	const secondary = document.createElement("div");
	secondary.classList = "dialogue__secondary";
	option
		? (secondary.style.display = "flex")
		: (secondary.style.display = "none");

	const outerCheck = document.createElement("div");
	outerCheck.classList = "outer-check";
	const innerCheck = document.createElement("div");
	innerCheck.classList = "inner-check";
	createSvgIcon(innerCheck, tickIcon);
	outerCheck.appendChild(innerCheck);

	const secondaryDescription = document.createElement("p");
	secondaryDescription.classList = "dialogue-secondary-description";
	secondaryDescription.textContent = optionDescription;

	secondary.append(outerCheck, secondaryDescription);

	const buttons = document.createElement("div");
	buttons.classList = "dialogue__buttons";
	const cancelButton = document.createElement("div");
	cancelButton.classList = "dialogue__button--cancel btn";
	cancelButton.textContent = cancelText;
	const okayButton = document.createElement("div");
	okayButton.classList = "dialogue__button--okay btn";
	okayButton.textContent = okayText;
	buttons.append(cancelButton, okayButton);

	dialogueBox.append(primary, secondary, buttons);
	background.append(dialogueBox);
	app.append(background);

	// DIALOGUE CARD EVENTS
	const dialogueBox1 = document.querySelector(".dialogue__box");
	const background1 = document.querySelector(".dialogue__background");

	dialogueBox1.addEventListener("click", function (e) {
		if (
			e.target.classList.contains("outer-check") ||
			e.target.classList.contains("dialogue-secondary-description")
		) {
			dialogueBox.classList.toggle("completed");
		}

		if (e.target.classList.contains("dialogue__button--okay")) {
			if (dialogueBox1.classList.contains("completed")) {
				functionIfOkayAndOptionIsSelected();
			} else {
				functionIfOkay();
			}
			background1.remove();
		}
		if (e.target.classList.contains("dialogue__button--cancel")) {
			background1.remove();
		}
	});
}
