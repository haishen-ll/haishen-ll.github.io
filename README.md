# Academic Homepage / 个人学术主页

白底、炭黑文字与学术蓝点缀的紧凑型个人学术主页，原生 HTML / CSS / JavaScript，无 npm、无构建步骤、无外部字体依赖。支持 GitHub Pages 个人站点和项目子路径。

## 使用与修改

直接打开 `index.html` 即可查看，也可以在本目录运行 `python3 -m http.server 8000` 并访问 http://localhost:8000。

编辑 `profile.js` 集中维护所有资料：

- `name`、`role`、`department`、`bio`：姓名、职位、机构、简介；分别填写 `en` 与 `zh`。
- `question`、`interests`：研究问题与研究方向。
- `email`、`links`：邮箱、Google Scholar、GitHub、简历。空链接自动隐藏；简历可放在 `assets/cv.pdf`。
- `portrait`：可选头像路径，例如 `assets/portrait.jpg`，替换右侧研究图形。
- `publications`：论文标题、作者、年份、发表场所、摘要、标签和资源链接。筛选按钮根据标签自动生成；论文按数组顺序展示。
- `education`、`experience`：独立维护教育与工作经历。`projects`、`news`：项目与近期动态。
- `demo`：默认 `true`，显示示例提示；全部替换成真实内容后改成 `false`。

已于 2026-11-06 从用户提供的 Google Scholar 页面导入 Lei Liu 的研究兴趣、所列机构与 33 篇论文（仅保留 2021 年及以后，并移除指定的 Deep Camera‐Aware Metric Learning for Person Reidentification）。姓名保留英文，不推测中文姓名。任职、简介、照片和邮箱已依据目标仓库原有 index.md 与 _config.yml 补充。简介与研究方向描述概括自公开兴趣及论文题目；作者与发表场所保留 Scholar 原有的截断。未获取论文摘要，故不展示摘要按钮。教育与工作经历为独立板块：博士 2020–2025，蚂蚁集团 2025–至今（用户于 2026-11-07 确认）。未确认的项目与动态已隐藏。没有填写链接的项目只展示介绍，不显示外链。页面默认英文，可切换中文，浏览器允许时记住语言选择。网站没有后端和访问统计。

## 发布到 GitHub Pages

1. 创建公开仓库。个人主页可命名为 `你的用户名.github.io`；也可以使用普通项目仓库。
2. 将本文件夹中的文件上传到仓库根目录，确保 `index.html` 位于根目录，保留 `assets` 文件夹和 `.nojekyll` 文件。
3. 在仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**。
4. 选择 **main** 分支和 **/(root)**，保存。
5. 等待 GitHub 部署成功，在 Pages 设置页查看访问地址。以后更新文件并提交即可更新网站。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 文件

- `index.html`：语义化页面骨架
- `style.css`：桌面、移动端和打印样式
- `profile.js`：个人资料和论文数据
- `app.js`：渲染、中英文切换、论文筛选
- `assets/favicon.svg`：站点图标，可替换为个人标识
- `.nojekyll`：以静态文件方式发布

## 验证范围

已通过 JavaScript 语法和本地配置渲染逻辑检查。包含 760px 以下的移动端样式、键盘焦点、跳转正文链接和减少动画设置。当前浏览器工具超时，尚未完成真实浏览器视觉与交互验收；发布前请检查手机和桌面显示、个人资料与所有外链。

## 当前目标仓库部署

仓库： https://github.com/haishen-ll/Ocean537.github.io

主分支为 `master`。已配置 `.github/workflows/pages.yml`，在仓库 Settings → Pages → Source 选择 **GitHub Actions** 后，推送 master 或手动运行 Deploy academic homepage 工作流即可部署。预期地址为 https://haishen-ll.github.io/Ocean537.github.io/ ，需以部署成功后的输出为准。旧 Jekyll 文件保留；部署包只包含新版站点文件。

## 开源医疗大模型

已展示 Ling-3.0-flash-Sante 与 AntAngelMed。参数、上下文长度、许可证和介绍依据 2026-11-07 访问的官方 Hugging Face 模型卡；不包含个人贡献归属或性能排名声明。可在 `profile.js` 的 `projects` 数组中维护。

- https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante
- https://huggingface.co/MedAIBase/AntAngelMed
