import { createSvgIcon, tickIcon } from "./icons";

export function createDialogueBox(
	description,
	option = false,
	optionDescription,
	functionIfOkay,
	functionIfOkayAndOptionIsSelected
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
	cancelButton.textContent = "Cancel";
	const okayButton = document.createElement("div");
	okayButton.classList = "dialogue__button--okay btn";
	okayButton.textContent = "Okay";
	buttons.append(cancelButton, okayButton);

	dialogueBox.append(primary, secondary, buttons);
	background.append(dialogueBox);
	app.append(background);

	// DIALOGUE CARD EVENTS
	const dialogueBox1 = document.querySelector(".dialogue__box");
	const background1 = document.querySelector(".dialogue__background");

	dialogueBox.addEventListener("click", function (e) {
		if (
			e.target.classList.contains("outer-check") ||
			e.target.classList.contains("dialogue-secondary-description")
		) {
			dialogueBox.classList.toggle("completed");
		}

		if (e.target.classList.contains("dialogue__button--okay")) {
			background1.remove();
			if (dialogueBox1.classList.contains("completed")) {
				functionIfOkayAndOptionIsSelected();
			} else {
				functionIfOkay();
			}
		}
		if (e.target.classList.contains("dialogue__button--cancel")) {
			background1.remove();
		}
	});
}
