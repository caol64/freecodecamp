在 Node.js 中，中间件（Middleware）是一种机制，用于在处理 HTTP 请求的过程中执行一系列的函数。这些函数可以修改请求对象（request）、响应对象（response），或者终止请求-响应循环。中间件通常被串联起来，形成一个处理请求的管道。

每个中间件函数都有访问请求对象、响应对象、以及下一个中间件函数的能力。中间件可以用来执行一些通用的任务，例如日志记录、身份验证、数据解析等。以下是一个简单的中间件函数的例子：

```javascript
// 一个简单的中间件函数
function myMiddleware(req, res, next) {
  console.log('Middleware executed!');
  next(); // 调用 next 表示继续执行下一个中间件或路由处理函数
}

// 在应用程序中使用中间件
const express = require('express');
const app = express();

// 使用中间件
app.use(myMiddleware);

// 路由处理函数
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

在这个例子中，`myMiddleware` 是一个简单的中间件函数，当请求到达时，它会输出一条日志并调用 `next()` 来继续执行下一个中间件或路由处理函数。

Express 是一个流行的 Node.js 框架，它广泛使用中间件。你可以通过 `app.use` 或类似的方法将中间件添加到 Express 应用程序中。例如，使用 `express.json()` 中间件可以解析请求体中的 JSON 数据。

```javascript
const express = require('express');
const app = express();

// 使用 express.json 中间件解析 JSON 数据
app.use(express.json());

// 处理 POST 请求
app.post('/api/data', (req, res) => {
  const data = req.body;
  // 处理数据...
  res.json({ message: 'Data received successfully' });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

通过使用中间件，你可以将应用程序的功能拆分为更小的、可重用的部分，使得代码更易于维护和扩展。