# 多语言功能测试说明

## 功能概述
已为 home 目录添加了完整的多语言支持，包括中文和英文两种语言。

## 实现的功能

### 1. 多语言配置文件
- 文件：`home/i18n-config.js`
- 包含所有页面文本的中英文翻译
- 支持嵌套键值对结构

### 2. HTML 更新
- 所有中文文本都添加了 `data-translate` 属性
- 添加了语言切换器按钮
- 更新了页面标题和 meta 标签

### 3. JavaScript 多语言支持
- 新增 `I18nManager` 类管理多语言功能
- 支持浏览器语言检测
- 支持 URL 参数语言设置
- 支持 localStorage 语言记忆
- 全局 `t()` 函数用于翻译

### 4. CSS 样式
- 添加了语言切换器的样式
- 支持激活状态和悬停效果

## 测试方法

### 1. 本地测试
```bash
cd /Volumes/DevSSD/dev/project/Jopar/jopar_site/home
python3 -m http.server 8080
```
然后访问：http://localhost:8080

### 2. 语言切换测试
- 点击导航栏右侧的"中文"或"English"按钮
- 页面应该立即切换到对应语言
- 语言选择会被保存到 localStorage

### 3. URL 参数测试
- 访问：http://localhost:8080?lang=en （英文）
- 访问：http://localhost:8080?lang=zh （中文）

### 4. 浏览器语言检测测试
- 修改浏览器语言设置
- 刷新页面，应该自动检测并应用对应语言

## 功能特点

1. **自动语言检测**：根据浏览器语言自动选择
2. **URL 参数支持**：可通过 `?lang=en` 或 `?lang=zh` 指定语言
3. **语言记忆**：选择语言后会保存到 localStorage
4. **实时切换**：点击语言按钮立即切换，无需刷新页面
5. **完整覆盖**：所有页面文本都支持多语言
6. **回退机制**：如果某种语言缺少翻译，会回退到中文

## 文件结构
```
home/
├── index.html          # 主页面（已添加 data-translate 属性）
├── script.js           # 交互脚本（已添加多语言支持）
├── styles.css          # 样式文件（已添加语言切换器样式）
└── i18n-config.js     # 多语言配置文件（新增）
```

## 翻译键值说明
所有翻译键都采用语义化命名，例如：
- `pageTitle`: 页面标题
- `navHome`: 导航栏首页
- `heroTitle`: 英雄区域标题
- `featureGameCenter`: 功能特色标题
- `contactFormName`: 联系表单姓名字段
- 等等...

多语言功能已完全实现，可以开始测试使用！
