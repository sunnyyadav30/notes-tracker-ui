updateNotesList()

function addNote(){
    let storedNotes = JSON.parse(window.localStorage.getItem('notes')) || []
    let title = document.getElementById('title')
    let description = document.getElementById('description')
    let uId = 'UNQID'+(+new Date())
    if(title.value.trim() == '' || description.value.trim() == ''){
        if(title.value.trim() == ''){
            title.classList.add('error')
            title.focus()
        }
        else if(description.value.trim() == ""){
            description.classList.add('error')
            description.focus()
        }
    }
    else{
        storedNotes.push({id:uId,title:title.value,description:description.value})
        window.localStorage.setItem('notes',JSON.stringify(storedNotes))
        updateNotesList()
        title.value = ''
        description.value = ''
    }
}

const addNoteOnEnter = (e)=>{
    if(e.keyCode == 13){
        addNote()
    }
}

const dataChange = (currentElement)=>{
    currentElement.classList.remove('error')
}

function editNote(id){
    let storedNotes = JSON.parse(window.localStorage.getItem('notes')) || []
    let title = document.getElementById('editTitle')
    let description = document.getElementById('editDescription')
    let uId = 'UNQID'+(+new Date())
    if(title.value.trim() == '' || description.value.trim() == ''){
        if(title.value.trim() == ''){
            title.classList.add('error')
            title.focus()
        }
        else if(description.value.trim() == ""){
            description.classList.add('error')
            description.focus()
        }
    }
    else{
        storedNotes.filter(note=>note.id==id)[0].title = title.value
        storedNotes.filter(note=>note.id==id)[0].description = description.value
        window.localStorage.setItem('notes',JSON.stringify(storedNotes))
        updateNotesList()
        title.value = ''
        description.value = ''
        document.getElementById('editForm').style.display="none"
    }
}

function closeEditForm(){
    document.getElementById('editForm').style.display="none"
}

function openEditForm(id){
    let notesList = JSON.parse(window.localStorage.getItem('notes')) || []
    let title = notesList.filter(note=>note.id == id)[0].title
    let description = notesList.filter(note=>note.id == id)[0].description
    document.getElementById('editForm').innerHTML = `<h3 class="form-heading" id="formHeading">Edit note</h3>
                                                        <div class="form-field">
                                                            <input type="text" placeholder="TITLE" id="editTitle" value="${title}" oninput="dataChange(this)">
                                                        </div>
                                                        <div class="form-field">
                                                            <textarea placeholder="DESCRIPTION" id="editDescription" value="${description}" oninput="dataChange(this)">${description}</textarea>
                                                        </div>
                                                        <div class="form-field edit-form-field">
                                                            <button onclick="editNote('${id}')">Done</button>
                                                            <button onclick="closeEditForm()">Cancel</button>
                                                        </div>`
    document.getElementById('editForm').style.display="block"
    document.getElementById('editTitle').focus()
}

function deleteList(id){
    let notesList = JSON.parse(window.localStorage.getItem('notes')) || []
    if(notesList.length !=0){
        var filteredNotes = notesList.filter(note=>note.id != id)
        window.localStorage.setItem('notes',JSON.stringify(filteredNotes))
        updateNotesList()
    }
}

function updateNotesList(){
    let notesList = JSON.parse(window.localStorage.getItem('notes')) || []
    let notesListContainer = document.getElementById('notesListContainer')
    let nodeString = ''
    notesList.map(note=>{
        nodeString +=  `<div class="note">
                            <div class="note-left">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><g><g><path d="m444.555 191.141h-238c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h238c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m444.555 248.474h-238c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h238c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m444.555 305.807h-238c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h238c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m468.378 125.549h-285.646c-24.053 0-43.622 19.568-43.622 43.622v179.617c0 24.053 19.568 43.622 43.622 43.622h200.211c2.141 0 4.13.963 5.458 2.644l64.655 81.853c2.548 3.226 6.266 4.984 10.159 4.984 1.447 0 2.919-.243 4.363-.745 5.327-1.85 8.769-6.689 8.769-12.328v-77.153c20.225-3.778 35.653-21.659 35.653-42.877v-179.618c0-24.053-19.568-43.621-43.622-43.621zm28.622 223.239c0 15.577-12.673 28.412-28.25 28.61-4.104.053-7.404 3.395-7.404 7.5v78.305l-61.174-77.447c-4.189-5.305-10.469-8.347-17.229-8.347h-200.211c-15.782 0-28.622-12.84-28.622-28.622v-179.617c0-15.782 12.839-28.622 28.622-28.622h285.646c15.782 0 28.622 12.84 28.622 28.622z"/><path d="m110.494 249.561c-5.13.728-9.724 3.369-12.936 7.435l-51.521 65.226v-65.371c0-4.105-3.3-7.447-7.404-7.5-13.031-.166-23.633-10.903-23.633-23.935v-156.361c0-13.203 10.742-23.945 23.945-23.945h248.663c13.203 0 23.945 10.742 23.945 23.945v28.932c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-28.932c0-21.474-17.471-38.945-38.945-38.945h-248.663c-21.474 0-38.945 17.471-38.945 38.945v156.361c0 18.667 13.371 34.438 31.038 38.124v66.366c0 5.328 3.252 9.901 8.286 11.649 1.365.474 2.755.704 4.123.704 3.677 0 7.192-1.662 9.599-4.709l56.284-71.256c.812-1.029 1.975-1.697 3.273-1.882 4.101-.582 6.954-4.379 6.371-8.48-.582-4.101-4.373-6.956-8.48-6.371z"/></g></g></svg>
                            </div>
                            <div class="note-middle">
                                <h4>${note.title}</h4>
                                <p>${breakBigSentence(note.description)}</p>
                            </div>
                            <div class="note-right">
                                <svg onclick="openEditForm('${note.id}')" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <g> <polygon points="85.333,282.64 85.333,362.64 165.333,362.64 378.667,149.307 298.667,69.307 "/> <path d="M441.707,56.08L391.893,6.267c-8.32-8.32-21.867-8.32-30.187,0L320,47.973l80,80l41.707-41.707 C450.027,77.947,450.027,64.4,441.707,56.08z"/> </g> </g> </g> <g> <g style="opacity:0.36;"> <rect y="426.64" width="512" height="85.333"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                                <svg onclick="deleteList('${note.id}')" xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="-57 0 512 512" width="512pt"><path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/><path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/><path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/></svg>
                            </div>
                        </div>`
    })
    notesListContainer.innerHTML = nodeString
}

function breakBigSentence(str){
    if(str.length >= 41){
        return '<span>'+str.slice(0,40)+'</span><span style="display:none;">'+str.slice(41,str.length)+'</span>.<button id="toggleBtn" onclick="toggleText(event)">view more</button>'
    }
    else{
        return str
    }
}

let isParaExpanded = false
function toggleText(e) {
    var btnText = document.getElementById("toggleBtn");
  
    if (!isParaExpanded) {
      btnText.innerHTML = "view less";
      e.target.previousElementSibling.style.display = 'inline'
      isParaExpanded = true
    } else {
      e.target.previousElementSibling.style.display = 'none'
      btnText.innerHTML = "view more";
      isParaExpanded = false
    }
  }