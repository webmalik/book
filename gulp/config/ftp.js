import dotenv from 'dotenv'

dotenv.config()

export let configFTP = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	parallel: 5
}