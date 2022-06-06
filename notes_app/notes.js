const addBox = document.querySelector(".add-box")
popupBox = document.querySelector(".popup-box")
popupTitle = popupBox.querySelector("header p")
closeIcon = popupBox.querySelector("header i")
addBtn = popupBox.querySelector("button")
titleText = popupBox.querySelector(".title-text")
descText = popupBox.querySelector(".desc-text")

let currentDate = document.querySelector(".date")


const months = ["January","February","March","April","May","June",
"July","August","September","October","November","December"]

//If there is, we have converted the notes in localStorage into a arrays, if not, we have passed.
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add New Note"
    addBtn.innerText = "Add Note"
    titleText.focus();
    popupBox.classList.add("show");
   
});

closeIcon.addEventListener("click", () => {
    updateId = false;
    popupBox.classList.remove("show")
    titleText.value = " ";
    descText.value = " ";
    
});

function showNotes(){
    //this code deletes the old code before the new one comes.
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let liTag = `
                    <li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span class="date">${note.date}</span>
                            <div class="settings">
                                <i class="fas fa-ellipsis-h" onclick="showMenu(this)"></i>
                                <ul class="menu">
                                    <li onclick="edit(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="fas fa-trash-alt"></i> Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                     `
        addBox.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show"); //this code opens the menu when it becomes active
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){ //it closes back when we hit it.
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    // let confirmDel = confirm("Are you sure to delete this note?")
    // if(!confirmDel) return;
    notes.splice(noteId, 1) //it deletes the selected one.
    //updating localStorage
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}

function edit(noteId, title, desc){
    updateId = noteId
    isUpdate = true;
    addBox.click();
    titleText.value = title;
    descText.value = desc;
    popupTitle.innerText = "Update This Note"
    addBtn.innerText = "Update Note"

}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTittle = titleText.value;
    let noteDesc = descText.value;

    if(noteTittle || noteDesc){
        //we got the informations of current month,day,year
        let currentDate = new Date();
        year = currentDate.getFullYear(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate();

        let noteInfo = {
            title: noteTittle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);//we saved the new notes into "notes".
            //We saved the entered notes to localStorage as strings.
        }
        else{
            isUpdate = false;
            notes[updateId] = noteInfo; //we updated the notes.
        }
       
        localStorage.setItem("notes",JSON.stringify(notes));
        showNotes();
        closeIcon.click();      
    }
});

