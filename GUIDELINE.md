# Grip 판매자센터 API 이용 준비 가이드

Grip 판매자센터 API를 사용하기 위해서는 아래 세 가지가 준비되어야 합니다.

| 준비 항목 | 발급 방법                                                      |
|---|------------------------------------------------------------|
| 입점 (판매자 계정) | [비즈니스 입점 신청](https://grip-wiki.oopy.io/seller-application) |
| `accessKey` / `secretKey` | 그립 비즈니스 센터에서 직접 발급 (아래 가이드 참고)                             |
| `serviceId` | 별도 문의 (dev.prod_api_support@gripcorp.co)                   |

---

## 1. 비즈니스 입점 신청

판매자센터 API는 그립에 입점한 판매자에게만 제공됩니다. 아직 입점 전이라면 아래 페이지에서 입점 신청을 먼저 진행해 주세요.

- 입점 신청: https://grip-wiki.oopy.io/seller-application

입점 심사가 완료되면 그립 비즈니스 센터(판매자 센터) 계정으로 로그인할 수 있으며, 이후 단계를 진행할 수 있습니다.

## 2. accessKey / secretKey 발급

입점 완료 후, 그립 비즈니스 센터에서 API 인증 키를 직접 발급할 수 있습니다.

### 발급 절차

<img alt="1.그립 비즈니스 센터 대시보드" src="assets/1.그립%20비즈니스%20센터%20대시보드.png" width="1078" />

1. 그립 비즈니스 센터에 로그인 후, [대시보드 페이지](https://business.grip.show/dashboard)로 이동합니다.

<img alt="2.Grip API 연동" src="assets/2.Grip%20API%20연동.png" />

2. **Grip API (외부 연동)** 버튼을 클릭합니다.

<img alt="3.SecretKey 발급" src="assets/3.SecretKey%20발급.png" width="561" />

3. **Secret Key 재발급** 버튼을 클릭하여 새로운 `accessKey`와 `secretKey`를 발급합니다.
4. 발급된 `accessKey`와 `secretKey`를 확인하고 안전한 곳에 보관합니다.

### 발급 시 유의사항

- `secretKey`는 API 요청 서명(HMAC)에 사용되는 비밀 값입니다. **외부에 노출되지 않도록 반드시 안전하게 보관**해주세요.
- key가 노출되었거나 재발급이 필요한 경우, 같은 화면에서 **재발급**할 수 있습니다. 재발급 시 **기존 키는 즉시 무효화**되므로, 운영 중인 연동 시스템의 키 교체 일정을 함께 계획해 주세요.
- **만료(초기화)** 기능을 사용하면 발급된 키가 즉시 무효화되며, 이후 API 호출은 인증 오류로 실패합니다.
- 그룹(멤버 계정)을 사용하는 판매자의 경우, **그룹 마스터 계정에서 발급/만료를 수행하면 소속 멤버 계정의 키도 함께 발급/만료**됩니다.

## 3. serviceId 발급 (별도 문의)

`serviceId`는 비즈니스 센터에서 직접 발급되지 않으며, 아래 이메일로 문의해 주세요.

- 문의: **dev.prod_api_support@gripcorp.co**

문의 시 아래 형식으로 정보를 함께 전달해 주시면 빠르게 처리가 가능합니다.

- [문의 제목] Grip 판매자센터 API serviceId 발급 요청
  - 판매자(업체)명
  - AccessKey
  - 연동 목적 (예: 주문/배송 연동, 상품 연동 등)

---

## 준비 완료 후

세 가지(입점 계정, `accessKey`/`secretKey`, `serviceId`)가 모두 준비되면 API를 호출할 수 있습니다. 모든 요청에는 아래 인증 헤더가 필요합니다.

| 헤더 | 값 |
|---|---|
| `X-AccessKey` | 발급받은 accessKey |
| `X-ServiceId` | 발급받은 serviceId |
| `X-Fingerprint` | 요청별 HMAC-SHA256 서명 (secretKey 사용) |
| `X-Fingerprint-Timestamp` | 서명 생성 시각 (epoch millis) |

서명 생성 방법 등 상세 인증 스펙은 [API 명세 문서](docs/auth/README.md)를 참고해 주세요.
