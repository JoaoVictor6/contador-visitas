import {exec} from 'child_process'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateImage(numberOfVisitors = 0){
  const IMAGE_BASE_PATH = path.resolve(__dirname, 'assets/base.png')
  const FONT_FAMILY_PATH = path.resolve(__dirname, 'assets/russo_one.ttf')
  const POINTSIZE = 50
  const IMAGE_NAME_PATH = path.resolve(__dirname, '../../static/counter.png')
  const NUMBER_OF_COUNT = String(numberOfVisitors).padStart(4, '0')
  const COMMAND = `convert ${IMAGE_BASE_PATH} -font ${FONT_FAMILY_PATH} -gravity center -pointsize ${POINTSIZE} -draw "text 0,0 '${NUMBER_OF_COUNT}'" ${IMAGE_NAME_PATH}`

  exec(COMMAND, (err, stdout) => {
    if(err){
      console.log(`
        ${chalk.bgRed(chalk.bold('ERROR:'))} ${err.code}
        ${chalk.bgRed(chalk.bold('MESSAGE:'))} ${err.message.split('\n')[1]}
      `)
      return
    }
  
    console.log(`
      ${chalk.bgGreenBright(chalk.bold('SUCCESS:'))} image was generated on ${IMAGE_NAME_PATH}
    `)
  })
}

generateImage()