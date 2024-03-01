  // my Meal Todo list
  const inputBox = document.getElementById("input-box");
const listContiner =document.getElementById("list-container")

function addTask(){
    
    if(inputBox.value === ''){
        alert("You must write soomething! ");
    }
    else{
        let list=document.createElement("li");
        list.innerHTML=inputBox.value;
        listContiner.appendChild(list);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        list.appendChild(span);
    }
    inputBox.value="";
    saveData();
}
listContiner.addEventListener("click",function(e){
   if(e.target.tagName ==='LI'){
    e.target.classList.toggle("checked");
    saveData();

   }
   else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();

   }
 
},false);

function saveData(){
    localStorage.setItem("data",listContiner.innerHTML);
}

// reonpen website then it prensent
function showTask(){
    listContiner.innerHTML=localStorage.getItem("data");
}
showTask();
