'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#BAC8FF] text-black w-full text-[18px] -mt-10 z-10 font-normal">
            <div className="md:container md:py-[80px] md:px-[104px] mx-auto p-2 justify-center items-center">
                <div className='flex justify-between mb-8'>
                    <div className='w-max  md:w-[584px] md flex flex-col gap-2.5 md:gap-8'>
                        <h3 className="text-[80px] font-light text-[#1C1E4C] w-[358px] italic">na<span className='font-bold not-italic'>baku</span></h3>
                        <p className="mb-2 md:mb-0 w-[358px] font-medium text-[18px]">Where Faith Finds Wings</p>
                    </div>
                    <div className='flex justify-between w-full h-[128px] md:w-[584px] gap-[24px]'>
                        <div className='flex flex-col gap-3'>
                            <Link href="about-us">About</Link>
                            <Link href="contact">Contact</Link>
                            <Link href="contact">Contact</Link>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Link href="about-us">About</Link>
                            <Link href="contact">Contact</Link>
                            <Link href="contact">Contact</Link>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Link href="about-us">About</Link>
                            <Link href="contact">Contact</Link>
                            <Link href="contact">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between border-t-2 border-black gap-8 pt-4">
                    <p>&copy; {new Date().getFullYear()} LIF. All Rights Reserved.</p>
                    <button className='bg-white text-[#54577A] px-[32px] text-[14px] font-medium py-[16px] rounded-full'>Donate now</button>
                </div>
            </div>
        </footer>
    );
}