'use client';

const steps = [
  {
    id: 'n1',
    name: 'Jonathan Doe',
    description:
      `"Na Ba Ku has been a game-changer for our religious community. The platform's ease of use made setting up our fundraising campaign a breeze, and the global outreach helped us connect with supporters we never thought possible. Grateful for the seamless experience and the positive impact we've achieved together."`,
    icon: '/gbyb.png', // replace with your real path
  },
  {
    id: 'n2',
    name: 'Janet Doe',
    description:
      `"Na Ba Ku turned our vision into reality. The real-time monitoring of donations kept us connected with our community, and the interactive features added a personal touch to our campaign. It's more than a platform; it's a partner in our journey of faith and transformation."`,
    icon: '/gwpr.png', // replace with your real path
  },
  {
    id: 'n3',
    name: 'John Doe',
    description:
      `"As a first-time user of a fundraising platform, Na Ba Ku exceeded our expectations. The customization options allowed us to share our message authentically, and the secure donation process gave our supporters peace of mind. Na BaKa truly embodies the spirit of faith-driven change."`,
    icon: '/gyto.png', // replace with your real path
  },
];

export default function Testimon() {
  return (
    <div className="bg-[#F3F3F3] w-full h-full pt-[96px] pb-[64px] px-[64px] rounded-[20px] flex flex-col items-center">
      <div className="h-full flex flex-col gap-8">
        <h2 className="text-[48px] font-[540] italic text-[#1C1E4C] mb-4 items-start">
          user
          <span className="not-italic font-medium"> testimonial</span> 
        </h2>

        <div className="flex gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-[395px] h-[619px] items-center bg-[#FFFFFF] rounded-xl p-[10px]"
            >
              {/* Icon */}
              <div className="w-full h-[161px] mb-4">
                <img src={step.icon} alt={step.id}/>
              </div>

              {/* Text */}
              <div className="w-full h-[422px] rounded-[10px] flex flex-col justify-between text-[#1C1E4CCC] font-medium py-[32px] px-[16px] bg-[#F3F3F3]">
                <p className="text-[18px]">{step.description}</p>
                <h3 className="text-[32px] font-medium">{step.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
