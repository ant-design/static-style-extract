import process from 'process'
import c from 'picocolors'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import { CROSS, version, name } from './constants'
import { run } from './run'

function header() {
  console.log(`\n${c.green(`${name} `)}${c.dim(`v${version}`)}`)
}

const instance = yargs(hideBin(process.argv))
  .scriptName(name)
  .usage('')
  .command(
    '*',
    'Generate static css',
    args => args
      .option('output', {
        alias: 'o',
        description: 'Output file path',
        type: 'string',
        default: 'antd.min.css'
      })
      .option('input', {
        alias: 'i',
        description: 'Input file path',
        type: 'string'
      })
      .option('overwrite', {
        alias: 'w',
        description: 'Overwrite existing files',
        type: 'boolean'
      })
      .help(),
    async (args) => {
      header()
      console.log()
      try {
        await run(args)
      }
      catch (error) {
        console.error(c.inverse(c.red(' Failed to generate ')))
        console.error(c.red(`${CROSS} ${String(error)}`))
        process.exit(1)
      }
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', version)
  .alias('v', 'version')

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
instance.help().argv