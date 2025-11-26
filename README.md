# Grip 판매자센터 API Guide
- Grip 판매자센터 API는 Grip에 연동하여 서비스를 제공하기 위한 서드파티 솔루션 사용자를 위한 API입니다.
- REST API 형태의 표준 HTTP Request Method - GET, POST, PUT, DELETE를 사용합니다.
- API 요청과 응답은 JSON Format으로 되어 있습니다.
- Date 타입은 밀리 초 단위로 변환하여 Long 타입으로 사용합니다.
- API의 성능을 보장하기 위해 검색 범위는 최근 90일까지만 가능합니다.
- 주문 및 배송 처리 API 처리 결과 상세를 조회해야 할 때에는 `/result`라는 PATH가 붙은 API를 사용할 수 있습니다. (일부 API만 제공)

---

## 목차

1. [API 개요](docs/OVERVIEW.md)
2. [인증 및 보안](docs/auth/README.md)
3. API 도메인별 문서
    - [상품 관리 API](docs/product/README.md)
    - [주문 관리 API](docs/order/README.md)
    - [배송/교환/반품 API](docs/delivery/README.md)
    - [1:1 문의 API](docs/qna/README.md)
    - [리뷰 API](docs/review/README.md)
4. [변경 이력](docs/changelog.md)