let myLibrary = [];

function Book(name, author, pages,score){
	this.name = name,
	this.author = author,
	this.pages = pages,
	this.read = undefined,
	this.score = score,

	this.info = function(){
		let read = "finished";
		if(!this.read){
			read ="not read yet";
		}
		console.log(this.name+" by "+this.author+", "+this.pages+", "+read);
	},

	this.status = function(){
		let status;
		if(this.read){
			status = "finished"
		}else{
			status =  "not read yet";
		}
		return status;
	}
}

let numBooks = 0;

function addBookToLibary(book){
	myLibrary.push(book);
	numBooks+=1;
}

function render(){
	let newRow;
	let book;
	let name,author,pages,status, score;

	for(let i =numBooks-1;i<myLibrary.length;i++){
		book = myLibrary[i];

// function createElement(element,id,property)
		newRow = document.createElement("tr");
		newRow.id = "book"+i;

		name = document.createElement("td");
		name.id = 'name'+i;
		name.innerHTML = book.name;

		edit = document.createElement("td");
		let x = document.createElement("a");
		x.id =newRow.id;
		x.href="#";
		x.innerHTML = 'edit';
		x.setAttribute("onclick","matchBook(this.id)");
		edit.append(x);

		author = document.createElement("td");
		author.id = 'author'+i;
		author.innerHTML = book.author;

		pages = document.createElement("td");
		pages.id = 'pages'+i;
		pages.innerHTML = book.pages;

		score = document.createElement("td");
		score.id = "score"+i;
		score.innerHTML = book.score;

		status = document.createElement("td");
		status.id = 'status';
		let selectList = document.createElement("SELECT");
		let array = ["not read yet","finished"];
		selectList.id = "mySelect"+i;


		// Status options
		for(let i=0;i<array.length;i++){
			let option = document.createElement("option");
			option.setAttribute("value",array[i]);
			option.text = array[i];
			selectList.appendChild(option);
		}
		selectList.value = book.status();
		status.append(selectList);

		

		remove = document.createElement("td");
		let a = document.createElement("a");
		a.id = newRow.id;
		a.setAttribute("onclick", "removeBook(this.id)");
		a.innerHTML = 'delete';
		a.href="#";
		remove.append(a);

		newRow.append(name,edit,author,score,pages,status,remove);


		
		document.getElementById("bookTable").append(newRow);

		document.getElementsByTagName('select')[0].onchange = function(){
			editStatus(this);
		}

	}
}

function createElement(element,id,property){
	let x = document.createElement(element);
	x.id = id;
	if(property != "status"){
		x.innerHTML = book[property];
	}else{
		x.innerHTML = book[property]();
	}
	return x;
}


//add book to cancel, toggle
function showForm(){
	let x = document.getElementById("showFormButton");
	let form = document.getElementById("bookForm");
	if(x.textContent == "Add Book"){
		form.style.display = "block";
		form.reset();
		x.textContent = "Cancel";

	}else{
		document.getElementById("bookForm").style.display = "none";
		x.textContent = "Add Book";
	}
}

function addBook(){
    let inputs = document.querySelectorAll("input");

    if(checkFormErrors(inputs)){
    	return;
    }

    let score = document.getElementById("selectScore").value;

    if(score == "selectScore"){
    	score = '-';
    }
	addBookToLibary(new Book(inputs[0].value, inputs[1].value,inputs[2].value,score));
	
	render();
	document.getElementById('bookForm').reset();
	showForm();
}
// name author pages 
function checkFormErrors(inputs){
	let errors = false;
	if(inputs[0].value =="" || inputs[1].value==""){
		errors = true;
		alert("Please enter the title and author of book.");
	}
	return errors;
}

// Given: a string with numbers. (e.g. "book10")
// Return: number found in string. (returns 10);
function getIndex(id){
	let index = parseInt(id.match(/(\d[\d\.]*)/g));
	return index;
}

function removeBook(id){
	console.log('deleting '+id);

	//let index = parseInt(id.match(/(\d[\d\.]*)/g));
	//myLibrary.splice(index, 1);
	//must put a deleted boolean to record that it has been removed
	console.log(myLibrary);
	//numBooks-=1;
	//remove from table
	document.getElementById(id).remove();
}

function editStatus(obj){

	let index = obj.selectedIndex;
	
	let inputText = obj.children[index].innerHTML.trim();
	// update book info
	let book = myLibrary[getIndex(obj.id)];
	
	if(inputText == "finished"){
		book.read = true;
	}else{
		book.read = false;
	}
}


// link edit form to book
function matchBook(id){
	// acquire form  and display it
	document.getElementById("template").style.display="block";
	let form =document.getElementsByClassName("formBook")[0];
	form.id= "bookNum"+getIndex(id);
	//predefine value for pages and score to current book

}

function editBook(id){
	let index = getIndex(id);
	
	let inputs = document.querySelectorAll("input");

	let pages = inputs[4].value;
	let score = document.getElementById("editSelectScore").value;

	// update record
	let book = myLibrary[index];
	book.pages = pages;
	book.score = score;

	// display this new info
	document.getElementById("pages"+index).innerHTML = pages;
	document.getElementById("score"+index).innerHTML = score;
	
}