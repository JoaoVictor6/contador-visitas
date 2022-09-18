import express from 'express';
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';
import { cache } from './services/cache/index.js';
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser())

app.use('/counter.png', (req, res, next) => {
  const wasAccessedCookie = req.cookies.wasAccessedCookie
  if(wasAccessedCookie){
    next()
    return
  }
  res.cookie('wasAccessedCookie', true, {maxAge: 9999999})
  console.log('user requested the counter image', req.ip)
  cache.set(`visitors#${req.ip}`)
  cache.emit('addingAddress')
  next()
})
app.use(express.static(path.resolve(__dirname, 'static')))

const port = process.env.PORT || 3003
app.listen(port, () => console.log(`
  ${chalk.redBright('㊋:')} ${chalk.greenBright(`Server was running in: http://localhost:${port}`)}
`))
