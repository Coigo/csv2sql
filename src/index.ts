import { Readable, Transform, Writable } from 'stream'
import { createReadStream } from 'fs'
import ReadLine  from 'readline'
import { prisma } from './prisma.js'
import { pipeline } from 'stream'
import { promisify } from 'util'
import csv from 'csv-parser'


const asyncPipe = promisify(pipeline)
const transformIntoObject = csv
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

const writeToDatabase = new Writable({
    objectMode: true,

    write: async (data, enc, callBack) => {
        await prisma.sinapi.create({
            data: {
                descricaoDaClasse: data.descricaoDaClasse
            }
        })
        callBack()
    }
})

await asyncPipe ([  
    readableStream,
    transformIntoObject(),
    writeToDatabase

])




