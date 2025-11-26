# API 호출하기
- Grip 판매자센터 API를 통해서 상품 관리, 주문/반품/교환 조회, 배송 관리, 1:1문의 관리, 리뷰 관리를 할 수 있습니다.
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