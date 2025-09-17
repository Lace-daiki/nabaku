"use client";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const recurringEvents = [
  {
    day: "Every Sunday",
    time: "9:00am - 11:30am",
    title: "Sunday Worship Service",
    location: "Ikeja - CCI Ikeja Church",
  },
  {
    day: "Every Wednesday",
    time: "6:30pm - 8:00pm",
    title: "Midweek Bible Study",
    location: "Ikeja - CCI Ikeja Church",
  },
  {
    day: "Every Friday",
    time: "7:00pm - 9:00pm",
    title: "Midweek Bible Study",
    location: "Ikeja - CCI Ikeja Church",
  },
];

const oneTimeEvents = [
  {
    day: "Sat, Sep 14",
    time: "10:00am - 1:00pm",
    title: "Community Outreach",
    location: "Lagos Mainland",
  },
];

export default function WeeklyEvents() {
  const [activeTab, setActiveTab] = useState("recurring");

  const events = activeTab === "recurring" ? recurringEvents : oneTimeEvents;

  return (
    <div className="w-full h-full py-[96px] px-[64px] bg-[#F6F6F6] rounded-[40px] p-6 w-full">

      {/* Tabs */}
      {/* <div className="place-self-end text-[#1C1E4C] flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("recurring")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
            activeTab === "recurring"
              ? "bg-[#1E1A58] text-white border-[#1E1A58]"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          Reoccurring events
        </button>
        <button
          onClick={() => setActiveTab("onetime")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
            activeTab === "onetime"
              ? "bg-[#1E1A58] text-white border-[#1E1A58]"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          One-time events
        </button>
      </div> */}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-start justify-between border-b border-[#8E92BC] pb-3"
          >
            <div className="flex items-start justify-between gap-[80px]">
              {/* Left: Day + Time */}
            <div className="font-medium">
              <p className="text-[18px]">{event.day}</p>
              <p className="text-[14px]">{event.time}</p>
            </div>

            {/* Middle: Title + Location */}
            <div className="font-medium">
              <p className="text-[18px] font-bold">{event.title}</p>
              <p className="text-[14px]">{event.location}</p>
            </div>
            </div>

            {/* Right: Menu */}
            <button className="text-gray-500 hover:text-gray-700">
              <BsThreeDots size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
