# VitePress 网站维护指南

## 📋 目录
- [开发环境](#开发环境)
- [日常操作](#日常操作)
- [内容管理](#内容管理)
- [配置修改](#配置修改)
- [部署发布](#部署发布)

---

## 🚀 开发环境

### 启动开发服务器
```bash
npm run docs:dev
```
默认访问地址：http://localhost:5173

### 构建生产版本
```bash
npm run docs:build
```
构建产物位于：`docs/.vitepress/dist/`

### 本地预览生产版本
```bash
npm run docs:preview
```

---

## 📝 日常操作

### 1. 添加新博客文章

**步骤：**

1. 在 `docs/blog/` 目录下创建新的 Markdown 文件，例如：
   ```bash
   docs/blog/my-first-post.md
   ```

2. 在文件顶部添加 frontmatter（元数据）：
   ```markdown
   ---
   title: 我的第一篇博客
   date: 2025-11-30
   author: 余科震
   tags:
     - 技术
     - 学习
   description: 这是文章的简短描述
   ---

   # 我的第一篇博客

   这里是正文内容...
   ```

3. 更新 `docs/.vitepress/config.mts` 中的侧边栏配置：
   ```typescript
   sidebar: {
     '/blog/': [
       {
         text: '学习博客',
         items: [
           { text: '博客列表', link: '/blog/' },
           { text: '我的第一篇博客', link: '/blog/my-first-post' },
           // 新文章添加在这里
         ]
       }
     ],
   }
   ```

### 2. 添加新项目

**步骤：**

1. 在 `docs/projects/` 目录下创建新的 Markdown 文件：
   ```bash
   docs/projects/awesome-project.md
   ```

2. 编写项目内容：
   ```markdown
   ---
   title: 我的超赞项目
   date: 2025-11-30
   tech:
     - Vue.js
     - TypeScript
   github: https://github.com/your-github-id/awesome-project
   demo: https://your-demo-url.com
   ---

   # 我的超赞项目

   ## 项目简介
   项目描述...

   ## 技术栈
   - Vue.js 3
   - TypeScript
   - Vite

   ## 功能特性
   - 功能1
   - 功能2

   ## 项目截图
   ![截图](./images/screenshot.png)
   ```

3. 更新侧边栏配置（与博客类似）

### 3. 修改现有内容

直接编辑对应的 `.md` 文件即可，开发服务器会自动热重载。

---

## ⚙️ 配置修改

### 修改网站标题和描述

编辑 `docs/.vitepress/config.mts`：

```typescript
export default defineConfig({
  title: "你的新标题",
  description: "你的新描述",
  // ...
})
```

### 修改导航栏

在 `config.mts` 的 `themeConfig.nav` 中：

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '新导航项', link: '/new-page/' },
  // 添加下拉菜单
  {
    text: '更多',
    items: [
      { text: '子项1', link: '/item1/' },
      { text: '子项2', link: '/item2/' }
    ]
  }
]
```

### 添加新的顶级页面

1. 在 `docs/` 目录下创建新文件夹，例如 `docs/tutorials/`
2. 创建 `docs/tutorials/index.md`
3. 在导航栏和侧边栏配置中添加对应项

### 修改社交链接

```typescript
socialLinks: [
  { icon: 'github', link: 'https://github.com/your-actual-id' },
  { icon: 'twitter', link: 'https://twitter.com/your-id' },
  { icon: 'linkedin', link: 'https://linkedin.com/in/your-id' }
]
```

支持的图标：`github`, `twitter`, `discord`, `linkedin`, `facebook`, `instagram`, `youtube`, `slack`

### 自定义主题颜色

创建 `docs/.vitepress/theme/custom.css`：

```css
:root {
  --vp-c-brand-1: #3eaf7c;
  --vp-c-brand-2: #42b883;
  --vp-c-brand-3: #35495e;
}
```

然后在 `docs/.vitepress/theme/index.ts` 中导入：

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

---

## 📂 文件结构说明

```
devtools-mcp-website/
├── docs/                          # 所有内容文件
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.mts           # 主配置文件
│   │   ├── theme/               # 自定义主题（可选）
│   │   └── dist/                # 构建输出（自动生成）
│   ├── index.md                 # 首页
│   ├── about/
│   │   └── index.md             # 关于页面
│   ├── blog/
│   │   ├── index.md             # 博客列表页
│   │   └── *.md                 # 各个博客文章
│   ├── projects/
│   │   ├── index.md             # 项目列表页
│   │   └── *.md                 # 各个项目
│   └── public/                  # 静态资源（图片、文件等）
└── package.json                  # 项目配置
```

---

## 🖼️ 图片和资源管理

### 方法1：使用 public 目录（推荐）

1. 将图片放在 `docs/public/images/` 目录
2. 在 Markdown 中引用：
   ```markdown
   ![描述](/images/my-image.png)
   ```

### 方法2：使用相对路径

1. 在内容目录下创建 `images` 文件夹
2. 使用相对路径引用：
   ```markdown
   ![描述](./images/my-image.png)
   ```

---

## 🚢 部署发布

### 部署到 GitHub Pages

1. 在 `docs/.vitepress/config.mts` 中设置 base：
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

2. 创建 `.github/workflows/deploy.yml`：
   ```yaml
   name: Deploy VitePress site to Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build with VitePress
           run: npm run docs:build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: docs/.vitepress/dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       needs: build
       runs-on: ubuntu-latest
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 GitHub Actions 作为来源

### 部署到 Vercel

1. 在 Vercel 中导入你的 GitHub 仓库
2. 构建设置：
   - Build Command: `npm run docs:build`
   - Output Directory: `docs/.vitepress/dist`
3. 点击部署

### 部署到 Netlify

1. 在 Netlify 中连接你的仓库
2. 构建设置：
   - Build command: `npm run docs:build`
   - Publish directory: `docs/.vitepress/dist`
3. 点击部署

---

## 🎨 常用 Markdown 语法

### 代码块
\`\`\`javascript
const hello = 'world'
\`\`\`

### 提示框
```markdown
::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险警告
:::

::: details 点击查看详情
这是详细内容
:::
```

### 徽章
```markdown
<Badge type="info" text="新" />
<Badge type="tip" text="推荐" />
<Badge type="warning" text="注意" />
<Badge type="danger" text="已废弃" />
```

---

## 📚 常用命令速查

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:build` | 构建生产版本 |
| `npm run docs:preview` | 预览生产版本 |
| `npm install` | 安装依赖 |
| `npm update vitepress` | 更新 VitePress |

---

## 🔗 相关资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Vue.js 文档](https://vuejs.org/)

---

## 💡 最佳实践

1. **定期备份**：定期提交代码到 Git 仓库
2. **图片优化**：使用压缩后的图片，保持文件大小合理
3. **语义化命名**：文件和文件夹使用有意义的名称
4. **元数据完整**：每篇文章都添加完整的 frontmatter
5. **测试后发布**：本地预览确认无误后再部署
6. **保持更新**：定期更新 VitePress 和依赖包

---

## 🆘 常见问题

### Q: 修改后页面没有更新？
A: 尝试刷新浏览器或重启开发服务器

### Q: 构建失败？
A: 检查 Markdown 语法是否正确，特别是 frontmatter 部分

### Q: 图片显示不出来？
A: 检查图片路径是否正确，确保使用正确的相对路径或绝对路径

### Q: 如何添加搜索功能？
A: VitePress 内置本地搜索，在 config.mts 中配置：
```typescript
themeConfig: {
  search: {
    provider: 'local'
  }
}
```

---

**最后更新时间：2025-11-30**
