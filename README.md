<div align="center">
  <img src="https://github.com/zernonia/vue3-notion/raw/master/assets/vue3-notion.png" alt="vue3-notion" width="398px" />
  <p>An unofficial Notion renderer (Vue 3) version</p>
</div>

<h3 align="center">
  <a href="#features">Features</a>
  <span> · </span>
  <a href="#install">Install</a>
  <span> · </span>
  <a href="#examples">Examples</a>
  <span> · </span>
  <a href="#credits">Credits</a>
</h3>

<p align="center">
  <a href="https://www.npmjs.org/package/vue3-notion">
    <img src="https://img.shields.io/npm/v/vue3-notion.svg" alt="Package version" />
  </a>
  <a href="https://github.com/janniks/vue3-notion/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=zernonia">
    <img src="https://img.shields.io/twitter/url?label=Follow&style=social&url=https%3A%2F%2Ftwitter.com%2Fzernonia" alt="Follow on Twitter" />
  </a>
</p>

---

A **Vue 3** renderer for Notion pages (ported from [vue-notion](https://github.com/janniks/vue-notion)). Special thanks to [Jannik Siebert](https://twitter.com/jnnksbrt) & all the `vue-notion` contributors that made the `vue-notion` possible!

Use **Notion as CMS** for your blog, documentation or personal site.
Also check out [react-notion](https://github.com/splitbee/react-notion) (developed by [Splitbee 🐝](https://splitbee.io/) – a fast, reliable, free, and modern analytics for any team)

This package doesn't handle the communication with the API (I planned to add this!). Check out [notion-api-worker](https://github.com/splitbee/notion-api-worker) from [Splitbee](https://splitbee.io/) for an easy solution.

<sub>Created by <a href="https://twitter.com/zernonia">Zernonia</a></sub>

## Features

🌎 **SSR / Static Generation Support** – Functions to work with [**Nuxt3**](https://v3.nuxtjs.org/) and other frameworks

🎯 **Accurate** – Results are _almost_ identical

🎨 **Custom Styles** – Styles are easily adaptable. Optional styles included

🔮 **Syntax-Highlighting** – Beautiful themeable code highlighting using Prism.js

## Install

### Vue 3

```bash
npm install vue3-notion
# yarn add vue3-notion
```

### Nuxt3 Module

Install as a dev-dependency and add `"vue3-notion/nuxt"` to the `buildModules` array in `nuxt.config.js`.

```bash
npm install vue3-notion --save-dev
```

```ts
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt3"

export default defineNuxtConfig({
  //...
  modules: [
    ["vue3-notion/nuxt", { css: true }], // css is not imported by default. Set `true` to import css
  ],
})
```

## Examples

These examples use a simple wrapper around the [`notion-api-worker`](https://github.com/splitbee/notion-api-worker) to access the Notion page data.
It is also possible to store a page received from the Notion API in `.json` and use it without the `async/await` part.

> Use the `getPageBlocks` and `getPageTable` methods with caution!
> They are based on the private Notion API.
> We can NOT guarantee that it will stay stable.
> The private API is warpped by [notion-api-worker](https://github.com/splitbee/notion-api-worker).

### Basic Example for **Vue 3**

This example is a part of [`demo/`](https://github.com/zeronnia/vue3-notion/demo/) and is hosted at [vue3-notion.vercel.app](https://vue3-notion.vercel.app).

```vue
<script setup lang="ts">
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"
import { ref, onMounted } from "vue"

const data = ref()

onMounted(async () => {
  data.value = await getPageBlocks("4b2dc28a5df74034a943f8c8e639066a")
})

// ---- or using Composables ----

const { data } = useGetPageBlocks("4b2dc28a5df74034a943f8c8e639066a")
</script>

<template>
  <NotionRenderer v-if="data" :blockMap="data" fullPage />
</template>

<style>
@import "vue3-notion/dist/style.css"; /* optional Notion-like styles */
</style>
```

### Basic Example for **Nuxt3**

This example is a part of [`demo/`](https://github.com/zeronnia/vue3-notion/demo/) and is hosted at [vue3-notion.vercel.app](https://vue3-notion.vercel.app).

```vue
<script setup lang="ts">
const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion", () => $notion.getPageBlocks("2e22de6b770e4166be301490f6ffd420"))
</script>

<template>
  <NotionRenderer :blockMap="data" fullPage prism />
</template>
```

## Supported Blocks

Most common block types are supported. We happily accept pull requests to add support for the missing blocks.

| Block Type        | Supported  | Notes                  |
| ----------------- | ---------- | ---------------------- |
| Text              | ✅ Yes     |                        |
| Heading           | ✅ Yes     |                        |
| Image             | ✅ Yes     |                        |
| Image Caption     | ✅ Yes     |                        |
| Bulleted List     | ✅ Yes     |                        |
| Numbered List     | ✅ Yes     |                        |
| Quote             | ✅ Yes     |                        |
| Callout           | ✅ Yes     |                        |
| Column            | ✅ Yes     |                        |
| iframe            | ✅ Yes     |                        |
| Video             | ✅ Yes     | Only embedded videos   |
| Divider           | ✅ Yes     |                        |
| Link              | ✅ Yes     |                        |
| Code              | ✅ Yes     |                        |
| Web Bookmark      | ✅ Yes     |                        |
| Toggle List       | ✅ Yes     |                        |
| Page Links        | ✅ Yes     |                        |
| Cover             | ✅ Yes     | Enable with `fullPage` |
| Equations         | ✅ Yes     |                        |
| Checkbox          | ✅ Yes     |                        |
| Simple Tables     | ✅ Yes     |                        |
| Table Of Contents | ✅ Yes     |                        |
| Databases         | ☑️ Planned |                        |

Please, feel free to [open an issue](https://github.com/zernonia/vue3-notion/issues/new) if you notice any important blocks missing or anything wrong with existing blocks.

# 🌎 Local Development

## Prerequisites

Yarn

- ```sh
  npm install --global yarn
  ```

## Development

1. Clone the repo
   ```sh
   git clone https://github.com/zernonia/vue3-notion.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Run Development instance
   ```sh
   yarn dev
   ```

## Credits

- [Jannik Siebert](https://twitter.com/jnnksbrt) – vue-notion Code
- [All vue-notion contributors!](https://github.com/janniks/vue-notion/graphs/contributors)

## License ⚖️

MIT © [zernonia](https://twitter.com/zernonia)
