### ⚠️ Breaking Change 사전 안내 — 도메인별 순차 적용 (2026.08.21 ~ 09.04)

판매자 OPEN API의 내부 처리 시스템이 개선됩니다. API의 URL, 요청/응답 필드, 페이징 규칙은 변경되지 않지만, 오류 응답 방식과 일부 검증 동작이 아래와 같이 달라지므로 연동 코드 확인이 필요합니다.

전환은 한 번에 이루어지지 않고 **API 도메인 단위로 점진 적용**됩니다. 각 도메인의 전환이 완료되면 본 문서에 완료 일자를 반영할 예정입니다.

#### 적용 일정

| 도메인 | 대상 API | 전환 시작 | 전환 완료 (예정) |
| --- | --- | --- | --- |
| 1:1 문의 | [문의](docs/qna/README.md) | 2026.08.21 | **2026.08.26 (완료)** |
| 멤버(계정) | [멤버](docs/group/README.md) | 2026.08.21 | **2026.08.26 (완료)** |
| 리뷰 | [리뷰](docs/review/README.md) | 2026.08.21 | **2026.08.26 (완료)** |
| 주문 | [주문/반품/교환](docs/order/README.md) | 2026.08.25 | **2026.08.28 (완료)** |
| 상품 | [상품](docs/product/README.md) | 2026.08.26 | **2026.09.01 (완료)** |
| 배송 | [배송](docs/delivery/README.md) | 2026.08.31 | 2026.09.04 |

- **1:1 문의 / 멤버(계정) / 리뷰 도메인은 2026.08.26에, 주문/반품/교환 도메인은 2026.08.28에, 상품 도메인은 2026.09.01에 전환이 완료되었습니다.** 전환이 완료된 도메인 API의 오류 응답은 이제 항상 변경된 방식(`4xx` 체계)으로 응답됩니다.
- 아래의 변경 사항은 각 도메인의 **전환 시작 시점부터** 해당 도메인 API에 순차 적용됩니다.
- **전환 기간 중에는 동일한 요청이 기존 방식 또는 변경된 방식 중 어느 쪽으로든 응답될 수 있습니다.** 전환 시작 전까지 두 방식을 모두 처리할 수 있도록 준비해 주세요. (예: 잘못된 요청에 대해 HTTP `500`과 `4xx`가 모두 응답될 수 있음)

#### 오류 응답 체계 변경 (전체 API 공통)
- 잘못된 요청에 대해 기존에는 HTTP `500`으로 응답하던 것을 HTTP `4xx` 상태 코드와 오류 코드, 한국어/영어 오류 메시지로 응답하도록 변경했습니다.
    - HTTP `500`을 일시적 오류(재시도 대상)로 처리하던 클라이언트는 `4xx` 응답을 재시도하지 않도록 수정이 필요합니다.
    - 오류 메시지 문자열을 비교하는 클라이언트는 메시지 문구가 일부 변경(오타 교정 포함)되었으므로 확인이 필요합니다.
    - 오류 응답 본문 예시:
      ```json
      {
          "status": 400,
          "error": "BAD_REQUEST",
          "code": "COMMON_BAD_REQUEST",
          "message": "잘못된 정보입니다: 존재하지 않는 배송정보",
          "timestamp": "2026-08-18T16:02:13.582+0900"
      }
      ```
    - `status`/`error`는 HTTP 상태, `code`는 오류 식별 코드, `message`는 안내 메시지입니다. 프로그램 분기가 필요한 경우 문구가 변경될 수 있는 `message` 대신 `code`를 사용해 주세요.
- TLSv1.2 미만 환경에서의 요청은 HTTP `426 Upgrade Required`로 차단됩니다. 반드시 TLSv1.2 이상 환경에서 호출해 주세요. (이 항목은 도메인별 일정과 무관하게 전체 API에 일괄 적용됩니다)

#### 검증 강화 (기존에는 오류 없이 통과하거나 500으로 실패하던 케이스)
- 조회 API의 검색 기간이 최대 90일을 초과하면 HTTP `400`으로 응답합니다.
- [주문 목록](docs/order/README.md) / [배송 관련 API](docs/delivery/README.md): 구매자 닉네임 검색이 부분 일치에서 **정확 일치**로 변경됩니다.
- [배송 관련 API](docs/delivery/README.md): 주문 키(`orderKeys`), 발송 정보(`shippings`), 발송 지연 사유 등 필수 값 누락 시 HTTP `400`으로 응답합니다.
- [상품 등록/수정 API 요청](docs/product/README.md): 반품/교환 주소지 우편번호(`returnPostalCode`) 누락 시 HTTP `400`으로 응답합니다. (기존에는 누락되어도 요청이 성공하던 문제를 수정)
- [1:1 문의](docs/qna/README.md): 답변 등록 시 이미지는 최대 10장까지 허용되며, **종료된 문의에는 답변을 등록할 수 없습니다.**
- [리뷰](docs/review/README.md): 빈 답변 내용으로 등록 요청 시 HTTP `400`으로 응답합니다

#### 동작 변경 및 버그 수정
- [멤버(계정) 목록](docs/group/README.md): 멤버 ID(`yourMemberId`)가 회사명으로 잘못 내려가던 문제를 수정했습니다.
- [1:1 문의 목록](docs/qna/README.md): `userId` 검색 조건이 실제로 적용됩니다. (기존에는 무시되어 전체가 조회되던 문제 수정 — 조회 결과가 줄어들 수 있습니다)
- [1:1 문의 목록](docs/qna/README.md): 검색 대상에 상품명(`productName`)이 새로 지원됩니다.
- [1:1 문의](docs/qna/README.md): 문의 상세 조회 시 해당 문의가 읽음 상태로 처리됩니다.
- [교환 개수](docs/order/README.md) / [교환 목록](docs/order/README.md) API에서 운송장번호 검색(`searchTarget=trackingNumber`) 지원이 제거됩니다.
  - 교환 건 조회 시 해당 검색 대상이 정상적인 결과를 반환하지 못하는 문제가 있어 제거합니다.
  - 다른 검색 대상(`buyerNickname`, `buyerName`, `buyerPhoneNumber`, `recipientName`, `orderSeq`, `orderProductSeq`)은 기존과 동일하게 사용할 수 있습니다.
- [반품 개수](docs/order/README.md) / [반품 목록](docs/order/README.md) API에서 반품완료일시 기준 조회(`searchDate=completeReturnAt`) 지원이 일시 중단됩니다.
  - 해당 날짜 기준 조회 결과가 정확하지 않은 문제가 확인되어 수정 시까지 지원을 잠시 중단합니다.
  - 다른 날짜 대상(`orderedAt`, `requestReturnAt`, `cancelReturnAt`)은 기존과 동일하게 사용할 수 있습니다.

---

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