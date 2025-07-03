import Link from 'next/link';
import { CircularProgress, Card, CardBody, CardFooter } from "@heroui/react";

const Income = () => {
    return (
        <div className="w-[798px] h-[331px] border border-gray-300 rounded-lg p-4 bg-white shadow-md">
            <h2 className="text-[18px] font-bold mb-4">Income Overview</h2>
            <div className='flex justify-between'>
            <Card className="w-[240px] h-[240px] border-none bg-[#BAC8FF] p-4 rounded-lg">
                <Link href="#" className="text-[#1C1E4C] text-[16px] font-medium flex items-center justify-between">
                    Running Projects
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                <CardBody className="justify-start h-[100px]"> {/* Increased height */}
                    <p className='text-[32px] font-medium'>65</p>
                </CardBody>
                <CardFooter className="flex justify-between pt-0">
                    <div className="relative flex items-center justify-center">
                        <CircularProgress
                            classNames={{
                                svg: "w-20 h-36 drop-shadow-md",
                                indicator: "stroke-[#1C1E4C]",
                                track: "stroke-white/10",
                                value: "text-[18px] font-medium text-[#1C1E4C]",
                            }}
                            showValueLabel={false} // Disable default label
                            strokeWidth={2}
                            value={70}
                        />
                        <span className="absolute text-[18px] font-medium text-[#1C1E4C]">{70}%</span> {/* Percentage value */}
                    </div>
                    <p className='text-[18px] font-medium'>Completion</p>
                </CardFooter>
            </Card>
            <Card className="w-[240px] h-[240px] border-none bg-[#BAC8FF] p-4 rounded-lg">
                <Link href="#" className="text-[#1C1E4C] text-[16px] font-medium flex items-center justify-between">
                    Funds Raised
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                <CardBody className="justify-start h-[100px]"> {/* Increased height */}
                    <p className='text-[32px] font-medium'>N20.3M</p>
                </CardBody>
                <CardFooter className="flex justify-between pt-0">
                    <div className="relative flex items-center justify-center">
                        <CircularProgress
                            classNames={{
                                svg: "w-20 h-36 drop-shadow-md",
                                indicator: "stroke-[#1C1E4C]",
                                track: "stroke-white/10",
                                value: "text-[18px] font-medium text-[#1C1E4C]",
                            }}
                            showValueLabel={false} // Disable default label
                            strokeWidth={2}
                            value={70}
                        />
                        <span className="absolute text-[18px] font-medium text-[#1C1E4C]">{70}%</span> {/* Percentage value */}
                    </div>
                    <p className='text-[18px] font-medium'>Completion</p>
                </CardFooter>
            </Card>
            <Card className="w-[240px] h-[240px] border-none bg-[#BAC8FF] p-4 rounded-lg">
                <Link href="#" className="text-[#1C1E4C] text-[16px] font-medium flex items-center justify-between">
                    Activity
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                <CardBody className="justify-start h-[100px]"> {/* Increased height */}
                    <p className='text-[32px] font-medium'>+N600,000</p>
                </CardBody>
                <CardFooter className="flex justify-between pt-0">
                    <div className="relative flex items-center justify-center">
                        <CircularProgress
                            classNames={{
                                svg: "w-20 h-36 drop-shadow-md",
                                indicator: "stroke-[#1C1E4C]",
                                track: "stroke-white/10",
                                value: "text-[18px] font-medium text-[#1C1E4C]",
                            }}
                            showValueLabel={false} // Disable default label
                            strokeWidth={2}
                            value={70}
                        />
                        <span className="absolute text-[18px] font-medium text-[#1C1E4C]">{70}%</span> {/* Percentage value */}
                    </div>
                    <p className='text-[18px] font-medium'>Completion</p>
                </CardFooter>
            </Card>
            </div>
        </div>
    );
};

export default Income;