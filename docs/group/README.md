## 그룹 관리 (그룹 계정 전용)

## 제공 API
- [멤버(계정) 수](#멤버계정-수-get-apigroupmembercount)
- [멤버(계정) 목록](#멤버계정-목록-codeget-apigroupmembercode)
- [멤버(계정) 등록](#멤버계정-등록-codepost-apigroupmembercode)
- [멤버(계정) 수정](#멤버계정-수정-codeput-apigroupmemberuseridcode)
- [멤버(계정) 삭제](#멤버계정-삭제-codedelete-apigroupmemberuseridcode)
- [방송 권한 부여](#방송-권한-부여-codeput-apigroupmemberuseridenablecode)
- [방송 권한 제거](#방송-권한-제거-codeput-apigroupmemberuseriddisablecode)
- [비밀번호 초기화](#비밀번호-초기화-codeput-apigroupmemberuseridpasswordresetcode)                     
- [비밀번호 이메일 전송](#비밀번호-이메일-전송-codeput-apigroupmemberuseridpasswordsendcode)

---

## 모델

<a id="groupmemberlist"></a>
<details>
<summary><strong>GroupMemberList</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
| userTag | String | 이용자 아이디. 프로필에 보이는 아이디 | 최대 16자 |
| userName | String | 닉네임. 프로필에 보이는 닉네임 | 최대 30자 |
| master | Boolean | 그룹 마스터 여부 | |
| active | Boolean | 방송권한 여부 | |
| profileUrl | String | 프로필 URL | 최대 300자 |
| companyName | String | 소속명 | 최대 40자 |
| managerName | String | 브랜드 담당 매니저 이름 | 최대 20자 |
| managerEmail | String | 브랜드 담당 매니저 이메일 | 최대 60자 |
| managerMobile | String | 브랜드 담당 매니저 핸드폰 번호 | 최대 13자 |
| productCount | Integer | 상품 수 | |
| contentCount | Integer | 방송 수 | |
| followerCount | Integer | 팔로워 수 | |
| lastPublishedAt | Date | 최근 방송일시 | |
| createdAt | Date | 등록일시 | |
| memo | String | 관리용 메모 | 최대 200자 |
| accessKey | String | API AccessKey | 최대 16자 |
| secretKey | String | API SecretKey | 최대 16자 |
</details>


---

### 멤버(계정) 수 <code>GET /api/group/member/count</code>
- 그룹 내에 속한 멤버(계정) 수를 조회합니다. 

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchQuery | String | N | 검색할 멤버(계정)의 닉네임 또는 소속명 | 최대 40자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| memberCount | Integer | 멤버(계정) 수 |

<br>

### 멤버(계정) 목록 <code>GET /api/group/member</code>
- 그룹 멤버(계정) 목록을 조회합니다. 

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고                                                                                               |
| -----------  | ------------ |-----------|------------ |--------------------------------------------------------------------------------------------------|
| searchQuery | String | N | 검색할 멤버(계정)의 닉네임 또는 소속명 | 최대 40자                                                                                           |
| sortField | Integer | N | 정렬 필드 | 이용자 아이디: 2<br>닉네임: 3<br>소속명: 4<br>상품수: 7<br>방송수: 8<br>팔로워수: 9<br>최근방송일시: 10<br>등록일시(default): -1 |
| sortOrder | String | N | 정렬 순서 | DESC, ASC                                                                                        |
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20                                                                      |
| length | Integer | N | 페이지 사이즈. default 20 |                                                                                                  |

***Response***

| 이름 | 타입                                              | 설명 | 
| -----------  |-------------------------------------------------|------------ | 
| memberList | List&lt;[GroupMemberList](#groupmemberlist)&gt; | 멤버(계정) 목록 |

<br>

### 멤버(계정) 등록 <code>POST /api/group/member</code>
- 그룹 멤버(계정)를 등록합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| yourMemberId | String | N | 자체 멤버(계정) 아이디 | 최대 40자 |
| companyName | String | Y | 소속명 | 최대 40자 |
| userTag | String | Y | 이용자 아이디. 프로필에 보이는 아이디 | 최대 16자 |
| userName | String | Y | 닉네임. 프로필에 보이는 닉네임 | 최대 20자 |
| managerName | String | Y | 브랜드 담당 매니저 이름 | 최대 30자 |
| managerEmail | String | Y | 브랜드 담당 매니저 이메일 | 최대 40자 |
| managerMobile | String | Y | 브랜드 담당 매니저 핸드폰 번호 | |
| memo | String | N | 관리용 메모 | 최대 200자 |

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

<br>

### 멤버(계정) 수정 <code>PUT /api/group/member/{userId}</code>
- 그룹 멤버(계정)의 정보를 수정합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| yourMemberId | String | N | 자체 멤버(계정) 아이디 | 최대 40자 |
| companyName | String | Y | 소속명 | 최대 40자 |
| userTag | String | Y | 이용자 아이디. 프로필에 보이는 아이디 | 최대 16자 |
| userName | String | Y | 닉네임. 프로필에 보이는 닉네임 | 최대 20자 |
| managerName | String | Y | 브랜드 담당 매니저 이름 | 최대 30자 |
| managerEmail | String | Y | 브랜드 담당 매니저 이메일 | 최대 40자 |
| managerMobile | String | Y | 브랜드 담당 매니저 핸드폰 번호 | |
| memo | String | N | 관리용 메모 | 최대 200자 |

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

<br>

### 멤버(계정) 삭제 <code>DELETE /api/group/member/{userId}</code>
- 그룹에서 해당 멤버(계정)를 삭제합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

<br>

### 방송 권한 부여 <code>PUT /api/group/member/{userId}/enable</code>
- 해당 멤버(계정)에게 방송 권한을 부여합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

<br>

### 방송 권한 제거 <code>PUT /api/group/member/{userId}/disable</code>
- 해당 멤버(계정)의 방송 권한을 제거합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

<br>

### 비밀번호 초기화 <code>PUT /api/group/member/{userId}/password/reset</code>
- 해당 멤버(계정)의 비밀번호를 초기화 합니다.
- 초기화하면 임시 비밀번호가 발급됩니다.

***Response***

| 이름 | 타입 | 설명            | 비고 |
| -----------  | ------------ |---------------| ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
| password | String | 새로운 임시 비밀번호   | 최대 16자 |

<br>

### 비밀번호 이메일 전송 <code>PUT /api/group/member/{userId}/password/send</code>
- 해당 멤버(계정)의 managerEmail로 현재 비밀번호를 전송 합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
