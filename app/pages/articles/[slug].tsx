import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  console.log('router.query:', router.query);
  return <p>Post: {router.query.slug}</p>;
}