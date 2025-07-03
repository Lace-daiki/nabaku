'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AboutCard({ title, description, image }) {
    const router = useRouter();

    return (
            <div className="flex flex-col items-center justify-between w-full mt-15">
                <div className="w-full px-[64px] flex items-center justify-between bg-white mb-8">
                    <h2 className="text-[48px] font-[540] italic text-[#1C1E4C] tracking-wider">
                    how
                    <span className="not-italic font-medium"> it works</span> 
                    </h2>
                    <div className="space-x-2">
                    <button className="border text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition">
                        Set up donation
                    </button>
                    <button className="border text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition">
                        Make a donation
                    </button>
                    </div>
                </div>
                
                <section className="flex items-center justify-between w-full bg-[#F3F3F3] h-[354px] rounded-[30px] px-[64px] py-[40px] mb-4"> 
                    <div className='w-full rounded-t-[20px] md:rounded-l-[20px] lg:rounded-r-none'>
                        
                        <h3 className='text-[32px] font-medium text-[#1C1E4C]'>Get signed up</h3>
                        <p className='text-[18px] font-medium text-[#1C1E4CCC]'>
                            Easily join Na BaKa and bring your religious organization into a global community. Our streamlined registration ensures a quick and secure start to your journey.
                        </p>
                    </div>  
                    <div className="w-full">
                        <Image 
                            src="/01.png" 
                            alt="Company Overview" 
                            width={606.16} 
                            height={136}
                        />
                    </div>
                </section>

                <section className='flex items-center justify-between w-full h-[354px] rounded-[30px] px-[64px] py-[40px] bg-[#F3F3F3] mb-4'>
                    <div className="w-full items-center rounded-b-[20px] md:rounded-l-[20px] lg:rounded-r-none overflow-hidden">
                        <Image 
                            src="/02.png" 
                            alt="Vision" 
                            width={606.16} 
                            height={154}
                        />
                    </div>
                    <div className='w-full'>
                            <h3 className='text-[32px] font-medium text-[#1C1E4C]'>Create a fundraiser</h3>
                        <p className='text-[18px] font-medium text-[#1C1E4CCC]'>
                            Craft a personalized fundraising campaign effortlessly on Na BaKa. Set goals, customize messages, and connect authentically with your supporters to turn your vision into a compelling reality.
                        </p>
                    </div>  
                </section>

                <section className='flex items-center justify-between w-full h-[354px] rounded-[30px] px-[64px] py-[40px] bg-[#F3F3F3] mb-4'>
                    <div className='w-full gap-4'>
                            <h3 className='text-[32px] font-medium text-[#1C1E4C]'>Receive donations</h3>
                        <p className='text-[18px] font-medium text-[#1C1E4CCC]'>
                            Experience the impact of collective support as donations flow in. Na Ba Ku provides a secure platform for your organization to receive contributions, with real-time monitoring to keep your community engaged and informed. From inception to realization, Na BaKa supports your faith-driven goals at every step.
                        </p>
                    </div>  
                        <Image 
                            src="/03.png" 
                            alt="Company Mission" 
                            width={606.16} 
                            height={136}
                        />
                </section>
            </div>
    );
}