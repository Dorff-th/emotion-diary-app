# 📦 Backend - Spring Boot 3

## 🛠️ 기술 스택
- Java 17
- Spring Boot 3
- Spring Security + JWT
- JPA (Hibernate)
- MariaDB
- Gradle

## 🧪 실행 방법
```bash
./gradlew bootRun
```

또는 IDE (IntelliJ)로 실행

## 📂 주요 디렉토리

- `controller/` – REST API 진입점
- `service/` – 비즈니스 로직
- `repository/` – JPA Repository
- `domain/` – Entity 클래스
- `config/` – 보안 및 CORS 설정

## 🔐 인증 방식
- 로그인 시 JWT 발급
- `Authorization: Bearer <token>` 형태로 헤더에 첨부

## 📋 API 문서
Swagger 도입 예정
