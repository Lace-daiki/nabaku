// /app/components/ContactCard.jsx

'use client';


export default function ContactCard() {
    // const router = useRouter();
    // const [formData, setFormData] = useState({
    //     organization: '',
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     message: ''
    // });
    // const [formSubmitted, setFormSubmitted] = useState(false);
    // const [error, setError] = useState('');

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', formData);
    //     setError(''); // Reset error state
    //     try {
    //         const response = await fetch('/api/sendContact', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             setFormSubmitted(true);
    //             setFormData({
    //                 organization: '',
    //                 firstName: '',
    //                 lastName: '',
    //                 email: '',
    //                 phone: '',
    //                 message: ''
    //             });
    //         } else {
    //             const errorData = await response.json();
    //             setError(errorData.message || 'Failed to send message');
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setError('Something went wrong.');
    //     }
    // };

    return (
        <div className="flex z-20 -mt-10 items-center text-white justify-center w-full h-full bg-[#1C1E4C] rounded-[40px] py-[150px] px-[40px]">
            <div className="w-full flex flex-col items-center max-w-[1232px] gap-[28px] p-5">
                    <div className='w-full flex items-center justify-between mb-6 '>
                        <div className='gap-8'>
                            <h3 className='text-[48px] font-[540] italic mb-7'>need <span className='not-italic font-medium'>some help? get in touch</span></h3>
                            <p className='text-[18px] font-medium'>Fill out the form below to get in touch with us.</p>
                        </div>
                        <button className='w-[240px] h-[240px] py-[50px] text-[24px] font-medium px-[10px] bg-[#FFFFFF33] rounded-[40px]'>Contact us</button>
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
    );
}