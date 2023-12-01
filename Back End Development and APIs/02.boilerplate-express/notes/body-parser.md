在 Express.js 中，`body-parser` 中间件用于解析请求体中的数据，特别是对 POST 请求的表单数据或 JSON 数据的解析。以下是一个使用 `body-parser` 的简单例子：

首先，确保你已经安装了 `body-parser`：

```bash
npm install body-parser
```

然后，在你的 Express 应用程序中使用 `body-parser`：

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 处理 POST 请求，解析表单数据
app.post('/form', (req, res) => {
  const formData = req.body;
  res.json({ formData });
});

// 处理 POST 请求，解析 JSON 数据
app.post('/json', (req, res) => {
  const jsonData = req.body;
  res.json({ jsonData });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

在这个例子中：

- `body-parser.urlencoded({ extended: true })` 用于解析表单数据。
- `body-parser.json()` 用于解析 JSON 数据。

这样，你就可以在路由处理函数中通过 `req.body` 访问解析后的数据。

例如，如果你使用 POST 请求发送表单数据到 `/form`，则可以通过 `req.body` 获取表单数据：

```bash
curl -X POST -d "username=johndoe&password=secret" http://localhost:3000/form
```

如果你使用 POST 请求发送 JSON 数据到 `/json`，则可以通过 `req.body` 获取 JSON 数据：

```bash
curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://localhost:3000/json
```

以上是一个简单的例子，实际应用中可能需要更多的配置和处理，具体取决于你的需求。