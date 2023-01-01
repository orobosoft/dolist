import Todo, { todoItemList } from "./todo-items.js";

// Get todo-items list
const arr = Todo().getTodoItemList();

// Tag list factory
const TagItem = (name) => {
	let tagName = name;

	const getTagName = () => {
		return tagName;
	};
	const changeTagName = (newName) => {
		tagName = newName;
	};
	const tagTodo = () => {
		const filtered = [];
		arr.forEach((e, i) => {
			const t = e.getTags();
			console.log(t);
			for (let n = 0; n < t.length; n++) {
				if (t[n].toLowerCase() === tagName.toLowerCase()) {
					filtered.push(e);
					break;
				}
			}
		});
		return filtered;
	};
	return {
		getTagName,
		tagTodo,
		changeTagName,
	};
};

// Loop through todo-items list and change tag name
const updateTag = (oldCat, newCat) => {
	todoItemList.forEach((li) => {
		li.forEach((i) => {
			if (i === oldCat) {
				i = newCat;
			}
		});
	});
	// push the updated array to the default array
	Todo().setTodoItemList(arr);
};

export let tags = [];
export function resetTags() {
	tags = []
}
export default function tag() {
	const getTags = () => {
		return tags;
	};
	const setTags = (newTagsArray) => {
		tags = newTagsArray;
	};

	const createTag = (name) => {
		const newTag = TagItem(name);

		tags.push(newTag);
		return newTag;
	};

	const renameTag = (oldName, newName) => {
		for (let i = tags.length - 1; i >= 0; i--) {
			if (tags[i].getTagName() === oldName) {
				tags[i].changeTagName(newName);
			}
		}
		todoItemList.forEach((li) => {
			li.getTags().forEach((i) => {
				if (i === oldName) {
					i = newName;
				}
			});
		});
	};

	const deleteTag = (tagName, option = false) => {
		// delete tag from tags list
		for (let i = tags.length - 1; i >= 0; i--) {
			if (tags[i].getTagName() === tagName) {
				tags.splice(i, 1);
			}
		}
		// Delete todo items having tag
		if (option) {
			for (let i = todoItemList.length - 1; i >= 0; i--) {
				if (todoItemList[i].getTags().includes(tagName)) {
					todoItemList.splice(i, 1);
				}
			}
		} else {
			// delete the tag in todo-items
			for (let i = todoItemList.length - 1; i >= 0; i--) {
				todoItemList[i].getTags().forEach((e, b) => {
					if (e === tagName) {
						todoItemList[i].getTags().splice(i, 1);
					}
				});
				// push the updated array to the default array
				// Todo().setTodoItemList(arr);
			}
		}
	};

	return {
		createTag,
		deleteTag,
		getTags,
		setTags,
		renameTag,
	};
}

// Tags: Array holding all tags

// delete tag from from tags list
// add tag to tags list
//
// delete tag from tags list = delete tag from todo items
// add tag to todo item = add tag to tags list
