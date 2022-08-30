import Todo from "./todo-items.js";

// Get todo-items list
const arr = Todo().getTodoItemList();

// Tag list factory
const TagItem = (name) => {
	let tagName = name;

	const getTagName = () => {
		return tagName;
	};
  const tagTodo = () => {
    const filtered = []
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
	};
};

// Loop through todo-items list and change tag name
const updateTag = (oldCat, newCat) => {
	arr.forEach((li) => {
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
    return newTag
	};

	const deleteTag = (tagName) => {
		// delete tag from tags list
		for (let i = tags.length - 1; i >= 0; i--) {
			if (tags[i] === tagName) {
				tags.splice(i, 1);
			}
		}

		// delete the tag in todo-items
		for (let i = arr.length - 1; i >= 0; i--) {
			arr[i].tag.forEach((e, i) => {
				if (e === tagName) {
					arr[i].splice(i, 1);
				}
			});
			// push the updated array to the default array
			Todo().setTodoItemList(arr);
		}
	};

	return {
		createTag,
		deleteTag,
		getTags,
		setTags,
	};
}

// Tags: Array holding all tags

// delete tag from from tags list
// add tag to tags list
//
// delete tag from tags list = delete tag from todo items
// add tag to todo item = add tag to tags list
