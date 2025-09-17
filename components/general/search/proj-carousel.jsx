'use client';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '../card';
import { getTopProjects } from '@/services/projects/offline';

function NextArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
      >
        <span className="text-gray-700">›</span>
      </button>
    );
  }
  
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
      >
        <span className="text-gray-700">‹</span>
      </button>
    );
  }
  

export default function ProjectsClient() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getTopProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };
    if (loading) return <p>Loading projects...</p>;
    if (projects.length === 0) return <p>No projects found.</p>;
    
    return (
        <div className="bg-[#F3F3F3] rounded-[40px] py-[96px] px-[64px]">
            <Slider {...settings}>
                {projects
                    .map((project) => (
                        <Card key={project._id} project={project} />
                    ))}
            </Slider>
        </div>
    );
}