import Card from '@/components/general/card';
import ImageOverlay from '@/components/general/image-overlay';
import Reason from '@/components/general/reason';
import Head from 'next/head';
import { getTopProjects } from '@/services/projects/offline';
import AboutCard from '@/components/general/about/about-card';
import Testimon from '@/components/general/testimon';
import ContactCard from '@/components/general/contact';


export default async function HomePage() {
  const projects = await getTopProjects();
  return (
    <>
      <Head>
        <title>Home - Nabaku</title>
        <meta name="description" content="Explore LIF service options which are revolutionizing agricultural practices and shaping the future of food production." />
      </Head>
      <ImageOverlay />
      <main className="flex flex-col items-center justify-center">
          
        
        <div className="w-full h-[1219px] -mt-10 z-0 bg-[url(/body.jpg)] gap-4 px-[24px] pt-[24px] pb-[32px] rounded-[20px]">
          <div className='w-[1360px] h-[919px] bg-[#1C1E4C4D] flex flex-col gap-4 px-[64px] pt-[96px] pb-[32px] ml-16 mt-16 rounded-[40px]'>
            <h3 className='text-[#F5F5F5] text-[48px] italic font-[540]'>discover <span className='not-italic font-medium'>fundrasiers</span></h3>
            <div className="w-[179px]  bg-white border rounded-[10px] text-center px-[32px] py-[10px]">
              <p className="text-[14px] font-medium text-[#54577A]">Most Popular</p>
            </div>
            <div className='flex flex-wrap gap-4'>
              {projects.length === 0 ? (
                <p>No projects found.</p>
              ) : (
                projects
                  .sort((a, b) => b.donated_amount - a.donated_amount)
                  .slice(0, 3)
                  .map((project) => (
                    <Card key={project._id} project={project} />
                  ))
              )}
            </div>
          </div>
        </div>
        <div className='w-full h-full -mt-10 z-10 bg-white flex flex-col items-center justify-evenly gap-4 px-[40px] pt-[150px] pb-[20px] rounded-[20px]'>
          <Reason />
          <AboutCard />
          <Testimon />
        </div>
      </main>
      <ContactCard />
    </>
  );
}