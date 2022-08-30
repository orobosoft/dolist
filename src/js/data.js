import category from "./category";
import tag from "./tag";
import todo from "./todo-items";
import { createTaskCard, expandCard } from "./view";

// Todo Array
const todoArray = [];
// Category Array
const categoryArray = [];
// Tag Array
const tagArray = [];
// const checkListArray = []

for (let i = 0; i < 20; i++) {
	const newTag = tag().createTag("Tag: " + i);
	tagArray.push(newTag);
}

let ccc = 0;
for (let i = 0; i < 10; i++) {
	const newTodo = todo().createTodoItem();
	newTodo.setTitle("Task " + ++ccc);
	for (let i = 0; i < 5; i++) {
		newTodo.addCheckList("Check " + i);
	}
	for (let i = 0; i < 14; i++) {
		newTodo.addTag("Tag: " + i);
	}

	todoArray.push(newTodo);
}
for (let i = 0; i < 5; i++) {
	let cat = category().createCategory("Cate " + i);
	categoryArray.push(cat)
}
let count = 0;


todo().setTodoItemList(todoArray);

category().setCategories(categoryArray);

tag().setTags(tagArray);
