import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "余科震的个人主页",
  description: "计算机科学与技术专业学生 | 全栈开发 | 学习记录",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目作品', link: '/projects/' },
      { text: '博客', link: '/blog/' },
      { text: '关于我', link: '/about/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '博客',
          items: [
            { text: '博客列表', link: '/blog/' },
            { text: '我的第一篇博客', link: '/blog/test_post' },
            // Future posts can be added here
          ]
        }
      ],
      '/projects/': [
        {
          text: '项目作品',
          items: [
            { text: '项目列表', link: '/projects/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-id' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 余科震 保留所有权利'
    }
  }
})
