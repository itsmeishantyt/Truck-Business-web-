'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData, validateResumeFile } from '@/lib/schemas';
import { submitApplication } from '@/actions/submitApplication';

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia',
];

const POSITIONS = [
    'OTR Truck Driver (Class A CDL)',
    'Local Delivery Driver',
    'Warehouse & Logistics Associate',
    'Dispatch Coordinator',
    'Other',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="border-b border-slate-700/60 pb-2 mb-5">
            <h3 className="font-semibold text-white text-base">{title}</h3>
        </div>
    );
}

function Field({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="label">
                {label}
                {required && <span className="text-orange-400 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}

export default function ApplyForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [serverMessage, setServerMessage] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeError, setResumeError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationSchema),
        defaultValues: { country: 'United States' },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setResumeFile(file);
        setResumeError(validateResumeFile(file) ?? '');
    };

    const onSubmit = async (data: ApplicationFormData) => {
        const fileErr = validateResumeFile(resumeFile);
        if (fileErr) { setResumeError(fileErr); return; }

        setStatus('submitting');
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => formData.append(k, v));
        formData.append('resume', resumeFile!);

        const result = await submitApplication(formData);
        if (result.success) {
            setStatus('success');
            setServerMessage(result.message);
            reset();
            setResumeFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
            setStatus('error');
            setServerMessage(result.error);
        }
    };

    if (status === 'success') {
        return (
            <div className="card text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">{serverMessage}</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary text-sm">
                    Submit Another Application
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {/* Error banner */}
            {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    ⚠️ {serverMessage}
                </div>
            )}

            {/* ── Personal Information ─────────────────────────────── */}
            <div>
                <SectionHeader title="Personal Information" />
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" required error={errors.firstName?.message}>
                            <input
                                id="firstName"
                                className="input-field"
                                placeholder="John"
                                {...register('firstName')}
                            />
                        </Field>
                        <Field label="Last Name" required error={errors.lastName?.message}>
                            <input
                                id="lastName"
                                className="input-field"
                                placeholder="Smith"
                                {...register('lastName')}
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="SSN / SIN" required error={errors.ssn?.message}>
                            <input
                                id="ssn"
                                className="input-field"
                                placeholder="123-45-6789"
                                maxLength={11}
                                autoComplete="off"
                                {...register('ssn')}
                            />
                        </Field>
                        <Field label="Date of Birth" required error={errors.dateOfBirth?.message}>
                            <input
                                id="dateOfBirth"
                                className="input-field"
                                placeholder="MM/DD/YYYY"
                                maxLength={10}
                                {...register('dateOfBirth')}
                            />
                        </Field>
                    </div>
                </div>
            </div>

            {/* ── Address ──────────────────────────────────────────── */}
            <div>
                <SectionHeader title="Address" />
                <div className="space-y-4">
                    <Field label="Current Street Address" required error={errors.streetAddress1?.message}>
                        <input
                            id="streetAddress1"
                            className="input-field"
                            placeholder="123 Main St"
                            {...register('streetAddress1')}
                        />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="City" required error={errors.city?.message}>
                            <input
                                id="city"
                                className="input-field"
                                placeholder="Dallas"
                                {...register('city')}
                            />
                        </Field>
                        <Field label="State / Province" required error={errors.state?.message}>
                            <select id="state" className="input-field appearance-none" {...register('state')}>
                                <option value="" className="bg-slate-800">Please choose…</option>
                                {US_STATES.map((s) => (
                                    <option key={s} value={s} className="bg-slate-800">{s}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Zip / Postal Code" required error={errors.zipCode?.message}>
                            <input
                                id="zipCode"
                                className="input-field"
                                placeholder="75001"
                                maxLength={10}
                                {...register('zipCode')}
                            />
                        </Field>
                        <Field label="Country" required error={errors.country?.message}>
                            <input
                                id="country"
                                className="input-field"
                                placeholder="United States"
                                {...register('country')}
                            />
                        </Field>
                    </div>

                    <Field
                        label="Have you lived at this address for 3 or more years?"
                        required
                        error={errors.livedAtAddress3PlusYears?.message}
                    >
                        <div className="flex gap-6 mt-1">
                            {(['yes', 'no'] as const).map((val) => (
                                <label key={val} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={val}
                                        className="accent-orange-500 w-4 h-4"
                                        {...register('livedAtAddress3PlusYears')}
                                    />
                                    <span className="text-slate-300 capitalize">{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                                </label>
                            ))}
                        </div>
                    </Field>
                </div>
            </div>

            {/* ── Contact ──────────────────────────────────────────── */}
            <div>
                <SectionHeader title="Contact" />
                <p className="text-xs text-slate-500 mb-4">
                    If your cell phone is also your primary phone, enter it in both fields.
                </p>
                <div className="space-y-4">
                    <Field label="Primary Phone" required error={errors.primaryPhone?.message}>
                        <input
                            id="primaryPhone"
                            type="tel"
                            className="input-field"
                            placeholder="+1 (555) 000-0000"
                            {...register('primaryPhone')}
                        />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Email Address" required error={errors.email?.message}>
                            <input
                                id="email"
                                type="email"
                                className="input-field"
                                placeholder="john@example.com"
                                autoComplete="email"
                                {...register('email')}
                            />
                        </Field>
                        <Field label="Confirm Email Address" required error={errors.confirmEmail?.message}>
                            <input
                                id="confirmEmail"
                                type="email"
                                className="input-field"
                                placeholder="john@example.com"
                                autoComplete="off"
                                onPaste={(e) => e.preventDefault()}
                                {...register('confirmEmail')}
                            />
                        </Field>
                    </div>
                </div>
            </div>

            {/* ── Position & Resume ──────────────────────────────────── */}
            <div>
                <SectionHeader title="Position & Resume" />
                <div className="space-y-4">
                    <Field label="Position Applying For" required error={errors.position?.message}>
                        <select id="position" className="input-field appearance-none" {...register('position')}>
                            <option value="" className="bg-slate-800">Select a position…</option>
                            {POSITIONS.map((p) => (
                                <option key={p} value={p} className="bg-slate-800">{p}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Resume Upload */}
                    <div>
                        <label className="label">
                            Resume / CV <span className="text-orange-400">*</span>
                            <span className="text-slate-500 font-normal ml-1">(PDF only, max 5 MB)</span>
                        </label>
                        <div
                            className={`w-full rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer ${resumeError
                                    ? 'border-red-500/50 bg-red-500/5'
                                    : resumeFile
                                        ? 'border-orange-500/50 bg-orange-500/5'
                                        : 'border-slate-600 hover:border-orange-500/50 bg-slate-800/50'
                                }`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                id="resume"
                                type="file"
                                accept="application/pdf"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="p-6 text-center">
                                {resumeFile ? (
                                    <>
                                        <span className="text-2xl mb-2 block">📄</span>
                                        <p className="text-orange-400 font-medium text-sm">{resumeFile.name}</p>
                                        <p className="text-slate-500 text-xs mt-1">
                                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB — Click to change
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl mb-2 block">📎</span>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-orange-400 font-medium">Click to upload</span> your resume
                                        </p>
                                        <p className="text-slate-500 text-xs mt-1">PDF files only, up to 5 MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                        {resumeError && <p className="error-text">{resumeError}</p>}
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Submitting…
                    </span>
                ) : (
                    'Submit Application →'
                )}
            </button>

            <p className="text-center text-xs text-slate-500">
                Fields marked with <span className="text-orange-400">*</span> are required.
                Your information is kept private and secure.
            </p>
        </form>
    );
}
