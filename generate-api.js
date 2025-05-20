import pkg from 'openapi-typescript-codegen';
const { generateApi } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保输出目录存在
const apiDir = path.join(__dirname, 'src', 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// 生成API客户端代码
generateApi({
  input: path.join(__dirname, 'src', 'openapi.yml'),
  output: apiDir,
  httpClient: 'axios',
  useOptions: true,
  useUnionTypes: true,
}).then(() => {
  console.log('API客户端代码生成成功！');
}).catch(err => {
  console.error('API客户端代码生成失败:', err);
});