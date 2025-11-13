
import React from 'react';
import { Course } from '../types';

interface FeesModalProps {
    isOpen: boolean;
    onClose: () => void;
    courses: Course[];
    universityName: string;
}

const FeesModal: React.FC<FeesModalProps> = ({ isOpen, onClose, courses, universityName }) => {
    if (!isOpen) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace('₹', '₹ ');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 p-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-dark dark:text-white">Course Fees</h2>
                        <p className="text-neutral-500 dark:text-neutral-400">{universityName}</p>
                    </div>
                    <button onClick={onClose} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 flex-grow">
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {courses.map((course) => (
                            <li key={course.name} className="py-4">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{course.name}</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{course.duration}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                        <p className="text-lg font-bold text-primary dark:text-primary-light">
                                            {formatCurrency(course.feeRange.min)} - {formatCurrency(course.feeRange.max)}
                                        </p>
                                        <p className="text-xs text-neutral-400 dark:text-neutral-500">(Total Program Fee)</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="sticky bottom-0 bg-neutral-100 dark:bg-neutral-900/80 backdrop-blur-sm p-4 border-t dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-400 text-center">
                    <p><strong>Note:</strong> Fees are subject to change. Please contact the admissions office for the final fee structure.</p>
                </div>
            </div>
        </div>
    );
};

export default FeesModal;
