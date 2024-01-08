import { useRouter } from 'next/router';
import React from 'react';

export default function EditablePage() {
  const router = useRouter();
  console.log('router.query:', router.query);
  return (
    <>
      <p> this is editable page</p>
      <p>Post:  {router.query.slug}</p>
    </>
   
  );
}