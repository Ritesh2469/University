
import React, { useState, useRef, useCallback } from 'react';
import { University } from '../types';
import LeadForm from './LeadForm';
import FeesModal from './FeesModal';

interface UniversityPageProps {
    university: University;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-primary dark:text-primary-light text-4xl mb-3 mx-auto w-fit">{icon}</div>
        <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">{title}</h3>
        <p className="text-3xl font-bold text-primary-dark dark:text-white">{value}</p>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; titleClassName?: string }> = ({ title, children, className = 'py-16 md:py-24', titleClassName = '' }) => (
    <section className={className}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl md:text-4xl font-bold text-center text-primary-dark dark:text-white mb-12 ${titleClassName}`}>{title}</h2>
            {children}
        </div>
    </section>
);


const UniversityPage: React.FC<UniversityPageProps> = ({ university }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const handleApplyNowClick = useCallback(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleDownloadBrochureClick = useCallback(() => {
        
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-neutral-100 dark:bg-neutral-900">
            
            <div className="relative bg-neutral-800 text-white h-[60vh] md:h-[70vh] flex items-center justify-center">
                <img src={university.heroImageUrl} alt={`${university.name} campus`} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="relative z-10 text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">{university.name}</h1>
                    <p className="text-lg md:text-2xl text-neutral-200">{university.location}</p>
                </div>
            </div>

            
            <div className="bg-white dark:bg-neutral-800 shadow-md sticky top-16 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 py-4">
                        <button onClick={() => setIsModalOpen(true)} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">Check Course Fees</button>
                        <button onClick={handleDownloadBrochureClick} className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">Download Brochure</button>
                        <button onClick={handleApplyNowClick} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">Apply Now</button>
                    </div>
                </div>
            </div>


            
            <Section title="University Overview">
                <p className="max-w-4xl mx-auto text-center text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{university.overview}</p>
            </Section>

            
            <Section title="Courses Offered" className="py-16 md:py-24 bg-white dark:bg-neutral-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {university.courses.map((course) => (
                        <div key={course.name} className="bg-neutral-100 dark:bg-neutral-700/50 p-6 rounded-lg shadow-md border-l-4 border-secondary transition-shadow hover:shadow-xl">
                            <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-2">{course.name}</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-semibold">{course.duration}</p>
                            <p className="text-neutral-600 dark:text-neutral-300">{course.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

          
            <Section title="Placements & Recruiters">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                     <StatCard title="Highest Package" value={university.placements.highestPackage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
                    <StatCard title="Average Package" value={university.placements.averagePackage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                </div>
                <h3 className="text-2xl font-bold text-center text-primary-dark dark:text-white mb-6">Top Recruiters</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    {university.placements.topRecruiters.map(recruiter => (
                        <span key={recruiter} className="text-neutral-500 dark:text-neutral-400 font-semibold text-lg">{recruiter}</span>
                    ))}
                </div>
            </Section>

            
            <Section title="World-Class Facilities" className="py-16 md:py-24 bg-white dark:bg-neutral-800">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {university.facilities.map((facility) => (
                        <div key={facility} className="flex items-center space-x-3">
                           <svg className="h-6 w-6 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span className="text-neutral-700 dark:text-neutral-300">{facility}</span>
                        </div>
                    ))}
                </div>
            </Section>

            
            <div ref={formRef} className="scroll-mt-24">
                 <Section title="Start Your Application" className="py-16 md:py-24 bg-primary-dark dark:bg-neutral-900" titleClassName="text-white dark:text-white">
                    <LeadForm university={university} />
                </Section>
            </div>

            <FeesModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                courses={university.courses}
                universityName={university.name}
            />
        </div>
    );
};

export default UniversityPage;
