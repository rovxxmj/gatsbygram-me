import Link from 'next/link';

interface IProps {
  content: string;
}
// 해쉬태그 - 정규식을 통해서 걸러내기.
const PostcardContent = ({ content }: IProps) => {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostcardContent;
