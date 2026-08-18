### fixed 2026.06.30
- 하기 조회 API 응답에서 정렬 기준을 보완해 페이징 경계에서 데이터가 중복되거나 누락될 수 있는 문제를 수정했습니다.
  - [주문 목록](docs/order/README.md)
  - [멤버(계정) 목록](docs/group/README.md)
  - [1:1 문의 목록](docs/qna/README.md)
  - [발주(접수)할 주문 목록](docs/delivery/README.md)
  - [발송이 필요한 주문 목록](docs/delivery/README.md)
  - [배송(사용) 현황 확인이 가능한 주문 목록](docs/delivery/README.md)

---

### release 2026.04.29
- [상품 등록/수정 API 요청](docs/product/README.md) 상품명(`productName`) 필드 길이 제한 확장 (40자 → 50자)

---

### release 2026.02.23
- [상품 상세 조회 API 응답](docs/product/README.md) 신규 필드 추가(상품 상세 정보)

---

### release 2025.11.26
- [상품 등록/수정 API 요청](docs/product/README.md) 신규 필드 추가(0원 상품 사유)
- [상품 상세 조회 API 응답](docs/product/README.md) 신규 필드 추가(0원 상품 사유)