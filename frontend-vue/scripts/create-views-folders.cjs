// scripts/create-views-folders.js
const fs = require('fs');
const path = require('path');

const views = {
  admin: [
    { name: 'Login.vue', title: '관리자 로그인' },
    { name: 'Dashboard.vue', title: '관리자 대시보드' },
    { name: 'GptUsageStats.vue', title: 'GPT 요약 통계' }
  ],
  user: [
    { name: 'Login.vue', title: '사용자 로그인' },
    { name: 'DailyLogForm.vue', title: '하루 기록 작성' },
    { name: 'DailyLogList.vue', title: '기록 리스트' },
    { name: 'MyPage.vue', title: '마이페이지' }
  ]
};

const basePath = path.resolve(__dirname, '../src/views');

for (const role in views) {
  const folderPath = path.join(basePath, role);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 created: ${folderPath}`);
  }

  views[role].forEach(view => {
    const filePath = path.join(folderPath, view.name);
    if (!fs.existsSync(filePath)) {
      const content = `<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">${view.title}</h1>
  </div>
</template>

<script setup>
// ${view.title} 화면
</script>
`;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ created: ${filePath}`);
    }
  });
}
