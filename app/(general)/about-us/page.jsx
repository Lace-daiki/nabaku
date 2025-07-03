
import Image from 'next/image';
import AboutCard from '@/components/general/about/about-card';
import ContactCard from '@/components/general/contact';


export default async function AboutUS() {
  return (
    <>
        <div className="w-full h-[410px] bg-[#12175B] text-white py-[185px] px-[40px] flex flex-col items-center justify-center gap-[40px]">
            <h3 className='text-[48px] italic font-[540]'>ABOUT <span className='not-italic font-medium'>US</span></h3>
            <p className='text-[18px] font-medium'>Committed to revolutionizing the way donations are made to charities and religious bodies around the globe.</p>
        </div>
        
        <div className='w-full h-full -mt-10 z-0 bg-white flex flex-col items-center justify-evenly gap-10 px-[40px] pt-[150px] rounded-[20px]'>
            <div className='w-full h-full rounded-[40px]'>
                <Image
                    src="/comp.png"
                    alt="about"
                    width={1360}
                    height={747}
                    className='object-cover w-full'
                    />
            </div>
            <div className='w-full h-full flex gap-[32px]'>
                <div className='w-full gap-[64px] py-[96px] px-[64px] bg-[#F3F3F3] rounded-[40px]'>
                    <h3 className='text-[48px] text-[#1C1E4C] font-[540] italic'>who <span className='font-medium not-italic'>we are</span></h3>
                    <p className='text-[#1C1E4CCC] text-[18px] font-medium'>Welcome to Na Ba Ku, your dedicated platform for facilitating seamless donations to both charitable causes and religious organizations worldwide. Our mission is to empower individuals and organizations to support their chosen causes with ease and efficiency, eliminating the need for cumbersome communication methods such as phone calls or emails.</p>
                </div>
                <div className='w-full gap-[64px] py-[96px] px-[64px] bg-[#F3F3F3] rounded-[40px]'>
                    <h3 className='text-[48px] text-[#1C1E4C] font-[540] italic'>our <span className='font-medium not-italic'>commitment</span></h3>
                    <p className='text-[#1C1E4CCC] text-[18px] font-medium'>At Na Ba Ku, we are committed to revolutionizing the way donations are made to charities and religious bodies around the globe. Through our user-friendly interface, we provide a convenient and secure channel for donors to contribute to their preferred causes, whether they are charitable organizations or religious institutions, from anywhere in the world.</p>
                </div>
            </div>
          <AboutCard />
        </div>
      <div className="flex flex-col items-start text-white w-full bg-[#1C1E4C] rounded-t-[40px] pt-[110px] px-[104px] pb-[150px] gap-[64px]">
            <h3 className='text-[48px] font-medium'>Why Choose Us</h3>
            <div className='w-full flex'>
                <div className='w-full rounded-[24px] p-[64px] gap-[16px] border-[1px] border-[#8E92BC4D]'>
                    <h3 className='font-medium text-[32px]'>Accessibility</h3>
                    <p className='font-medium text-[18px]'>Na Ba Ku ensures that donating to both charitable causes and religious bodies is accessible to everyone, regardless of geographical location or time constraints. Our platform is available 24/7, allowing donors to give at their convenience.</p>
                </div>
                <div className='w-full rounded-[24px] p-[64px] gap-[16px] border-[1px] border-[#8E92BC4D]'>
                    <h3 className='font-medium text-[32px]'>Efficiency</h3>
                    <p className='font-medium text-[18px]'>Say goodbye to lengthy phone calls and email exchanges. Our streamlined donation process saves time and effort, enabling donors to make contributions quickly and efficiently.</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div className='w-full rounded-[24px] p-[64px] gap-[16px] border-[1px] border-[#8E92BC4D]'>
                    <h3 className='font-medium text-[32px]'>Trustworthiness</h3>
                    <p className='font-medium text-[18px]'>We prioritize trust and transparency in all our interactions. Donors can rest assured that their contributions are securely processed and utilized for the intended purposes, with full accountability and transparency maintained throughout the process.</p>
                </div>
                <div className='w-full rounded-[24px] p-[64px] gap-[16px] border-[1px] border-[#8E92BC4D]'>
                    <h3 className='font-medium text-[32px]'>Impact</h3>
                    <p className='font-medium text-[18px]'>By partnering with Na Ba Ku, donors can amplify the impact of their generosity and support the vital work of charities and religious bodies worldwide. Every donation, no matter the size, has the potential to bring about positive change and transformation in communities across the globe.</p>
                </div>
            </div>
          </div>
          <div className='w-full z-10 -mt-10 bg-white py-[150px] px-[40px] flex rounded-t-[40px]'>
            <div className='py-[96px] px-[64px] bg-[#F3F3F3] rounded-[40px]'>
                <h3 className='text-[48px] italic text-[#1C1E4C] font-[540] mb-8'>get <span className='font-medium not-italic'>involved</span></h3>
                <p className='text-[18px] font-medium text-[#1C1E4CCC] mb-20'>Join us in our mission to empower charitable causes and religious organizations worldwide and make a lasting impact on the lives of others. Whether you're an individual donor, a corporate sponsor, or a charitable institution seeking support, Na Ba Ku welcomes your participation and collaboration.<br/><br/> Together, we can build a brighter future for causes and communities around the world. Thank you for choosing Na Ba Ku as your trusted partner in giving.</p>
                <button className='w-[195px] h-[56px] py-[16px] px-[32px] bg-white rounded-[60px]'>Partner with us</button>
            </div>
            <Image
                    src="/Page 1 2.png"
                    alt="about"
                    width={314}
                    height={569}
                    className='w-[314px] h-[569px]'
                    />
          </div>
      <ContactCard />
    </>
  );
}