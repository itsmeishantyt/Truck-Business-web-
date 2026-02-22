'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertTriangle, Info, FileText, Paperclip } from 'lucide-react';
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

const POSITIONS = ['Company Driver', 'Owner Operator', 'Fleet Owner', 'Driver for Owner Operator'];
const HEAR_OPTIONS = ['Driver Referral', 'Craigslist', 'Facebook', 'Driver Pulse', 'Newspaper', 'Web', 'Other'];
const EXPERIENCE_OPTIONS = ['None', 'Less than 1 year', '1 - 2 years', '3 - 5 years', '5+ years'];
const ENDORSEMENTS = ['None', 'Other', 'Tanker', 'Doubles / Triples', 'X Endorsement', 'HazMat'];

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Step = 1 | 2 | 3 | 4 | 5 | 6;

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="border-b border-[var(--color-border)] pb-2 mb-5">
            <h3 className="font-semibold text-[var(--color-text)] text-base">{title}</h3>
        </div>
    );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="label">
                {label} {required && <span className="text-orange-400 ml-0.5">*</span>}
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

    const [step, setStep] = useState<Step>(1);

    const { register, control, handleSubmit, trigger, watch, formState: { errors }, reset } = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationSchema) as any,
        defaultValues: { country: 'United States' },
    });

    const { fields: licenseFields, append: appendLicense, remove: removeLicense } = useFieldArray({ control, name: 'licenses' });
    const { fields: employFields, append: appendEmploy, remove: removeEmploy } = useFieldArray({ control, name: 'employmentHistory' });

    useEffect(() => {
        if (licenseFields.length === 0) {
            appendLicense({ licenseNumber: '', country: 'United States', state: '', expirationDate: '', dotMedicalCardExpiration: '', isCurrent: 'yes', isCommercial: 'no', endorsements: [] });
        }
    }, [appendLicense, licenseFields.length]);

    const howDidYouHear = watch('howDidYouHear');
    const employedLast10Years = watch('employedLast10Years');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setResumeFile(file);
        setResumeError(validateResumeFile(file) ?? '');
    };

    const handleNext = async () => {
        let fieldsToValidate: (keyof ApplicationFormData)[] = [];
        if (step === 1) fieldsToValidate = ['firstName', 'lastName', 'ssn', 'dateOfBirth', 'otherName'];
        if (step === 2) fieldsToValidate = ['streetAddress1', 'country', 'city', 'state', 'zipCode', 'livedAtAddress3PlusYears'];
        if (step === 3) fieldsToValidate = ['primaryPhone', 'email', 'confirmEmail', 'position', 'isOwnerOperator', 'location', 'eligibleUS', 'currentlyEmployed', 'englishProficiency', 'workedBefore', 'twicCard', 'howDidYouHear', 'referralName', 'otherHear', 'fmcsaRegistered', 'militaryService', 'attendedSchool', 'employedLast10Years'];
        if (step === 4) fieldsToValidate = ['licenses'];
        if (step === 5) fieldsToValidate = ['expStraightTruck', 'expTractorSemi', 'expTractorTwoTrailers', 'expOther', 'employmentHistory'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setStep((s) => (s + 1) as Step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setStep((s) => (s - 1) as Step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onSubmit = async (data: ApplicationFormData) => {
        const fileErr = validateResumeFile(resumeFile);
        if (fileErr) { setResumeError(fileErr); return; }

        setStatus('submitting');
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => {
            if (k === 'licenses' || k === 'employmentHistory') {
                formData.append(k, JSON.stringify(v));
            } else {
                formData.append(k, v as string);
            }
        });
        formData.append('resume', resumeFile!);

        const result = await submitApplication(formData);
        if (result.success) {
            setStatus('success');
            setServerMessage(result.message);
            reset();
            setResumeFile(null);
            setStep(1);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
            setStatus('error');
            setServerMessage(result.error);
        }
    };

    if (status === 'success') {
        return (
            <div className="card text-center py-12 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Application Submitted!</h2>
                <p className="text-[var(--color-muted)] mb-6 max-w-md mx-auto">{serverMessage}</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary text-sm">
                    Submit Another Application
                </button>
            </div>
        );
    }

    const YesNoRadio = ({ name }: { name: any }) => (
        <div className="flex gap-6 mt-1">
            {(['yes', 'no'] as const).map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={val} className="accent-orange-500 w-4 h-4" {...register(name)} />
                    <span className="text-[var(--color-muted)] capitalize">{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                </label>
            ))}
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {/* Progress Bar */}
            <div className="mb-8 hidden sm:block">
                <div className="flex justify-between text-xs font-semibold text-[var(--color-muted)] mb-2">
                    <span className={step >= 1 ? "text-orange-400" : ""}>1. Personal</span>
                    <span className={step >= 2 ? "text-orange-400" : ""}>2. Address</span>
                    <span className={step >= 3 ? "text-orange-400" : ""}>3. General</span>
                    <span className={step >= 4 ? "text-orange-400" : ""}>4. Licenses</span>
                    <span className={step >= 5 ? "text-orange-400" : ""}>5. Experience</span>
                    <span className={step >= 6 ? "text-orange-400" : ""}>6. Submit</span>
                </div>
                <div className="w-full bg-[var(--color-surface)] rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }} />
                </div>
            </div>

            {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex gap-2 items-start">
                    <AlertTriangle className="w-5 h-5 shrink-0" /> {serverMessage}
                </div>
            )}

            {/* ── Step 1: Personal Info ─────────────────────────────── */}
            <div className={step === 1 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 1: Personal Information" />
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" required error={errors.firstName?.message}><input className="input-field" placeholder="John" {...register('firstName')} /></Field>
                        <Field label="Last Name" required error={errors.lastName?.message}><input className="input-field" placeholder="Smith" {...register('lastName')} /></Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="SSN / SIN" required error={errors.ssn?.message}><input className="input-field" placeholder="123-45-6789" maxLength={11} autoComplete="off" {...register('ssn')} /></Field>
                        <Field label="Date of Birth" required error={errors.dateOfBirth?.message}><input className="input-field" placeholder="MM/DD/YYYY" maxLength={10} {...register('dateOfBirth')} /></Field>
                    </div>
                    <Field label="Have you ever been known by any other name?" required error={errors.otherName?.message}><YesNoRadio name="otherName" /></Field>
                </div>
            </div>

            {/* ── Step 2: Address ──────────────────────────────────────────── */}
            <div className={step === 2 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 2: Address" />
                <div className="space-y-4">
                    <Field label="Current Street Address" required error={errors.streetAddress1?.message}><input className="input-field" placeholder="123 Main St" {...register('streetAddress1')} /></Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="City" required error={errors.city?.message}><input className="input-field" placeholder="Dallas" {...register('city')} /></Field>
                        <Field label="State / Province" required error={errors.state?.message}>
                            <select className="input-field appearance-none" {...register('state')}>
                                <option value="" className="bg-[var(--color-surface)]">Please choose…</option>
                                {US_STATES.map((s) => <option key={s} value={s} className="bg-[var(--color-surface)]">{s}</option>)}
                            </select>
                        </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Zip / Postal Code" required error={errors.zipCode?.message}><input className="input-field" placeholder="75001" maxLength={10} {...register('zipCode')} /></Field>
                        <Field label="Country" required error={errors.country?.message}><input className="input-field" placeholder="United States" {...register('country')} /></Field>
                    </div>
                    <Field label="Have you lived at this address for 3 or more years?" required error={errors.livedAtAddress3PlusYears?.message}><YesNoRadio name="livedAtAddress3PlusYears" /></Field>
                </div>
            </div>

            {/* ── Step 3: Contact & General Info ──────────────────────────── */}
            <div className={step === 3 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 3: Contact & General Information" />
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="Primary Phone" required error={errors.primaryPhone?.message}><input type="tel" className="input-field" placeholder="+1 (555) 000-0000" {...register('primaryPhone')} /></Field>
                        <Field label="Email Address" required error={errors.email?.message}><input type="email" className="input-field" placeholder="john@example.com" autoComplete="email" {...register('email')} /></Field>
                        <Field label="Confirm Email" required error={errors.confirmEmail?.message}><input type="email" className="input-field" placeholder="john@example.com" autoComplete="off" onPaste={(e) => e.preventDefault()} {...register('confirmEmail')} /></Field>
                    </div>
                    <div className="border-t border-[var(--color-border)] my-4 pt-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Field label="Position Applying For" required error={errors.position?.message}>
                                <select className="input-field appearance-none" {...register('position')}>
                                    <option value="" className="bg-[var(--color-surface)]">Select a position…</option>
                                    {POSITIONS.map((p) => <option key={p} value={p} className="bg-[var(--color-surface)]">{p}</option>)}
                                </select>
                            </Field>
                            <Field label="Are you an Owner Operator/Fleet Owner?" required error={errors.isOwnerOperator?.message}><YesNoRadio name="isOwnerOperator" /></Field>
                            <Field label="What location are you applying for?" required error={errors.location?.message}><input className="input-field" placeholder="Dallas, TX" {...register('location')} /></Field>
                            <Field label="Legally eligible to work in the US?" required error={errors.eligibleUS?.message}><YesNoRadio name="eligibleUS" /></Field>
                            <Field label="Are you currently employed?" required error={errors.currentlyEmployed?.message}><YesNoRadio name="currentlyEmployed" /></Field>
                            <Field label="Have you attended a school (not related to truck driving) in the last 10 years?" required error={errors.attendedSchool?.message}><YesNoRadio name="attendedSchool" /></Field>
                        </div>
                        <div className="space-y-4">
                            <Field label="Read, write, and speak English?" required error={errors.englishProficiency?.message}><YesNoRadio name="englishProficiency" /></Field>
                            <Field label="Worked for this company before?" required error={errors.workedBefore?.message}><YesNoRadio name="workedBefore" /></Field>
                            <Field label="Current TWIC card?" required error={errors.twicCard?.message}><YesNoRadio name="twicCard" /></Field>
                            <Field label="Were you ever in the military?" required error={errors.militaryService?.message}><YesNoRadio name="militaryService" /></Field>
                            <Field label="Registered for FMCSA Clearinghouse?" required error={errors.fmcsaRegistered?.message}><YesNoRadio name="fmcsaRegistered" /></Field>
                            <Field label="Employed, contracted, or attended orientation in the last 10 years?" required error={errors.employedLast10Years?.message}><YesNoRadio name="employedLast10Years" /></Field>
                        </div>
                    </div>

                    <div className="border-t border-[var(--color-border)] my-4 pt-4"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="How did you hear about us?" required error={errors.howDidYouHear?.message}>
                            <select className="input-field appearance-none" {...register('howDidYouHear')}>
                                <option value="" className="bg-[var(--color-surface)]">Select an option…</option>
                                {HEAR_OPTIONS.map((o) => <option key={o} value={o} className="bg-[var(--color-surface)]">{o}</option>)}
                            </select>
                        </Field>
                        {howDidYouHear === 'Driver Referral' && (
                            <Field label="Driver Referral Name" error={errors.referralName?.message}><input className="input-field" placeholder="Jane Doe" {...register('referralName')} /></Field>
                        )}
                        {howDidYouHear === 'Other' && (
                            <Field label="Other Explanation" error={errors.otherHear?.message}><input className="input-field" placeholder="Explanation..." {...register('otherHear')} /></Field>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Step 4: Licenses ───────────────────────────────────────── */}
            <div className={step === 4 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 4: License Details" />
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-sm mb-6 flex gap-2 items-start">
                    <Info className="w-5 h-5 shrink-0" /> Please provide all licenses you have held within the last 3 years.
                </div>

                <div className="space-y-8">
                    {licenseFields.map((field, index) => {
                        const err = errors.licenses?.[index];
                        return (
                            <div key={field.id} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-[var(--color-text)] font-medium text-sm">License #{index + 1}</h4>
                                    {licenseFields.length > 1 && (
                                        <button type="button" onClick={() => removeLicense(index)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="License Number" required error={err?.licenseNumber?.message}><input className="input-field" placeholder="M90000..." {...register(`licenses.${index}.licenseNumber` as const)} /></Field>
                                    <Field label="Country" required error={err?.country?.message}><input className="input-field" {...register(`licenses.${index}.country` as const)} /></Field>
                                    <Field label="Licensing Authority (State)" required error={err?.state?.message}>
                                        <select className="input-field appearance-none" {...register(`licenses.${index}.state` as const)}>
                                            <option value="" className="bg-[var(--color-surface)]">Please choose…</option>
                                            {US_STATES.map((s) => <option key={s} value={s} className="bg-[var(--color-surface)]">{s}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="License Expiration Date" required error={err?.expirationDate?.message}><input type="date" className="input-field" {...register(`licenses.${index}.expirationDate` as const)} /></Field>
                                    <Field label="DOT Medical Card Expiration" error={err?.dotMedicalCardExpiration?.message}><input type="date" className="input-field" {...register(`licenses.${index}.dotMedicalCardExpiration` as const)} /></Field>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Is this your current driver license?" required error={err?.isCurrent?.message}><YesNoRadio name={`licenses.${index}.isCurrent`} /></Field>
                                    <Field label="Is this a commercial driver license?" required error={err?.isCommercial?.message}><YesNoRadio name={`licenses.${index}.isCommercial`} /></Field>
                                </div>
                                <div>
                                    <label className="label mb-2">Endorsements</label>
                                    <div className="flex flex-wrap gap-4">
                                        {ENDORSEMENTS.map(e => (
                                            <label key={e} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" value={e} className="accent-orange-500 w-4 h-4" {...register(`licenses.${index}.endorsements` as const)} />
                                                <span className="text-[var(--color-muted)] text-sm">{e}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => appendLicense({ licenseNumber: '', country: 'United States', state: '', expirationDate: '', dotMedicalCardExpiration: '', isCurrent: 'no', isCommercial: 'no', endorsements: [] })} className="text-sm btn-secondary">
                        [+] Add Another License
                    </button>
                    {errors.licenses?.root?.message && <p className="error-text">{errors.licenses?.root?.message}</p>}
                </div>
            </div>

            {/* ── Step 5: Driving Experience & Employment History ──────────── */}
            <div className={step === 5 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 5: Driving Experience & Employment History" />
                <p className="text-sm text-[var(--color-muted)] mb-6 border-b border-[var(--color-border)] pb-6">
                    For each class of equipment, select years of experience. If none, select "None".
                </p>
                <div className="space-y-4 max-w-2xl mb-10 border-b border-[var(--color-border)] pb-8">
                    <Field label="Straight Truck" required error={errors.expStraightTruck?.message}><select className="input-field appearance-none" {...register('expStraightTruck')}><option value="" className="bg-[var(--color-surface)]">Select...</option>{EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-[var(--color-surface)]">{o}</option>)}</select></Field>
                    <Field label="Tractor and Semi-Trailer" required error={errors.expTractorSemi?.message}><select className="input-field appearance-none" {...register('expTractorSemi')}><option value="" className="bg-[var(--color-surface)]">Select...</option>{EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-[var(--color-surface)]">{o}</option>)}</select></Field>
                    <Field label="Tractor - Two Trailers" required error={errors.expTractorTwoTrailers?.message}><select className="input-field appearance-none" {...register('expTractorTwoTrailers')}><option value="" className="bg-[var(--color-surface)]">Select...</option>{EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-[var(--color-surface)]">{o}</option>)}</select></Field>
                    <Field label="Other Experience" required error={errors.expOther?.message}><textarea className="input-field min-h-[80px]" placeholder="List any other driving experience, or 'None'..." {...register('expOther')} /></Field>
                </div>

                <div className="space-y-6">
                    <h3 className="font-semibold text-[var(--color-text)] text-base mb-2">Employment History</h3>
                    {employedLast10Years === 'yes' ? (
                        <>
                            {employFields.length === 0 && <p className="text-sm text-orange-400">Please provide your employment history.</p>}
                            {employFields.map((field, index) => {
                                const err = errors.employmentHistory?.[index];
                                return (
                                    <div key={field.id} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[var(--color-text)] font-medium text-sm">Employer #{index + 1}</h4>
                                            <button type="button" onClick={() => removeEmploy(index)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Field label="Employer / Company Name" required error={err?.employerName?.message}><input className="input-field" placeholder="ABC Trucking" {...register(`employmentHistory.${index}.employerName` as const)} /></Field>
                                            <Field label="Position Title" error={err?.positionTitle?.message}><input className="input-field" placeholder="Driver" {...register(`employmentHistory.${index}.positionTitle` as const)} /></Field>
                                            <Field label="Start Date" required error={err?.startDate?.message}><input type="month" className="input-field" {...register(`employmentHistory.${index}.startDate` as const)} /></Field>
                                            <Field label="End Date (Leave blank if Current)" required error={err?.endDate?.message}><input type="month" className="input-field" {...register(`employmentHistory.${index}.endDate` as const)} /></Field>
                                        </div>
                                    </div>
                                );
                            })}
                            <button type="button" onClick={() => appendEmploy({ employerName: '', positionTitle: '', startDate: '', endDate: '' })} className="text-sm btn-secondary">
                                [+] Add History Item
                            </button>
                        </>
                    ) : (
                        <p className="text-sm text-[var(--color-muted)] italic">You indicated you have not been employed or contracted in the past 10 years.</p>
                    )}
                </div>
            </div>

            {/* ── Step 6: Resume & Submit ──────────────────────────────────── */}
            <div className={step === 6 ? 'block' : 'hidden'}>
                <SectionHeader title="Step 6: Resume & Submit" />
                <div className="space-y-4">
                    <div>
                        <label className="label">Resume / CV <span className="text-orange-400">*</span><span className="text-[var(--color-muted)] font-normal ml-1">(PDF only, max 5 MB)</span></label>
                        <div className={`w-full rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer ${resumeError ? 'border-red-500/50 bg-red-500/5' : resumeFile ? 'border-orange-500/50 bg-orange-500/5' : 'border-[var(--color-border)] hover:border-orange-500/50 bg-[var(--color-surface)]'}`} onClick={() => fileInputRef.current?.click()}>
                            <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <div className="p-6 text-center flex flex-col items-center justify-center">
                                {resumeFile ? (
                                    <>
                                        <FileText className="w-10 h-10 text-[var(--color-text)] mb-2" />
                                        <p className="text-orange-400 font-medium text-sm">{resumeFile.name}</p>
                                        <p className="text-[var(--color-muted)] text-xs mt-1">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB — Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <Paperclip className="w-10 h-10 text-[var(--color-text)] mb-2" />
                                        <p className="text-[var(--color-muted)] text-sm"><span className="text-orange-400 font-medium">Click to upload</span> your resume</p>
                                        <p className="text-[var(--color-muted)] text-xs mt-1">PDF files only, up to 5 MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                        {resumeError && <p className="error-text">{resumeError}</p>}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex gap-4 pt-4 mt-6 border-t border-[var(--color-border)]">
                {step > 1 && (
                    <button type="button" onClick={handleBack} className="btn-secondary w-full py-3">← Back</button>
                )}

                {step < 6 ? (
                    <button type="button" onClick={handleNext} className="btn-primary w-full py-3">Next Step →</button>
                ) : (
                    <button type="submit" disabled={status === 'submitting'} className="btn-primary flex items-center justify-center gap-2 w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                        {status === 'submitting' ? 'Submitting…' : <>Submit Application <CheckCircle className="w-5 h-5" /></>}
                    </button>
                )}
            </div>
        </form>
    );
}
