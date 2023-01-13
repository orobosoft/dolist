// Script to create svg element with icon path
export function createSvgIcon(node, d) {
	const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const iconPath = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	iconSvg.classList.add("svg-icon");
	iconSvg.setAttribute("fill", "none");
	iconSvg.setAttribute("viewBox", "0 0 24 24");
	iconSvg.setAttribute("height", "1em");
	iconSvg.setAttribute("width", "1em");
	iconSvg.setAttribute("stroke", "currentColor");
	iconPath.setAttribute("d", d);
	iconPath.setAttribute("stroke-linecap", "round");
	iconPath.setAttribute("stroke-linejoin", "round");
	iconSvg.appendChild(iconPath);
	const span = document.createElement("span");
	span.classList = "span-icon";
	span.appendChild(iconSvg);
	return node.appendChild(span);
}

// SVG Icon Data
const overviewIcon =
	"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
const todayIcon =
	"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";
const inboxIcon =
	"M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4";
const projectIcon =
	"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10";
const tagIcon =
	"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z";
const settingsIcon =
	"M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4";
const questionIcon =
	"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const notificationIcon =
	"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9";
const searchIcon = "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z";
const arrowDownIcon = "M19 9l-7 7-7-7";
const editIcon =
	"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z";
const flagIcon =
	"M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9";
const deleteIcon =
	"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16";
const tickIcon =
	"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z";
const addIcon =
	"M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z";

const plusIcon = "M12 4v16m8-8H4";

const plusCircleIcon =
	"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z";

const dotsHorizontal =
	"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z";

const dayIcon =
	"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z";

const nightIcon =
	"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";

const dayAndNightIcon =
	"M10,0.469c-5.264,0-9.531,4.268-9.531,9.531c0,5.265,4.268,9.531,9.531,9.531c5.265,0,9.531-4.267,9.531-9.531C19.531,4.736,15.265,0.469,10,0.469 M10,18.665c-4.786,0-8.665-3.88-8.665-8.665c0-4.786,3.879-8.665,8.665-8.665V18.665z";

const forwardIcon = "M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3";

const swatchIcon =
	"M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z";

const barsIcon = "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5";

export {
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
	addIcon,
	plusIcon,
	plusCircleIcon,
	dotsHorizontal,
	dayIcon,
	nightIcon,
	dayAndNightIcon,
	forwardIcon,
	swatchIcon,
	barsIcon,
};
