import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import c from 'picocolors'
import { CHECK, WARN, PREFIX } from './constants'
import { nanoid } from 'nanoid'
import execa from 'execa';

export interface CliOptions {
  /**
   * @default `antd.min.css`
   */
  output?: string;
  input?: string;
  overwrite?: boolean;
}

const tsxPath = require.resolve('tsx/cli');
const coreFilePath = path.join(__dirname, '..');

export async function run(options: CliOptions = {}) {
  const { output = "antd.min.css", input = '', overwrite } = options;
  const OVERWRITE = !!process.env.ALLAY_OVERWRITE /** Can be used for CI */ || overwrite;

  const cwd = process.cwd()

  const outputFilePath = path.join(cwd, output);
  const inputFilePath = path.join(cwd, input);

  const userInputFileExits = input.length > 0 && fs.existsSync(inputFilePath)

  if (input.length > 0 && !userInputFileExits) {
    console.log(c.yellow(`${WARN} ${input.length ? c.bold(input) : 'input'} is not exists.`));
  }

  if (fs.existsSync(outputFilePath) && !OVERWRITE) {
    throw new Error(`${output} is already exists.`);
  }

  const outputDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // ====== Generate temp file ======
  const id = nanoid().replaceAll('-', '_');
  const fileExt = userInputFileExits ? path.extname(inputFilePath) : '.js';
  const internalFileName = `.temp_${PREFIX}_${id}${fileExt}`,
    internalVariable = `${PREFIX}_${id}`;
  let internalFileContent = '';

  if (userInputFileExits) {
    internalFileContent += `import ${internalVariable} from ${JSON.stringify(inputFilePath)};\n`
  } else {
    internalFileContent += `const ${internalVariable} = void 0;\n`
  }

  internalFileContent += `
import { extractStyle } from ${JSON.stringify(coreFilePath)};
import fs from 'fs';
fs.writeFileSync(${JSON.stringify(outputFilePath)}, extractStyle(${internalVariable}));
`.trim();

  const tmpFilePath = path.join(os.tmpdir(), internalFileName);
  const symlinkPath = path.join(path.dirname(inputFilePath), internalFileName);
  fs.writeFileSync(tmpFilePath, internalFileContent, { encoding: 'utf-8', mode: 0o777 });
  fs.symlinkSync(tmpFilePath, symlinkPath, 'file');

  execa.node(tsxPath, [symlinkPath])
    .then(() => {
      console.log(c.green(`${CHECK} ${c.bold(output)} is generated.`));
    })
    .finally(() => {
      fs.unlinkSync(symlinkPath);
    })
}
