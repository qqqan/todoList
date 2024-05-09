# todoList

## Sequelize

#### 模型基础

**1、模型定义**

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true
```

**2、表名推断**

默认表名（Users）是模型名称（User）的复数形式，可以强制表名称等于模型名称

```javascript
sequelize.define('User', {
  // ... (属性)
}, {
  freezeTableName: true
});
```

也可以直接提供表名

```javascript
sequelize.define('User', {
  // ... (属性)
}, {
  tableName: 'Employees'
});
```

**3、时间戳**

默认情况下，sequelize会自动为每个模型添加createAt和updateAt字段，这些字段会自动进行管理，并且直接SQL查询不会导致这些字段自动更新。可以禁用添加字段这一行为：

```javascript
sequelize.define('User', {
  // ... (属性)
}, {
  timestamps: false
});
```

也可以只启用其中之一，并未这些列提供自定义名称

```javascript
class Foo extends Model {}
Foo.init({ /* 属性 */ }, {
  sequelize,

  // 不要忘记启用时间戳！
  timestamps: true,

  // 不想要 createdAt
  createdAt: false,

  // 想要 updatedAt 但是希望名称叫做 updateTimestamp
  updatedAt: 'updateTimestamp'
});
```

**4、默认值**

可以通过defaultValue设置默认值，也可传递一些特殊的值

```javascript
sequelize.define('Foo', {
  name: {
    type: DataTypes.STRING,
    defaultValue: "Sala"
  },
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW
    // 这样,当前日期/时间将用于填充此列(在插入时)
  }
});
```

**5、数据类型**

+ 字符串

```javascript
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          仅 PostgreSQL 和 SQLite.
DataTypes.TSVECTOR           // TSVECTOR        仅 PostgreSQL.
```

+ 布尔

```javascript
DataTypes.BOOLEAN            // TINYINT(1)
```

+ 数字

```javascript
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            仅 PostgreSQL.
DataTypes.REAL(11)           // REAL(11)        仅 PostgreSQL.
DataTypes.REAL(11, 12)       // REAL(11,12)     仅 PostgreSQL.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)
```

+ 日期

```javascript
DataTypes.DATE       // DATETIME 适用于 mysql / sqlite, 带时区的TIMESTAMP 适用于 postgres
DataTypes.DATE(6)    // DATETIME(6) 适用于 mysql 5.6.4+. 支持6位精度的小数秒
DataTypes.DATEONLY   // 不带时间的 DATE
```

还有一些其他数据类型详见官方文档

#### 模型查询

**1、SELECT查询**

查询所有用户

`SELECT * FROM ...`

```javascript
const users = await User.findAll()
```

查询特定属性

`SELECT foo, bar FROM ...`

```javascript
Model.findAll({
  attributes: ['foo', 'bar']
});
```

`SELECT foo, bar AS baz, qux FROM ...`

```javascript
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux']
});
```

`SELECT foo, COUNT(hats) AS n_hats, bar FROM ...`

```javascript
Model.findAll({
  attributes: [
    'foo',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    'bar'
  ]
});
```

**2、WHERE子句**

```javascript
Post.findAll({
  where: {
    authorId: 2
  }
});
// SELECT * FROM post WHERE authorId = 2;

//传递多个校验
Post.findAll({
  where: {
    authorId: 12,
    status: 'active'
  }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

**3、UPDATE**

```javascript
// 将所有没有姓氏的人更改为 "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
```

**4、DELETE**

```javascript
// 删除所有名为 "Jane" 的人 
await User.destroy({
  where: {
    firstName: "Jane"
  }
});
```

**5、限制和分页**

```javascript
// 提取10个实例/行
Project.findAll({ limit: 10 });

// 跳过8个实例/行
Project.findAll({ offset: 8 });

// 跳过5个实例,然后获取5个实例
Project.findAll({ offset: 5, limit: 5 });
```

**6、实用方法**

`count`计算数据库中元素出现的次数

```javascript
console.log(`这有 ${await Project.count()} 个项目`);

const amount = await Project.count({
  where: {
    id: {
      [Op.gt]: 25
    }
  }
});
console.log(`这有 ${amount} 个项目 id 大于 25`);
```

`increment`和`decrement`

```javascript
await User.increment({age: 5}, { where: { id: 1 } }) // 将年龄增加到15岁
await User.increment({age: -5}, { where: { id: 1 } }) // 将年龄降至5岁
```

**7、查询器**

Finder 方法是生成 `SELECT` 查询的方法。默认情况下，所有 finder 方法的结果都是模型类的实例(与普通的 JavaScript 对象相反)。这意味着在数据库返回结果之后，Sequelize 会自动将所有内容包装在适当的实例对象中。在少数情况下，当结果太多时，这种包装可能会效率低下。要禁用此包装并收到简单的响应，请将 `{ raw: true }` 作为参数传递给 finder 方法。

+ `findAll`：生成一个标准的SELECT查询，会从表中检索所有条目

+ `findByPk`：使用提供的逐渐从表中仅获取一条

```javascript
const project = await Project.findByPk(123);
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  // 它的主键是 123
}
```

+ `findOne`：获取满足提供的可选查询参数的第一条数据

```javascript
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
```

+ `findOrCreate`：没找到就创建。 返回一个实例(找到的实例或创建的实例)和一个布尔值，指示该实例是已创建还是已经存在。

 `where`： 查找条目

 `defaults` ：来定义必须创建的内容。如果 `defaults` 不包含每一列的值，则 Sequelize 将采用 `where` 的值(如果存在)。

```javascript
//假设我们有一个空的数据库,该数据库具有一个 `User` 模型,该模型具有一个 `username` 和一个 `job`.
const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
});
console.log(user.username); // 'sdepold'
console.log(user.job); // 这可能是也可能不是 'Technical Lead JavaScript'
console.log(created); // 指示此实例是否刚刚创建的布尔值
if (created) {
  console.log(user.job); // 这里肯定是 'Technical Lead JavaScript'
}
```

+ `findAndCountAll`：结合了 `findAll` 和 `count` 。 在处理与分页有关的查询时非常有用，在分页中,你想检索带有 `limit` 和 `offset` 的数据，但又需要知道与查询匹配的记录总数。

当没有提供 `group` 时, `findAndCountAll` 方法返回一个具有两个属性的对象：

`count` - 一个整数 - 与查询匹配的记录总数

`rows` - 一个数组对象 - 获得的记录

当提供了 `group` 时, `findAndCountAll` 方法返回一个具有两个属性的对象：

`count` - 一个数组对象 - 包含每组中的合计和预设属性

`rows` - 一个数组对象 - 获得的记录

```js
const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
});
console.log(count);
console.log(rows);
```

#### 获取器，设置器&虚拟字段

**设置器**

```javascript
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // 在数据库中以明文形式存储密码是很糟糕的.
      // 使用适当的哈希函数来加密哈希值更好.
      this.setDataValue('password', hash(value));
    }
  }
});
```

#### 验证&约束

**唯一约束**

```javascript
/* ... */ {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
} /* ... */
```

如果尝试插入已存在的用户名将抛出`SequelizeUniqueConstraintError`

默认情况下null是模型每一列的允许值，可以通过设置`allowNull: false`来禁用。如果没有 `allowNull: false`, 那么调用 `User.create({})` 将会生效.

**验证器**

```javascript
sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // 匹配这个 RegExp
      is: ["^[a-z]+$",'i'],     // 与上面相同,但是以字符串构造 RegExp
      not: /^[a-z]+$/i,         // 不匹配 RegExp
      not: ["^[a-z]+$",'i'],    // 与上面相同,但是以字符串构造 RegExp
      isEmail: true,            // 检查 email 格式 (foo@bar.com)
      isUrl: true,              // 检查 url 格式 (https://foo.com)
      isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4 格式 (129.89.23.1)
      isIPv6: true,             // 检查 IPv6 格式
      isAlpha: true,            // 只允许字母
      isAlphanumeric: true,     // 将仅允许使用字母数字,因此 '_abc' 将失败
      isNumeric: true,          // 只允许数字
      isInt: true,              // 检查有效的整数
      isFloat: true,            // 检查有效的浮点数
      isDecimal: true,          // 检查任何数字
      isLowercase: true,        // 检查小写
      isUppercase: true,        // 检查大写
      notNull: true,            // 不允许为空
      isNull: true,             // 只允许为空
      notEmpty: true,           // 不允许空字符串
      equals: 'specific value', // 仅允许 'specific value'
      contains: 'foo',          // 强制特定子字符串
      notIn: [['foo', 'bar']],  // 检查值不是这些之一
      isIn: [['foo', 'bar']],   // 检查值是其中之一
      notContains: 'bar',       // 不允许特定的子字符串
      len: [2,10],              // 仅允许长度在2到10之间的值
      isUUID: 4,                // 只允许 uuid
      isDate: true,             // 只允许日期字符串
      isAfter: "2011-11-05",    // 仅允许特定日期之后的日期字符串
      isBefore: "2011-11-05",   // 仅允许特定日期之前的日期字符串
      max: 23,                  // 仅允许值 <= 23
      min: 23,                  // 仅允许值 >= 23
      isCreditCard: true,       // 检查有效的信用卡号

      // 自定义验证器的示例:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
});
```

#### 关联

**定义关联**

```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A 有一个 B
A.belongsTo(B); // A 属于 B
A.hasMany(B); // A 有多个 B
A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
```

`A` 称为 **源** 模型,而 `B` 称为 **目标** 模型. 此术语很重要.

`A.hasOne(B)` 关联意味着 `A` 和 `B` 之间存在一对一的关系,外键在目标模型(`B`)中定义.

`A.belongsTo(B)`关联意味着 `A` 和 `B` 之间存在一对一的关系,外键在源模型中定义(`A`).

`A.hasMany(B)` 关联意味着 `A` 和 `B` 之间存在一对多关系,外键在目标模型(`B`)中定义.

这三个调用将导致 Sequelize 自动将外键添加到适当的模型中(除非它们已经存在).

`A.belongsToMany(B, { through: 'C' })` 关联意味着将表 `C` 用作[联结表](https://en.wikipedia.org/wiki/Associative_entity),在 `A` 和 `B` 之间存在多对多关系. 具有外键(例如,`aId` 和 `bId`). Sequelize 将自动创建此模型 `C`(除非已经存在),并在其上定义适当的外键.

**创建标准关系**

- 创建一个 **一对一** 关系, `hasOne` 和 `belongsTo` 关联一起使用;
- 创建一个 **一对多** 关系, `hasMany` he `belongsTo` 关联一起使用;
- 创建一个 **多对多** 关系, 两个 `belongsToMany` 调用一起使用.

**一对多关系**

```javascript
Team.hasMany(Player);
Player.belongsTo(Team);

// 修改外键名称
Team.hasMany(Player, {
  foreignKey: 'clubId'
});
Player.belongsTo(Team);
```

## 业务场景及接口设计

#### 登录

接收前端请求的参数，从中解析出手机号和密码，判断手机号是否存在，不存在直接返回。如存在则进行数据库查询，没有找到返回手机号或密码错误，查询到则生成token返回

利用jsonwebtoken生成token：[Nodejs中使用jsonwebtoken（JWT）生成token的场景使用_使用 import nodersa from 'node-rsa'; import jwt from-CSDN博客](https://blog.csdn.net/weixin_42863800/article/details/108410690)

[JSON Web Token 入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

post和get区别[GET和POST请求的区别（超详细）-CSDN博客](https://blog.csdn.net/qq_43588129/article/details/115218995)

#### 退出

首先进行token验证，验证通过的话直接清除cookie即可

#### 增删改查

详见接口文档：

https://apifox.com/apidoc/shared-d2e90616-786e-49a0-95b6-6e8434133ddb



## 修改数据库

开发过程中添加了一个任务完成展示的功能，为了记录task完成时间，需要在表taskLists添加finishedDate属性，因此需要使用sequelize CLI进行数据库修改

#### 1. 安装sequelize CLI

首先需要确保在项目中安装了sequelize，如果没有安装可以通过npm进行安装`npm install --save sequelize`

运行`npm install -g sequelize-cli`进行全局安装

安装完成后可以通过运行`sequelize-cli --version`查看是否安装成功，安装成功会显示版本号

#### 2. 初始化sequelize CLI并配置

终端运行`sequelize init`进行初始化，初始化会在项目中生成一个config/config.json文件

在config/config.json文件中进行配置，分别为开发、测试、生产环境，这里只配置了开发环境

```json
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "db_todolist",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
    //
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "di
      alect": "mysql"
  }
}
```

#### 3. 更新模型

在taskLists的模型定义中，添加新的字段finishedDate

```javascript
module.exports = (sequelize, Sequelize, DataTypes) => {
    const taskLists = sequelize.define("taskLists", {
       // 其他字段定义
        finishedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        timestamps: false
    })
    return taskLists
}
```

#### 4. 迁移数据库

为保证数据库中表与模型一致，需要创建一个数据库迁移来添加新的finishedDate列到taskLists表中。使用sequelize CLI来创建并运行迁移

+ 创建迁移 `sequelize migration:create --name add-finished-date-to-tasklists`，运行后会生成一个migrations文件夹

+ 在生成的迁移文件中，修改代码

  ```javascript
  const { DataTypes } = require('sequelize')
  'use strict';
  
  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('taskLists', 'finishedDate', {
        type: DataTypes.DATEONLY,
        allowNull: true
      })
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
    },
  
    async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    }
  };
  
  ```

+ 运行迁移`sequelize db:migrate`

此时，数据库中已添加finishedDate列

#### ![image-20240417170800120](D:\大学\各种笔记（typora）\机器学习\图片\image-20240417170800120.png)





## axios传参方式

注意get和post请求的传参方式

[Axios 的 get 请求如何使用？传参写法有哪几种？ (apifox.com)](https://apifox.com/apiskills/axios-get-request/#axios-的-get-请求传参写法)

[Axios 的 post 请求如何使用？传参写法有哪几种？ (apifox.com)](https://apifox.com/apiskills/axios-post-request/#23-传递-urlsearchparams-对象)

get后端要用req.query获取数据

post后端要用req.body获取数据



## 登录功能前后端逻辑

前后端token验证流程：

前端发送登录请求-->后端登录接口接收-->后端数据处理后返回给前端token-->前端将token存储后-->每次请求都带着这个token去访问-->后端设置jwtoken拦截器-->只放行登陆接口-->如果前端访问别的接口必须带有token-->否则被拦截器拦截，并让前端返回到登陆界面

1. 后端登录接口

   登录成功时利用jwt设置token并返回给前端

   jwt：json web token，主要用于服务端和客户端保持登陆状态使用，包含header.payload.singnature

   ```javascript
   Users.findOne({ where: { phoneNum: phoneNum, password: password } })
           .then(data => {
               if (data !== null) {
                   const payload = { id: data.id, phoneNum: data.phoneNum };
                   const secretKey = '123456';
                   const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); //1h后token过期
                   res.send({
                       token: token,
                       code: 200,
                       message: "登陆成功",
                       data: data  // 返回用户数据
                   });
               } else {
                   res.status(400).send({
                       message: "手机号或密码错误"
                   });
               }
           })
           .catch(err => {
               console.error(err);
               res.status(500).send({
                   message: "服务器错误"
               });
           });
   ```

2. 前端存储token，防止用户修改localStorage中的token

3. 此后前端每次请求都会携带token，通过设置axios请求拦截器实现

   ```javascript
   // 请求拦截器
   request.interceptors.request.use(
       (config) => {
           const userStore = useUserStore()
           if (userStore.token) {
               config.headers.token = userStore.token
           }
           return config
       }
   )
   ```

4. 后端拦截请求，验证token通过才放行

   ```javascript
   const jwt = require('jsonwebtoken');
   const secretKey = "123456"  // 引入密钥，需要根据实际情况修改
   
   const verifyToken = (req, res, next) => {
       // 从请求头中获取 token
       const token = req.headers.token;
   
       // 如果没有 token，返回未授权错误
       if (!token) {
           return res.status(401).json({ error: '没有找到token' });
       }
   
       try {
           // 验证 token 是否有效
           jwt.verify(token, secretKey, (err, user) => {
               if (err) return res.sendStatus(401)
               req.user = user; // 将解码后的用户信息存储到请求对象中
               next(); // 鉴权通过，继续执行下一个中间件或路由处理函数
           });
   
       } catch (err) {
           // token 验证失败，返回错误信息
           return res.status(403).json({ error: '无权访问' });
       }
   };
   
   module.exports = verifyToken;
   ```

   并在server.js中设置放行登录接口

   ```javascript
   const verifyToken = require('./app/public/verifyToken')
   // 放行登录接口
   app.use((req, res, next) => {
       if (req.url === '/api/users/login') {
           next()
       } else {
           verifyToken(req, res, next)
       }
   })
   ```

5. 前端设置响应拦截器，token过期或者token验证不通过都会跳转到登录页

   ```javascript
   // 响应拦截器
   request.interceptors.response.use(
       (response) => {
           return response.data
       },
       (error) => {
           const userStore = useUserStore()
           let message = ''
           const status = error.response.status
           switch (status) {
               case 401:
                   console.log("token过期")
                   message = 'TOKEN过期'
                   // 清除token信息，跳转到登录页
                   localStorage.removeItem('token')
                   userStore.clearUserInfo()
                   router.push('/')
                   break
               case 403:
                   message = '无权访问'
                   console.log("无权访问")
                   // 清除token信息，跳转到登录页
                   localStorage.removeItem('token')
                   userStore.clearUserInfo()
                   router.push('/')
                   break
               case 404:
                   message = '请求地址错误'
                   break
               case 500:
                   message = '服务器出现问题'
                   break
               default:
                   message = '网络出现问题'
                   break
           }
           ElMessage({
               type: 'error',
               message,
           })
           return Promise.reject(error)
       }
   )
   ```



## 渲染机制

calender界面的布局我是直接从组件calender中复制粘贴过来的，从home页跳转到calender页样式会丢失，刷新后会恢复。但是从其他页面跳转过来样式不会丢失。可能是vue渲染机制导致这种情况的发生

[渲染函数 & JSX | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/render-function.html)

#### 虚拟DOM

一个运行时渲染器会遍历整个虚拟DOM树，并据此构建真实的DOM树，这个过程被称为挂载（mount）。如果有两份虚拟DOM树，渲染器会比较地遍历，找出区别，并应用这其中的变化到真实的DOM上，这个过程被称为更新（patch），又被称为”比对“（diffing）或”协调“（reconciliation）

#### 渲染管线

vue组件挂载会发生如下几件事：

1. 编译：vue模板被编译为用来返回虚拟DOM树的函数（渲染函数）
2. 挂载：运行时渲染器调用渲染函数，遍历返回虚拟DOM树，并基于它创建实际的DOM节点
3. 更新：当一个依赖发生变化后，会重新创建一个更新后的虚拟DOM树。运行时会与旧树进行比较，将必要的更新应用到真实DOM上

> 从主页跳转到calender时，相同类名的样式不会被更新，因此样式丢失了

#### 带编译时信息的虚拟DOM

为紧密耦合的模板渲染器应用许多编译时优化，编译器可以静态分析模板并在生成的代码中留下标记，运行时能够尽可能走捷径

vue编译器用来提高虚拟DOM运行时性能的主要优化：

1. 静态提升：完全静态的节点没有必要在重新渲染时再次创建和比对，因此编译器会自动提升这部分vnode创建函数到这个模板的渲染函数之外，并在每次渲染时使用这份相同的vnode

2. 更新类型标记：为有单个动态绑定的元素生成渲染函数时，vue在vnode创建调用中直接编码了每个元素所需的更新类型

   ![image-20240422222839377](D:\大学\各种笔记（typora）\机器学习\图片\image-20240422222839377.png)

   最后的参数就是更新类型标记，运行时渲染器会使用位运算来检查这些标记，确定相应的更新操作

3. 树结构打平：返回的虚拟DOM树经过特殊的createElementBlock()调用创建。只会追踪所有带更新类型标记的后代节点，这种就是打平的树

#### 解决方案：scoped+样式穿透

https://juejin.cn/post/7023343999909888037

解决方案：

在样式外边再套一个div，使用vue深度选择器

1. scoped

作用：加上scoped，最终生成的dom和style都会被加上一个唯一的动态属性，这样样式只会对当前组件有效，不会污染全局样式。因此在写一些通用组件时可以不加scoped，此时需要注意尽量不要书写相同类名的样式（最近就被active的样式坑了），写其他子组件最好带scoped

原理：为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件实例的标识符，我称它为组件实例标识，简称实例标识，记作 InstanceID；

给组件模板中的每一个标签对应的Dom元素（组件标签对应的Dom元素是该组件的根元素）添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；

给组件的作用域样式 `<style scoped>` 的每一个选择器的最后一个选择器单元增加一个属性选择器 `原选择器[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id > div`，则更改后的选择器为 `.cls #id > div[data-v-e0f690c0]`；

2. ：deep作用

作用：样式穿透能够修改子组件样式，并且带有scoped就不会污染全局样式

原理：

1. 为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件的标识符，我称它为实例标识，记作 InstanceID；
2. 给组件模板中的每一个标签对应的Dom元素（组件标签对应的Dom元素是该组件的根元素）添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；
3. 给组件的作用域样式 `<style scoped>` 的每一个深度作用选择器前面的一个选择器单元增加一个属性选择器`[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id >>> div`，则更改后的选择器为 `.cls #id[data-v-e0f690c0] div`；

因为Vue不会为深度作用选择器后面的选择器单元增加 属性选择器`[data-v-实例标识]`，所以，后面的选择器单元能够选择到子组件及后代组件中的元素；

注：

不能在<style scoped></style>中修改，不使用：deep的话无法修改子组件中的样式

不能在<style></style>>中修改，类名不变样式不会被重新更新，并且没有scoped会污染全局样式



## 切换主题

切换主题的原理：

```css
:root{
    --el-button-size-large:24px
}

// index.scss
.get-root-var{
    font-size:var(--el-button-size-large)
}
```

定义在:root中的变量，可以在全局通过var()进行引用

切换主题的时候通过类来设置，类名发生变化，主题就发生变化

```javascript
export const toggleHtmlClass = (className)=>{
    document.querySelectorAll('html')[0].className = className
}
```

理论上主题应该保存在用户数据库中，但这里偷懒就把主题存储在pinia库中，并且pinia利用piniaPluginPersistedstate插件实现了持久化存储（原理：数据保存在本地存储中，如localStorage/sessionStorage），即使页面刷新，也能保留这些状态的值。实现方法如下：

```javascript
// 设置相关数据
import { defineStore } from "pinia";

export const useConfigStore = defineStore('config', {
    state() {
        return {
            theme: localStorage.getItem("Theme") || "base"
        }
    },
    actions: {
        changeTheme(theme: string) {
            document.documentElement.setAttribute('theme', theme)
            this.theme = theme
            localStorage.setItem('Theme', theme)
        }
    }
})
```
