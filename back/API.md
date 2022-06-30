## REST API

## /user (유저)

### GET /api/user/:id
- 해당 유저(id) 정보
- then: IUser

### GET /api/user/me 
- 로그인된 유저 정보
- success: {user: IUser, accounts: {id: number, nickname: string}[]}
- fail: false

### POST /api/user
- 가입 정보 submit & nickname validation
- body: { auth: string, name: string, nickname: string, password: string}
- success: { email: string, phone: string, nickname: string }
- fail: false (403 Error)

### POST /api/user/confirm 
- 인증 토큰 submit
- body: { payload: string }
- success: "ok"
- fail: false (403 Error)

### POST /api/user/confirm-token/resend
- 인증 토큰 재전송
- success: "ok"

### POST /api/user/login
- 로그인
- body: { username: string, password: string }
- success
  - if 계정이 1개 or username(인증 방식) 이 nickname 일 경우(계정 선택이 불필요하여 바로 로그인 되는 경우), 
  - { currentAccount: IUser, additionalAccounts: { id: number, nickname: string }[] }
  - else 계정이 2개 이상 && username(인증 방식) 이 email 또는 phone 일 경우(계정 선택이 필요하여 바로 로그인 되지 않는 경우, 
  - { currentAccount: false, totalAccounts: IUser[] }
- error: "unExist"(존재하지 않는 사용자) || "unMatch"(잘못된 비밀번호)


### POST /api/user/logout
- 로그아웃
- success: "ok"


## /post (단일 게시물)

### POST /api/post 
- 게시물 생성
- 사진/동영상, hashtag, 댓글작성 여부 설정, content
- body: { content: string, hashtags: string[], mentions: string[], imageFiles: [], videoFiles: [], hideCounts: boolean, turnOffComments: boolean }
- hideCounts, turnOffComments 는 초기값(false)으로 설정되어 있음으로 값을 변경할 경우를 제외하고 body 에 포함하지 않도록 한다.


### POST /api/post/:postId/comment
- 댓글 작성
- body: { content: string, userId: string, postId: string}

### POST /api/post/:postId/comment/:commentId
- 대댓글 작성
- body: { content: string, postId: string, replyingUserId: string, repliedUserId: string}

## /posts (여러 게시물)

### GET /api/posts
- 여러 게시물 랜덤으로 가져오기.
- success: IPost[]