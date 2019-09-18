const fs = require('fs')
const chalk = require('chalk')
const readNote = function(title){
    const notes = loadNotes();
    const dup = notes.find((note)=> {
        return note.title === title;
    });
    if(dup){
        console.log(chalk.bold.inverse(dup.title));
        console.log(dup.body);
    }
    else{
        console.log(chalk.red.inverse('Title not found'));
    }
}

const addNote = function(title,body){
    const notes = loadNotes();
    
    // const duplicateNotes = notes.filter((note)=>{
    //     return note.title ===   title;
    // })
    const duplicateNotes = notes.find((note)=> note.title===title);

    if(duplicateNotes.length==0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('Note has been added successfully'));
    }
    else{
        console.log(chalk.red.inverse("This note title is already taken"));
    }
   
}

const saveNotes =  function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}
const loadNotes = function() {
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const listNote = function(){
    const notes = loadNotes();
    console.log(chalk.red('The list of notes Available'));
    notes.forEach(note => {
        console.log(note.title);
    });
}
const removeNote = function(title){
    const notes = loadNotes();

    const NotesToKeep = notes.filter((note)=>{
        return note.title !== title;
    })
    
    if(notes.length != NotesToKeep.length){
        console.log(chalk.bgGreen('Node removed'));
    }
    else{
        console.log(chalk.bgRed('NO note to remove'));
    }

    saveNotes(NotesToKeep);
}



module.exports={
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote
}