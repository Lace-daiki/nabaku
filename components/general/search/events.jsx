"use client";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { activityService } from "@/services/activity/activity";

import moment from 'moment';

// Normalize and parse UTC timestamps, including single-digit hour like T6:30:00Z
const parseUtc = (s) => {
  if (!s) return null;
  // Pad single-digit hour after 'T' (e.g., T6: -> T06:)
  const normalized = s.replace(/T(\d):/, 'T0$1:');
  const m = moment.utc(normalized, [
    moment.ISO_8601,
    'YYYY-MM-DDTHH:mm:ss[Z]',
    'YYYY-MM-DDTH:mm:ss[Z]',
    'YYYY-MM-DDTHH:mm[Z]',
    'YYYY-MM-DDTH:mm[Z]'
  ], true);
  return m.isValid() ? m : null;
};

// Format date to show day and time in a readable format with 24-hour clock
const formatDate = (dateString) => {
  const m = parseUtc(dateString);
  return m ? m.local().format('dddd, MMM D, YYYY, HH:mm') : 'Invalid Date';
};

// Format time range in 24-hour format
const formatTimeRange = (start, end) => {
  const s = parseUtc(start);
  const e = parseUtc(end);
  if (!s || !e) return 'Invalid Time Range';
  return `${s.local().format('HH:mm')} - ${e.local().format('HH:mm')}`;
};

export default function WeeklyEvents({ organizationId = '67e4107d1c703b00156d60f4' }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await activityService.getPublicActivities(organizationId);
        if (data && data.data) {
          // Sort events by start time and take the first 3
          const sortedEvents = data.data
            .filter(event => event.start && event.end) // Filter out events with missing dates
            .sort((a, b) => new Date(a.start) - new Date(b.start)) // Sort by start time
            .slice(0, 3); // Take only first 3 events
          
          console.log('Formatted events:', sortedEvents); // Debug log
          setEvents(sortedEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizationId]);

  if (loading) {
    return (
      <div className="w-full h-full py-[96px] px-[64px] bg-[#F6F6F6] rounded-[40px] p-6 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E1A58] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full py-[96px] px-[64px] bg-[#F6F6F6] rounded-[40px] p-6 w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading events</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full h-full py-[96px] px-[64px] bg-[#F6F6F6] rounded-[40px] p-6 w-full flex items-center justify-center">
        <p className="text-gray-600">No upcoming events scheduled</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-[96px] px-[64px] bg-[#F6F6F6] rounded-[40px] p-6 w-full">
      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => {
          const eventDate = new Date(event.start);
          const formattedDate = formatDate(event.start);
          const formattedTime = formatTimeRange(event.start, event.end);
          
          return (
            <div
              key={event._id}
              className="flex items-start justify-between border-b border-[#8E92BC] pb-3"
            >
              <div className="flex items-start justify-between gap-[80px]">
                {/* Left: Day + Time */}
                <div className="font-medium">
                  <p className="text-[18px]">{formattedDate.split(',')[0]}</p>
                  <p className="text-[14px]">{formattedTime}</p>
                </div>

                {/* Middle: Title + Location */}
                <div className="font-medium">
                  <p className="text-[18px] font-bold">{event.name}</p>
                  <p className="text-[14px]">{event.location || 'Location not specified'}</p>
                </div>
              </div>

              {/* Right: Menu */}
              <button className="text-gray-500 hover:text-gray-700">
                <BsThreeDots size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
