
import Image from 'next/image';
import AboutCard from '@/components/general/about/about-card';
import ContactCard from '@/components/general/contact';
import Test from '@/components/general/contact/contact-us';
import MapSection from '@/components/general/contact/map-section';


export default async function ContactUS() {
  return (
    <>
        <div className="w-full h-[410px] bg-[#12175B] text-white py-[185px] px-[40px] flex flex-col items-center justify-center gap-[40px]">
            <h3 className='text-[48px] italic font-[540]'>CONTACT <span className='not-italic font-medium'>US</span></h3>
            <p className='text-[18px] font-medium text-center'>Contact us using the form below and we will get back to you right away. Alternatively you can send us a message <br /> on any of our social media platforms and we will get back to you as soon as possible.</p>
        </div>
        
        <div className='w-full h-full -mt-10 z-0 bg-white flex items-center justify-evenly gap-10 px-[40px] py-[150px] rounded-[20px]'>
            <Test/>
        </div>
        <MapSection/>
    </>
  );
}