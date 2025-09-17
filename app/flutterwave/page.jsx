'Use client';
import Link from 'next/link';


export default async function SuccessPage() {
//   const projects = await getTopProjects();
  return (
    <>
      <div>
        <h1>Payment Successful</h1>
        <Link href="/">Back to Dashbboard</Link>
      </div>
    </>
  );
}