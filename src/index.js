import express from 'express';
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';
import { cache } from './services/cache/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/counter.png', (req, res, next) => {
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