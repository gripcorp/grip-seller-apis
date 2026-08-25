- Grip 판매자센터 API를 통해서 상품 관리, 주문/반품/교환 조회, 배송 관리, 1:1문의 관리, 리뷰 관리를 할 수 있습니다.
- API host는 `https://seller.grip.show` 입니다.
- 이미지 업로드를 제외한 모든 API의 Content-Type은 `application/json` 입니다.
- 모든 API는 아래의 Header를 포함해야 합니다.

| Header  | 설명                                                                                                  |
|----|-----------------------------------------------------------------------------------------------------|
| X-ServiceId | API 연동 서비스 이름. **그립을 통해서 발급받아야 함**                                                                  |
| X-AccessKey | 판매자센터에서 발급받은 AccessKey                                                                              |
| X-Fingerprint | SecretKey로 암호화한 Fingerprint. HMAC 암호화 알고리즘은 `HmacSHA256` 사용                                         |
| X-Fingerprint-Timestamp | Fingerprint를 암호화할 때 사용한 timestamp(**milliseconds**).<br>Grip 서버와 시간 차가 10분 이상 나는 경우 유효하지 않은 요청으로 간주 |

- Fingerprint는 아래와 같이 생성할 수 있습니다. (uri는 QueryString을 포함합니다.)
- QueryString의 value 부분은 [URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)를 이용하여 Encoding 하는 것이 안전합니다.

```java
public String makeFingerprint(String method, String uri, long timestamp) throws Exception {
    String space = " "; // one space
    String newLine = "\n"; // new line

    String message = new StringBuilder()
            .append(method) // 'GET'
            .append(space)
            .append(uri) // '/api/product/count?searchTarget=productName&searchQuery=Test'
            .append(newLine)
            .append(timestamp)
            .append(newLine)
            .append(accessKey)
            .toString();

    SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(signingKey);

    byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
    String encodedBase64String = Base64.encodeBase64String(rawHmac);

    return encodedBase64String;
}
```

## HTTP 응답 코드
- HTTP 응답 코드는 성공이면 `200`입니다.
- 잘못된 요청에 대한 실패 응답은 HTTP `4xx` 상태 코드와 오류 코드, 오류 메시지로 구성됩니다.
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
- 기존 오류 응답(HTTP `500` + `message`)에서 `4xx` 체계로 **API 도메인 단위 점진 전환 중**입니다. (2026.08.21 ~ 09.04 예정)
    - 전환 기간 중에는 동일한 요청이 `500` 또는 `4xx` 어느 쪽으로든 응답될 수 있으므로 두 방식을 모두 처리해 주세요.
    - 도메인별 적용 일정과 상세 변경 내용은 변경 이력(Changelog) 문서를 참고해 주세요.

## 보안 요구사항
- GRIP 판매자센터 API는 소중한 정보를 안전하게 보호하기 위해 암호화 통신 프로토콜인 TLS를 사용하고 있습니다.
- 보안 강화를 위해 TLS 1.2 이상의 환경에서만 정상적으로 동작합니다. API 요청 환경의 TLS 버전을 확인해 주시기 바랍니다.
