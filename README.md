# Grip 판매자센터 API Guide
- Grip 판매자센터 API는 Grip에 연동하여 서비스를 제공하기 위한 서드파티 솔루션 사용자를 위한 API 입니다.
- RESTful API 형태의 표준 HTTP Request Method - GET, POST, PUT, DELETE 를 사용합니다.
- API 요청과 응답은 JSON Format 으로 되어 있습니다.

# 판매자센터 API 이용 신청하기
- 판매자센터 우상단에 있는 프로필을 클릭하여 API 사용을 시작합니다.
- 'SecretKey 신청'을 클릭하면 AccessKey와 SecretKey가 생성됩니다.
- SecretKey가 유출되면 'SecretKey 재발급'을 클릭하여 SecretKey를 새로 발급 받을 수 있습니다.
- AccessKey는 변경되지 않습니다.

# 사전 정보
- SecretKey : 판매자센터에서 발급 받은 SecretKey. API인증을 위한 Fingerprint를 만들때 사용.
- AccessKey : 판매자센터에서 발급 받은 AccessKey.
- API host : 개발서버(https://dev-seller.grip.show), 리얼서버(https://seller.grip.show)
 
# HTTP 응답 코드
- HTTP 응답 코드는 성공인 경우에는 200이고 실패인 경우에는 500입니다. 실패인 경우에는 응답 결과의 message에 실패사유가 내려갑니다.

# API 호출하기
- Grip 판매자센터 API를 통해서 상품 관리, 주문/반품/교환 조회, 배송 관리, 1:1문의 관리, 리뷰 관리를 할 수 있습니다.
- 모든 API는 아래의 Header를 포함해야 합니다.

| Header  | 설명 |
|----|----|
| X-AccessKey | 판매자센터에서 발급 받은 AccessKey |
| X-Fingerprint | SecretKey로 암호화한 Fingerprint. HMAC 암호화 알고리즘은 HmacSHA256 사용 |
| X-Fingerprint-Timestamp | Fingerprint를 암호화할때 사용한 timestamp. Grip 서버와 시간차가 10분 이상 나는 경우 유효하지 않은 요청으로 간주 |

- Fingerprint는 아래와 같이 생성할 수 있습니다. uri는 QueryString을 포함합니다.
- QueryString의 value 부분은 URLEncoder( https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html )를 이용하여 Encoding 하는 것이 안전합니다.
```java
public String makeFingerprint(String method, String uri, long timestamp) throws Exception {
		String space = " "; // one space
		String newLine = "\n"; // new line

		String message = new StringBuilder() //
				.append(method) // 'GET'
				.append(space) //
				.append(uri) // '/api/product/count?searchTarget=productName&searchQuery=Test
				.append(newLine) //
				.append(timestamp) //
				.append(newLine) //
				.append(accessKey) //
				.toString();

		SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
		Mac mac = Mac.getInstance("HmacSHA256");
		mac.init(signingKey);

		byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
		String encodeBase64String = Base64.encodeBase64String(rawHmac);

		return encodeBase64String;
}
```
