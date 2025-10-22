import Image from "next/image";
import Link from "next/link";
import { PiFolderOpenLight, PiMapPinLight } from "react-icons/pi";

export default function FundraiserCard({
  id,
  profile_image,
  title,
  location,
  projects,
  raised,
  amount,
  daysLeft,
  tag,
  category, // <-- new (org | proj)
}) {
  // Build the link based on category
  const link =
    category === "org"
      ? `/search/org-details/${id}`
      : `/search/proj-details/${id}`;

  return (
    <Link href={link} className="block">
      <div className="h-full bg-white rounded-[20px] p-[10px] shadow-sm overflow-hidden w-[400px] gap-2">
        {/* Image */}
        <div className="relative w-full h-[322px] shadow-lg rounded-[10px] mb-[10px]">
          <Image
            src={profile_image}
            alt={title}
            fill
            className="object-cover"
          />
          {/* {tag && (
            <span className="absolute top-2 right-2 bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-full shadow">
              {tag}
            </span>
          )} */}
        </div>

        <div className="w-full h-[210px] pt-[24px] px-[24px] shadow pb-[32px] flex flex-col justify-between rounded-[10px] bg-[#EBEEF9]">
          <h3 className="text-[18px] font-medium text-[#1C1E4C]">{title}</h3>

          <div>
            {/* Optional Meta */}
            {projects && (
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <PiFolderOpenLight className="text-[#1C1E4CCC]" />
                <span>{projects} Active Projects</span>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <PiMapPinLight className="text-[#1C1E4CCC]" />
                <span>{location}</span>
              </div>
            )}

            {/* Progress + Footer */}
            {amount && raised !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-[14px] font-medium text-[#8E92BC]">
                  <span>₦{raised.toLocaleString()}</span>
                  <span>₦{amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-1.5 bg-[#1C1E53] rounded-full"
                    style={{ width: `${(raised / amount) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {daysLeft && <p className="w-[87px] h-[33px] text-[12px] font-medium text-[#1C1E53] p-[12px] border rounded-[10px] mt-2">{daysLeft} days left</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}
