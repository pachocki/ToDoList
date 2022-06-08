
//Select all elements
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")
const clock = document.getElementById("clock")
const addBtn = document.getElementById("add-btn")
const deleteAllBtn = document.querySelector(".clear-all")
const sortBtn = document.getElementById("sort")




//Display date
const displayOptions = {weekday:"long" , month:"short" , day:"numeric"};
const today = new Date();
//Display Clock
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    clock.innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
startTime()



date.innerHTML = today.toLocaleDateString("no-NO",displayOptions).toUpperCase();

input.onkeyup=()=>{
    let userData = input.value; // user entered value
    if(userData.trim() !=0){           // if values arent only space active opacity 1
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active"); 

    }
}


showToDo()
function addToDo(){
    let userData = input.value; // user entered value
    let getLocalStorage = localStorage.getItem("New To Do"); //local Storage
    if(getLocalStorage == null){
        listArray=[];
    }else{
        listArray = JSON.parse(getLocalStorage) //changing  json string into object
    }
    listArray.push(userData);
    localStorage.setItem("New To Do" , JSON.stringify(listArray)); //changing to jspn string
    showToDo() //calling function
    addBtn.classList.remove("active"); 

}

//Add to do on click
addBtn.onclick = ()=>{
    addToDo();
}
//Add to do on keydown
input.onkeydown= e =>{
    if(e.key !== "Enter"){
        return;
    }else{
        return addToDo();
    }
}



//add To Do list in ul
function showToDo(){                                           //function to display to do from object
    let getLocalStorage = localStorage.getItem("New To Do");
    if(getLocalStorage == null){
        listArray=[];
    }else{
        listArray = JSON.parse(getLocalStorage) //changing  json string into object
    }
    const numberOfTask = document.querySelector(".number-task")
    numberOfTask.innerHTML=listArray.length; // checking length of array 
    if(listArray.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLi = ``
    listArray.forEach((element,index)=>{
        newLi +=`<li class="item"><span class="date-todo">${date.innerHTML}</span>${element}<span class="delete" onclick="delateToDo(${index});"><i class="fas fa-trash"></i></span></li>`
    })
    list.innerHTML=newLi;
    input.value="";

}

//Delete Function
function delateToDo(index){ 
    let getLocalStorage = localStorage.getItem("New To Do");
    listArray = JSON.parse(getLocalStorage)
    listArray.splice(index,1); //delete li from index
    localStorage.setItem("New To Do" , JSON.stringify(listArray));//after remove show update list 
    showToDo()

}

deleteAllBtn.onclick= ()=>{
    listArray = [];
    localStorage.setItem("New To Do" , JSON.stringify(listArray));//after remove show update list 
    showToDo()

}

sortBtn.addEventListener("click",()=>{
    listArray = [...listArray]
    listArray.sort();
    localStorage.setItem("New To Do" , JSON.stringify(listArray));
    showToDo()


})
