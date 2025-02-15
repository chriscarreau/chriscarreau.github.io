import { promises as fs } from 'fs'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const args = process.argv.slice(2);
const name = args[0];
const theme  = await import(`jsonresume-theme-${args[1]}`);

const resume = JSON.parse(await fs.readFile(`${name}.resume.json`, 'utf-8'))
const html = await render(resume, theme.default)

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ path: `${name}.pdf`, format: 'a4', printBackground: true })
await browser.close()