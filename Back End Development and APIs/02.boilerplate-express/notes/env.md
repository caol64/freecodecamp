`.env` 文件通常用于存储应用程序的配置信息，例如数据库连接字符串、API 密钥等敏感信息。以下是一个 Node.js 应用程序可能使用的简单 `.env` 文件的示例：

```plaintext
# .env 文件示例

# 应用程序端口
PORT=3000

# 数据库连接字符串
DB_CONNECTION_STRING=mongodb://localhost:27017/mydatabase

# API 密钥
API_KEY=your_api_key_here

# 其他配置项...
```

在这个例子中，`PORT` 是应用程序的端口号，`DB_CONNECTION_STRING` 是 MongoDB 数据库的连接字符串，`API_KEY` 是某个 API 的密钥。你可以根据你的应用程序需要添加其他配置项。

请注意，`.env` 文件中的配置项通常是敏感信息，因此应该被添加到 `.gitignore` 文件中，以防止它们被不小心提交到版本控制系统中。

在 Node.js 应用程序中，可以使用 `dotenv` 库来加载 `.env` 文件中的配置。确保你已经安装了 `dotenv`：

```bash
npm install dotenv
```

然后，在你的应用程序的入口文件中，添加以下代码：

```javascript
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const apiKey = process.env.API_KEY;

// 使用配置项...
```

这样，你就可以在应用程序中使用 `process.env` 来访问 `.env` 文件中定义的配置项。在生产环境中，可以通过其他方式设置这些环境变量，而不是依赖于 `.env` 文件。