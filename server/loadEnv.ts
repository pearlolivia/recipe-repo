import commandLineArgs from 'command-line-args'
import dotenv from 'dotenv'
import path from 'path'

const options = commandLineArgs([{ name: 'env', alias: 'e', defaultValue: 'development', type: String }])
const res = dotenv.config({ path: path.join(__dirname, `./.env.${options.env}`) })