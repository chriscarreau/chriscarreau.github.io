import { promises as fs } from 'fs'
import { render } from 'resumed'

const args = process.argv.slice(2);
const name = args[0];
const theme  = await import(`jsonresume-theme-${args[1]}`);
const output = args[2];

const resume = JSON.parse(await fs.readFile(`${name}.resume.json`, 'utf-8'))
const html = await render(resume, theme.default)

await fs.writeFile(`${output}.html`, html);