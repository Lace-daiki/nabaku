import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Replace this with your actual database query
    // This is just a mock response for demonstration
    const mockProject = {
      id: params.id,
      title: "Sample Project",
      description: "This is a sample project description. It can be multiple lines long and contain detailed information about the project.",
      cover_image: "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg",
      donated_amount: 50000,
      target_amount: 100000,
      contributor_count: 25,
      days_left: 30,
      status: "ongoing",
      qr_code: "https://storage.googleapis.com/a1aa/image/26b4mUXWRKqb1XpCV8tOVs3HkF6jvUWB09Fnh398fVM.jpg"
    };

    return NextResponse.json(mockProject);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
} 