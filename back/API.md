## REST API

## /users

### GET /api/users/:id
- 해당 유저(id) 정보
- then: IUser

### GET /api/users/me 
- 로그인된 유저 정보
- then(성공): {user: IUser, accounts: {id: number, nickname: string}[]}
- catch(실패): false

### POST /api/users/ 
- 가입 정보 submit & nickname validation
- body: { auth: string, name: string, nickname: string, password: string}
- then: { email: string, phone: string, nickname: string }
- catch: false (403 Error)

### POST /api/users/confirm 
- 인증 토큰 submit
- body: { payload: string }
- then: "ok"
- catch: false (403 Error)

### POST /api/users/confirm-token/resend
- 인증 토큰 재전송
- then: "ok"

### POST /api/users/login
- 로그인
- body: { username: string, password: string }
- then
  - if 계정이 1개거나 username(인증 방식) 이 nickname 일 경우, 
  - {single: true, user: IUser, accounts: {id: number, nickname: string}[]}
  - else 계정이 2개 이상이거나 username(인증 방식) 이 email 또는 phone 일 경우, 
  - {single: false, users: IUser[]}
- catch: "unExist"(존재하지 않는 사용자) || "unMatch"(잘못된 비밀번호)



### POST /api/users/logout
- 로그아웃
- then: "ok"

