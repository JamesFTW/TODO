//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily task

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks") ; //competed-tasks

//New Task List Item
var createNewTaskElement = function(taskString){
	var listItem = document.createElement("li")
	//input (checkbox)
	var checkbox = document.createElement("input") //checkbox
		//label
	var label = document.createElement("label")
		//input (text)
	var editInput = document.createElement("input")
		//button.edit
	var editButton = document.createElement("button")
		//button.delete
	var deleteButton = document.createElement("button")
		//Each element needs modifiying
	 	checkbox.type = "checkbox"
	 	editInput.type = "text"

	 	editButton.innerText = "Edit"
	 	editButton.className = "edit"
	 	deleteButton.innerText = "Delete"
	 	deleteButton.className = "delete"
	 	label.innerText = taskString;
		//Each element needs appending
		listItem.appendChild(checkbox)
		listItem.appendChild(label) 
		listItem.appendChild(editInput) 
		listItem.appendChild(editButton) 
		listItem.appendChild(deleteButton) 
		return listItem;

} 

//Add a new task
function addTask() {
	console.log("add task")
	 
	//Create new li with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value)
	//Append item to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)

	taskInput.value = ""
		
}
//Edit an existing task
function editTask(){
	console.log("edit task")
	
	var listItem = this.parentNode
	var editInput = listItem.querySelector("input[type=text]")
	var label = listItem.querySelector("label")
	var containsClass = listItem.classList.contains("editMode")
		//if the class of the parent is .editMode
		if(containsClass){

			//Switch from .editMode
			//label text become the input's value
			label.innerText = editInput.value
		//else
		}else{
			//switch to .editMode
			//input vaule becomes label's text
			editInput.value = label.innerText
	}
			//Toggle .editMode on list item
			listItem.classList.toggle("editMode") 

}

//Delete an existing task
function deleteTask(){
	console.log("delete task")
		//Remove parent li from the ul
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	ul.removeChild(listItem)
}


//Mark a task as complete
function taskCompleted(){
	console.log("complete task")
		//Append the task list item to #completed-tasks
	var listItem = this.parentNode
	completedTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}


//Mark a task as incomplete

function taskIncomplete(){
	console.log("incomplete task")
	//Appened the task list item to #incomplete-tasks
	var listItem = this.parentNode
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}

function bindTaskEvents(taskListItem, checkBoxEventHandler){
	console.log("bindTaskEvents")
	//select taskListItem's children
	var checkbox = taskListItem.querySelector("input[type=checkbox]")
	var editButton = taskListItem.querySelector("button.edit")
	var deleteButton = taskListItem.querySelector("button.delete")


		//bind editTask to edit button
		editButton.onclick = editTask
		//bind deleteTask to delete buttton
		deleteButton.onclick = deleteTask
		//bind checkBoxEventHandler to checkbox
		checkbox.onchange = checkBoxEventHandler


}

//Set the click handler to the addTask function
addButton.onclick = addTask;

//cycle over incompleteTaskHolder ul list items
for(var i = 0; i<incompleteTaskHolder.children.length; i++){
	//bind events to list item's children(taskCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
}

//cycle over completeTaskHolder ul list items
for(var i = 0; i<completedTaskHolder.children.length; i++){
	//bind events to list item's children(taskIncompleted)
	bindTaskEvents(completedTaskHolder.children[i], taskIncomplete)
}
