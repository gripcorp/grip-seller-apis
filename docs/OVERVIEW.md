# 판매자센터 API 이용 신청하기
- 판매자센터 좌상단에 있는 API를 클릭하여 사용을 시작합니다.
- **SecretKey 신청**을 클릭하면 AccessKey와 SecretKey가 생성됩니다.
- SecretKey가 유출되면 **SecretKey 재발급**을 클릭하여 SecretKey를 새로 발급받을 수 있습니다.
- AccessKey는 변경되지 않습니다.

# 사전 정보
- SecretKey: 판매자센터에서 발급받은 SecretKey. API 인증을 위한 Fingerprint를 만들 때 사용.
- AccessKey: 판매자센터에서 발급받은 AccessKey.
- API host: https://seller.grip.show

# HTTP 응답 코드
- HTTP 응답 코드는 성공이면 `200`이고, 실패면 `500`입니다.
- 응답이 실패면 응답 결과의 `message`에 실패 사유가 반환됩니다.

# 보안 요구사항
- GRIP 판매자센터 API는 소중한 정보를 안전하게 보호하기 위해 암호화 통신 프로토콜인 TLS를 사용하고 있습니다.
- 보안 강화를 위해 TLS 1.2 이상의 환경에서만 정상적으로 동작합니다. API 요청 환경의 TLS 버전을 확인해 주시기 바랍니다.