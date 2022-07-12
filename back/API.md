## REST API

## /user (유저)

### GET /api/user/:nickname
- 해당 유저(nickname) 정보
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

### a 태그 (링크로 연결) /http:localhost:3095/oauth/kakao
- 카카오로 로그인 & 회원가입
- success: redirect to `/`
- ** api axios 로 가능한지는 추후 알아보고 수정할 예정
- .env 에 `KAKAO_ID` 필요, 추후 공유할 예정

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
  - return IUser
  - else 계정이 2개 이상 && username(인증 방식) 이 email 또는 phone 일 경우(계정 선택이 필요하여 바로 로그인 되지 않는 경우, 
  - return { single: false, myAccounts: IUser[] }
- error: "unExist"(존재하지 않는 사용자) || "unMatch"(잘못된 비밀번호)


### POST /api/user/logout
- 로그아웃
- success: "ok"

### POST /api/user/:nickname/follow
- 팔로우



## /post (단일 게시물)

### POST /api/post/img
- 이미지 파일 전송
- body: formData 의 name 은  "img" 일 것
  ```
  const onChange = (e: any) => {
    const formData = new FormData();
    for (let file of e.target.files) {
      forData.append("img", file)
    }
    axios.post("/api/post/img", formData).then...
  }
  ```
- return: {src: string}[]
- src 의 value 값은 `/img/파일명` 형태로, step 3에서 images 를 표현하기 위한 data 로 활용 가능하다.
- content 롤 보낼 때 같이 보낼 것!!(아래 `POST /api/post` 참고)

### POST /api/post 
- 게시물 생성
- 사진/동영상, hashtag, 댓글작성 여부 설정, content
✅ 아래 body 는 계속 수정될 예정 
- body: { content: string, src: {src: string}[] hideCounts: boolean, turnOffComments: boolean }
- hideCounts, turnOffComments 는 초기값(false)으로 설정되어 있음으로 값을 변경할 경우를 제외하고 body 에 포함하지 않도록 한다.

### POST /api/post/:postId
- 해당 게시물(postId) 정보 가져오기
- 

### POST /api/post/:postId/comment
- 댓글 작성
- body: { content: string, userId: string, postId: string}

### POST /api/post/:postId/comment/:commentId
- 대댓글 작성
- body: { content: string, postId: string, replyingUserId: string, repliedUserId: string}

### POST /api/post/:postId/like
- 좋아요!


## /posts (여러 게시물)

### GET /api/posts
- 여러 게시물 생성 순으로 가져오기.
- success: IPost[]

### GET /api/posts/followers 
- 팔로잉하는 유저 게시물만 가져오기.
- success: IPost[]