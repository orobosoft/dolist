import { createSvgIcon, dotsHorizontal } from "./icons";
import { todoItemList } from "./todo-items";
import { renderAside, renderMain } from "./view";

// Mobile
const bgElement = document.createElement("div");
bgElement.classList = "empty-bg";

const isMobile = window.matchMedia("(min-width: 1px) and (max-width: 480px)");
// Tablet
const isTablet = window.matchMedia("(min-width: 480px) and (max-width: 780px)");
// Laptop
const isLaptop = window.matchMedia(
	"(min-width: 780px) and (max-width: 1024px)"
);
// Desktop
const isDesktop = window.matchMedia("(min-width: 1025px)");

// systemTheme(prefersDark)
isMobile.addEventListener("change", (e) => {
	if (e.matches) {
		loadMobileView();
	}
});
isTablet.addEventListener("change", (e) => {
	if (e.matches) {
		loadTabletView();
	}
});
isLaptop.addEventListener("change", (e) => {
	if (e.matches) {
		loadLaptopView();
	}
});
isDesktop.addEventListener("change", (e) => {
	if (e.matches) {
		loadDesktopView();
	}
});

// systemTheme(prefersDark.matches);

function loadMobileView() {
	const aside = document.querySelector(".aside");
	const extra = document.querySelector(".extra");
	const logoArea = document.querySelector(".logo");
	const theme = document.querySelector(".theme");
	const userName = document.querySelector(".user-name");
	const userPicture = document.querySelector(".user-picture");

	document.querySelector(".menu-btn").style.display = "flex";
	aside.classList = "aside aside-pop";
	aside.style.display = "none";

	extra.prepend(theme);
	logoArea.append(userName, userPicture);

	// CARD TAGS
	Array.from(document.querySelectorAll(".card__tags .card__tag")).forEach((e) =>
		e.remove()
	);

	Array.from(document.querySelectorAll(".card")).forEach((e) => {
		const tags = e.querySelector(".card__tags");
		let c1 = e.dataset.pos;

		todoItemList.forEach((i) => {
			let id = i.getUniqueId();
			if (id === c1) {
				const tag = document.createElement("span");
				tag.classList = "card__tag";
				tag.textContent = i.getTags().length;
				tags.appendChild(tag);
			}
		});
	});
}
function loadTabletView() {
	const header = document.querySelector(".header");
	const aside = document.querySelector(".aside");
	const logoArea = document.querySelector(".logo");
	const theme = document.querySelector(".theme");
	const question = document.querySelector(".question");
	const userName = document.querySelector(".user-name");
	const userPicture = document.querySelector(".user-picture");

	document.querySelector(".menu-btn").style.display = "flex";
	aside.classList = "aside aside-pop";
	aside.style.display = "none";
	header.insertBefore(theme, question);
	logoArea.append(userName, userPicture);

	// CARD TAGS
	Array.from(document.querySelectorAll(".card__tags .card__tag")).forEach((e) =>
		e.remove()
	);

	Array.from(document.querySelectorAll(".card")).forEach((e) => {
		const tags = e.querySelector(".card__tags");
		let c1 = e.dataset.pos;

		todoItemList.forEach((i) => {
			let id = i.getUniqueId();
			if (id === c1) {
				i.getTags().forEach((e, index) => {
					if (index < 3) {
						const tag = document.createElement("span");
						tag.classList = "card__tag";
						tag.textContent = i.getTags()[index];
						tags.append(tag);
					} else if (index === 3) {
						const p = document.createElement("span");
						p.classList = "card__tag ellipsis";
						createSvgIcon(p, dotsHorizontal);
						tags.appendChild(p);
					}
				});
			}
		});
	});
}

function loadLaptopView() {
	const header = document.querySelector(".header");
	const aside = document.querySelector(".aside");
	const theme = document.querySelector(".theme");
	const question = document.querySelector(".question");
	const userName = document.querySelector(".user-name");
	const userPicture = document.querySelector(".user-picture");

	document.querySelector(".menu-btn").style.display = "flex";

	aside.classList = "aside aside-pop";
	aside.style.display = "none";
	header.insertBefore(theme, question);
	header.append(userName, userPicture);

	// CARD TAGS
	Array.from(document.querySelectorAll(".card__tags .card__tag")).forEach((e) =>
		e.remove()
	);

	Array.from(document.querySelectorAll(".card")).forEach((e) => {
		const tags = e.querySelector(".card__tags");
		let c1 = e.dataset.pos;

		todoItemList.forEach((i) => {
			let id = i.getUniqueId();
			if (id === c1) {
				i.getTags().forEach((e, index) => {
					if (index < 5) {
						const tag = document.createElement("span");
						tag.classList = "card__tag";
						tag.textContent = i.getTags()[index];
						tags.append(tag);
					} else if (index === 3) {
						const p = document.createElement("span");
						p.classList = "card__tag ellipsis";
						createSvgIcon(p, dotsHorizontal);
						tags.appendChild(p);
					}
				});
			}
		});
	});
}
function loadDesktopView() {
	const menuBtn = document.querySelector(".menu-btn");
	const header = document.querySelector(".header");
	const aside = document.querySelector(".aside");
	const theme = document.querySelector(".theme");
	const question = document.querySelector(".question");
	const userName = document.querySelector(".user-name");
	const userPicture = document.querySelector(".user-picture");

	aside.style.display = "flex";
	aside.classList = "aside";
	menuBtn.style.display = "none";
	bgElement.style.display = "none";

	header.insertBefore(theme, question);
	header.append(userName, userPicture);

	// CARD TAGS
	Array.from(document.querySelectorAll(".card__tags .card__tag")).forEach((e) =>
		e.remove()
	);

	Array.from(document.querySelectorAll(".card")).forEach((e) => {
		const tags = e.querySelector(".card__tags");
		let c1 = e.dataset.pos;

		todoItemList.forEach((i) => {
			let id = i.getUniqueId();
			if (id === c1) {
				i.getTags().forEach((e, index) => {
					if (index < 5) {
						const tag = document.createElement("span");
						tag.classList = "card__tag";
						tag.textContent = i.getTags()[index];
						tags.append(tag);
					} else if (index === 3) {
						const p = document.createElement("span");
						p.classList = "card__tag ellipsis";
						createSvgIcon(p, dotsHorizontal);
						tags.appendChild(p);
					}
				});
			}
		});
	});
}

document.addEventListener("click", (e) => {
	const aside = document.querySelector(".aside");
	if (e.target.classList.contains("menu-btn")) {
		app.appendChild(bgElement);
		bgElement.style.display = "block";

		aside.classList = "aside aside-pop slide-in";
		aside.style.display = "flex";
	} else if (e.target.classList.contains("empty-bg")) {
		aside.classList = "aside aside-pop slide-out";
		setTimeout(() => {
			aside.style.display = "none";
		}, 550);

		bgElement.style.display = "none";
		bgElement.remove();
	}
});

export function updateMediaQuery() {
	if (isMobile.matches) {
		loadMobileView();
	} else if (isTablet.matches) {
		loadTabletView();
	} else if (isLaptop.matches) {
		loadLaptopView();
	} else if (isDesktop.matches) {
		loadDesktopView();
	}
}
// updateMediaQuery()
