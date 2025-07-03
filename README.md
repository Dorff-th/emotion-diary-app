# 🧠 Emotion Diary App

감정 기반 회고 일기 & GPT 요약 웹앱  
Spring Boot + Vue.js 기반 자기개발 프로젝트입니다.

---

## 📁 프로젝트 구조

emotion-diary-app/
├── backend/ # Spring Boot (API 서버)
├── frontend-vue/ # Vue 3 프론트엔드

yaml
복사
편집

---

## 🚀 실행 방법 (로컬 개발 환경)

### 1. 백엔드

- Java 17+, Gradle
- `src/main/resources/application.yml` 직접 생성 필요 (예시는 `application-sample.yml` 참고)

```bash
cd backend
./gradlew bootRun
2. 프론트엔드
bash
복사
편집
cd frontend-vue
npm install
npm run dev
🔐 환경 설정
application.yml은 Git에 포함되지 않습니다.
application-sample.yml을 복사 후 정보 기입해서 사용하세요.

🛠️ 사용 기술
Spring Boot 3

Spring Security + JWT

Vue 3 + Vite

MariaDB + JPA

GPT API

AWS Elastic Beanstalk (배포 예정1)

✨ 향후 추가 예정(comming soon)
감정 일기 GPT 요약

일정관리, 습관관리, 목표 트래킹

관리자 대시보드

CI/CD (GitHub Actions + EB 배포)
