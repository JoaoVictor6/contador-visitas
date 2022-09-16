const { exec } = require('child_process')
const htmlMinify = require('html-minifier').minify;
const fs = require('fs')
const chalk = require('chalk')

const controller = new AbortController();
const { signal } = controller;


const mainProcess = exec(`
  rm -rf build
  && mkdir -p build/services/cache build/services/counterPanelCreator/ build/static 
  && cp src/index.js build/index.js
  && cp src/services/cache/index.js build/services/cache/index.js
  && cp src/services/counterPanelCreator/index.js build/services/counterPanelCreator/index.js
`.replaceAll('\n', ' '))

mainProcess.on('exit', () => {
  // CSS
  const fistPartProcessCSS = exec(
    'npx postcss src/static/style.css --use autoprefixer -d build/', 
    {signal},
    (err) => {
    if(err)throw err
  
    console.log(chalk.greenBright('CSS Part 1: SUCCESS'))
    }
  )
  fistPartProcessCSS.on('close', () => {
    const lastProcessCSS = exec(
      'npx postcss build/style.css > build/static/style.css', 
      {signal},
      (err) => {
        if(err)throw err
    
        console.log(chalk.greenBright('CSS: SUCCESS'))
      }
    )
    lastProcessCSS.on('exit', () => {
      fs.rmSync('build/style.css')
    })
  })
  
  // HTML
  const htmlFileText = fs.readFileSync('./src/static/index.html')
  const minifyHTML = htmlMinify(
    htmlFileText.toString('utf-8'),
    {
      removeComments: true,
      preserveLineBreaks: false
    }
  )
  
  fs.writeFileSync('build/static/index.html', minifyHTML)
  console.log(chalk.bgGreen('move static files is completed'.toUpperCase()))
  
  // CREATE ASSETS FOLDER
  exec('mkdir build/services/counterPanelCreator/assets/')
  // MOVE IMAGE
  exec('cp src/services/counterPanelCreator/assets/base.png build/services/counterPanelCreator/assets/base.png')
  // MOVE FONT FAMILY
  exec('cp src/services/counterPanelCreator/assets/russo_one.ttf build/services/counterPanelCreator/assets/russo_one.ttf')
})