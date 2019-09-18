const validator= require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'description of note',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body);
    }
})

yargs.command({
    command: 'remove',
    description: 'Remove the excisting note',
    builder:{
        title:{
            decribe :'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe: 'decription of note',
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'read',
    description: 'use to read the note',
    builder: {
        title:{
            decribe :'note to read',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    description: 'use to list all the note',
    handler(){
        notes.listNote();
    }
})
yargs.parse()