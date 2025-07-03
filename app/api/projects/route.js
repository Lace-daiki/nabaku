import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace this with your actual database query
    // This is just a mock response for demonstration
    const mockProjects = [
      {
        id: "1",
        title: "Project 1",
        description: "Description for Project 1",
        cover_image: "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg",
        donated_amount: 50000,
        target_amount: 100000,
        contributor_count: 25,
        days_left: 30,
        status: "ongoing"
      },
      {
        id: "2",
        title: "Project 2",
        description: "Description for Project 2",
        cover_image: "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg",
        donated_amount: 75000,
        target_amount: 150000,
        contributor_count: 40,
        days_left: 15,
        status: "ongoing"
      },
      {
        id: "3",
        title: "Project 3",
        description: "Description for Project 3",
        cover_image: "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg",
        donated_amount: 200000,
        target_amount: 200000,
        contributor_count: 100,
        days_left: 0,
        status: "completed"
      }
    ];

    return NextResponse.json(mockProjects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 