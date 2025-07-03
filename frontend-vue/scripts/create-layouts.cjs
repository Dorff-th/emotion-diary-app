const fs = require('fs');
const path = require('path');

const layouts = [
  { name: 'AdminLayout.vue', title: '관리자 레이아웃' },
  { name: 'UserLayout.vue', title: '사용자 레이아웃' }
];

const basePath = path.resolve(__dirname, '../src/layouts');

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
  console.log(`📁 created: ${basePath}`);
}

layouts.forEach(layout => {
  const filePath = path.join(basePath, layout.name);
  if (!fs.existsSync(filePath)) {
    const content = `<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-lg font-semibold">${layout.title}</h1>
    </header>

    <main class="flex-1 p-4 bg-gray-50">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-center p-2 text-sm text-gray-500">
      ⓒ 2025 ZmyLong App
    </footer>
  </div>
</template>

<script setup>
// ${layout.title}
</script>
`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ created: ${filePath}`);
  }
});
