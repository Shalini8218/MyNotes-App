console.log("Notes App");
showNotes();

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click',function(e){

    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');


    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');

    if(notes == null || title == null) {
        notesObj = [];
        titleObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    };
    notesObj.push(myObj);   //Add the note  to myObj

    // converted the Array in string beacuse lacal storage only allow to saves in  the form of string.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("title", JSON.stringify(titleObj));

    addTxt.value = "";
    addTitle.value = "";

    //Display the notes in the web
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title')
    if(notes == null){
        notesObj = [];
        titleObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
    let html = "";
    notesObj.forEach(function(element, index){

        html += `
                <div class="note-cards" >
                    <div class="noteTitle">
                    <h3 class="para2">${element.title} </h3>
                    </div>
                    <p class="NoteTxt"> ${element.text} </p>
                    <div class=dltBtn>
                            <button id="${index}"  onclick="deleteNote(this.id)" class="btn-2">Delete Note</button>
                    </div>
                </div> ` ; 
    })
        let notesElm = document.getElementById('notes');
        if(notesObj.length != 0){
            notesElm.innerHTML = html;
        }
        else{
            notesElm.innerHTML =  `<strong>Nothing to show here ):</strong>`
                                  
        }
}

// delete functionality
function deleteNote(index){

    let notes = localStorage.getItem('notes');

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();
}

// search functionality to the notes
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){

    let inputVal = search.value.toLowerCase();

    let noteCard = document.getElementsByClassName('note-cards');
    Array.from(noteCard).forEach(function(element){

        let NoteTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let NoteTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (NoteTxt.includes(inputVal) || NoteTitle.includes(inputVal)) {
            element.style.display = "block"; //display the notes if note-value matches the search text
        } else {
            element.style.display = "none"; //hide the note card if the note title or note text doesn't contain the search text
        }
    });
})