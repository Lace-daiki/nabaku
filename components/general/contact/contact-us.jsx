
import Image from 'next/image';

export default function Test() {
    return (
        <div className="w-full h-full flex justify-between gap-8">
            <div className='w-[580px] h-[1083px] py-[125px] px-[32px] gap-20 bg-[#F3F3F3] flex flex-col rounded-[40px] text-[#1C1E4C]'>
                <div className='flex gap-6'>
                    <Image 
                            src="/bx_chat.png" 
                            alt="Company Overview" 
                            width={32} 
                            height={24}
                            className='w-[40px] h-[43px]'
                        />
                    <div>
                        <h3 className="text-[24px] font-medium mb-2">Chat with us</h3>
                        <p className="text-[18px] font-normal mb-1">Our friendly team is here to help</p>
                        <div className="flex gap-2 text-[18px]">
                            <a href="#" className="underline">Instagram</a>
                            <a href="#" className="underline">LinkedIn</a>
                            <a href="#" className="underline">X</a>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6'>
                    <Image 
                            src="/location.png" 
                            alt="Company Overview" 
                            width={32} 
                            height={24}
                            className='w-[40px] h-[43px]'
                        />
                    <div>
                        <h3 className="text-[24px] font-medium mb-2">Visit us</h3>
                        <p className="text-[18px] font-normal mb-1">Come say hello at our office HQ</p>
                        <p className="text-[18px] underline">123 Any Street, Any Town, Nigeria</p>
                    </div>
                </div>

                <div className='flex gap-6'>
                    <Image 
                            src="/call.png" 
                            alt="Company Overview" 
                            width={32} 
                            height={24}
                            className='w-[40px] h-[43px]'
                        />
                    <div>
                        <h3 className="text-[24px] font-medium mb-2">Call us</h3>
                        <p className="text-[18px] font-normal mb-1">Mon–Fri from 8am to 5pm</p>
                        <a href="tel:+9012345678" className="text-[18px] underline">+90 12345678</a>
                    </div>
                </div>
            </div>
            <div className="items-center text-white justify-center w-full bg-[#1C1E4C] rounded-[40px] py-[75px] px-[40px]">
                <div className="w-full flex flex-col items-center gap-30">
                        <div className='w-full flex items-center justify-between mb-6 '>
                            <div className='gap-8'>
                                <h3 className='text-[48px] font-[540] italic mb-7'>get <span className='not-italic font-medium'>in touch</span></h3>
                                <p className='text-[18px] font-medium'>Fill out the form below to get in touch with us.</p>
                            </div>
                            <button className='w-[200px] h-[200px] py-[10px] text-[20px] font-medium px-[50px] bg-[#FFFFFF33] rounded-[40px]'>Contact us</button>
                        </div>
                        <form className='w-full'>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder='Name' 
                                // value={formData.organization}
                                // onChange={handleChange}
                                className='w-full h-[64px] border border-white p-2.5 rounded-[64px] mb-4'
                                required
                            />
                            <div className='flex justify-between gap-4 mb-4'>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder='Email' 
                                    // value={formData.firstName}
                                    // onChange={handleChange}
                                    className='w-full h-[64px] border border-white p-2.5 rounded-[64px] mb-4 md:mb-0' 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="phone" 
                                    placeholder='Phone' 
                                    // value={formData.lastName}
                                    // onChange={handleChange}
                                    className='w-full h-[64px] border border-white p-2.5 rounded-[64px]' 
                                    required 
                                />
                            </div>
                            <textarea 
                                name="message" 
                                placeholder='Messages' 
                                // value={formData.message}
                                // onChange={handleChange}
                                className='w-full h-[256px] border border-white p-2.5 rounded-[32px] mb-4' 
                                required 
                            />
                            <div className='flex flex-col justify-between gap-8'>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    name="terms" 
                                    className="w-[18px] h-[18px] accent-[#1C1E4C] bg-transparent border border-white"
                                    required
                                />
                                <label htmlFor="terms" className="text-white">I agree to the Terms</label>
                            </div>
                                <button 
                                    type="submit" 
                                    className="w-[123px] h-[56px] px-[32px] py-[16px] font-medium text-black bg-white rounded-[60px] text-[14px] text-[#54577A]"
                                >
                                    Send ↑
                                </button>
                            </div>
                        </form>
                        {/* {formSubmitted && <p className="mt-4 text-white">Thank you for your message! We will get back to you soon.</p>}
                            {error && <p className="mt-4 text-red-500">{error}</p>} Display error message */}
                </div>
            </div>
        </div>
    );
}