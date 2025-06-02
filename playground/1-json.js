import fs from 'fs'
import { json } from 'stream/consumers'

const readBuffer = fs.readFileSync('1-json.json')
const data = readBuffer.toString()
const dataObject = JSON.parse(data)
console.log(JSON.parse(data))
dataObject.name = "Dank"
dataObject.age = 22

console.log(dataObject)

fs.writeFileSync('1-json.json', JSON.stringify(dataObject))