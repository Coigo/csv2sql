import { Readable, Transform, Writable } from 'stream'
import { createReadStream } from 'fs'
import ReadLine  from 'readline'
import { prisma } from '../prisma/index'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { CsvParser } from '../node_modules/csv-parser/index'


const asyncPipe = promisify(pipeline)
const file = 'sinapi_file.csv'

const stream = createReadStream(file)
const readableStream = new Readable({
    read: function () {
        stream.on('data', (chunk) => {
            this.push(chunk)
        })
        stream.on('end', () => {
            this.push(null)
        })
    }
})

await asyncPipe ([  
    readableStream 
])




/**
 
    const lines = ReadLine.createInterface({
            input: stream,
            crlfDelay: Infinity
        })
        

    lines.on('line', async (line) => {
            const lineTdo = tmp_lineToObject(line) 
        })
        
        let count = 0
        function tmp_lineToObject (line: string) {
            if ( count === 0 ) {
                console.log(line);
            } 
            count++         
            lines.close() 
    }
 
 */