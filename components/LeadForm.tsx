
import React, { useState } from 'react';
import { LeadFormData, University } from '../types';
import { indianStates, intakeYears, PIPEDREAM_ENDPOINT } from '../constants';

interface LeadFormProps {
    university: University;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const generateBrochureContent = (university: University): string => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
    
    const content = `
# BROCHURE: ${university.name.toUpperCase()}

## About Us
Location: ${university.location}
${university.overview}

---

## Courses Offered

${university.courses.map(course =>
`### ${course.name}
- **Duration:** ${course.duration}
- **Description:** ${course.description}
- **Estimated Total Fee:** ${formatCurrency(course.feeRange.min)} - ${formatCurrency(course.feeRange.max)}`
).join('\n\n')}

---

## Placements at ${university.name}
- **Highest Package:** ${university.placements.highestPackage}
- **Average Package:** ${university.placements.averagePackage}
- **Our Top Recruiters:** ${university.placements.topRecruiters.join(', ')}

---

## Our Facilities
${university.facilities.map(facility => `- ${facility}`).join('\n')}

---

Thank you for your interest in ${university.name}!
Our admissions team will be in touch with you shortly.
    `;
    return content.trim().replace(/^    /gm, '');
};

const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};


const LeadForm: React.FC<LeadFormProps> = ({ university }) => {
    const courses = university.courses.map(c => c.name);
    const universityName = university.name;

    const [formData, setFormData] = useState<LeadFormData>({
        fullName: '',
        email: '',
        phone: '',
        state: '',
        course: courses[0] || '',
        intakeYear: intakeYears[0] || '',
        consent: false,
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error && status !== 'error') setError('');
    };

    const validateForm = (): boolean => {
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.state || !formData.course || !formData.intakeYear) {
            setError('Please fill out all required fields.');
            return false;
        }
         if (!formData.consent) {
            setError('You must consent to receive information.');
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            setError('Please enter a valid 10-digit phone number.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (PIPEDREAM_ENDPOINT === 'https://eoxql7i6ccoq9vb.m.pipedream.net') {
            setError('Form not configured by developer. Please provide an API endpoint.');
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setError(''); }, 5000);
            return;
        }

        if (!validateForm()) return;

        setStatus('loading');
        try {
            const response = await fetch(PIPEDREAM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, university: universityName }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
            }

            setStatus('success');
            
            const brochureContent = generateBrochureContent(university);
            downloadFile(brochureContent, `${university.slug}-brochure.txt`);

            setFormData({
                fullName: '', email: '', phone: '', state: '', 
                course: courses[0] || '', intakeYear: intakeYears[0] || '', consent: false
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            setStatus('error');
            setError(`Submission failed. Please try again later.`);
            console.error('Submission Error:', err);
            setTimeout(() => { setStatus('idle'); setError(''); }, 5000);
        }
    };

    const inputStyles = "mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400";
    const labelStyles = "block text-sm font-medium text-neutral-700 dark:text-neutral-300";

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-2xl">
            <p className="text-center text-neutral-600 dark:text-neutral-400 mb-6">Fill in your details below and our admissions team will get in touch with you shortly.</p>
            <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="fullName" className={labelStyles}>Full Name</label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className={inputStyles} required />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelStyles}>Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputStyles} required />
                    </div>
                    <div>
                        <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} pattern="\d{10}" className={inputStyles} required />
                    </div>
                    <div>
                        <label htmlFor="state" className={labelStyles}>State</label>
                        <select name="state" id="state" value={formData.state} onChange={handleChange} className={inputStyles} required>
                            <option value="" disabled>Select your state</option>
                            {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="course" className={labelStyles}>Course Interested In</label>
                        <select name="course" id="course" value={formData.course} onChange={handleChange} className={inputStyles} required>
                            {courses.map(course => <option key={course} value={course}>{course}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="intakeYear" className={labelStyles}>Preferred Intake Year</label>
                        <select name="intakeYear" id="intakeYear" value={formData.intakeYear} onChange={handleChange} className={inputStyles} required>
                             {intakeYears.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={handleChange} className="focus:ring-primary h-4 w-4 text-primary border-neutral-300 rounded dark:bg-neutral-700 dark:border-neutral-600" required />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="consent" className="font-medium text-neutral-700 dark:text-neutral-300">I agree to receive information regarding my application.</label>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-neutral-400">
                        {status === 'loading' && <SpinnerIcon />}
                        {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
                 <div className="mt-4 min-h-[1.5rem] text-center text-sm">
                    {error && <p className="text-red-600 font-medium">{error}</p>}
                    {status === 'success' && <p className="text-green-600 font-medium">Thank you! Your brochure is downloading.</p>}
                 </div>
            </form>
        </div>
    );
};

export default LeadForm;
