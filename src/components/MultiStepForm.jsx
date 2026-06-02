import { useState } from 'react';

const BRAND = '#0067FF';

const STEPS = [
	{ id: 1, title: 'About you', hint: 'Add your name and work email to continue.' },
	{ id: 2, title: 'Your goals', hint: 'Select at least one area that matches your project.' },
	{ id: 3, title: 'Project details', hint: 'Choose a timeline and tell us what you want to build.' },
];

const SERVICE_GOALS = [
	{
		id: 'product-engineering',
		label: 'Product & apps',
		fullLabel: 'Custom Product Engineering & Modernization',
		description: 'MVPs, React/Next.js apps, and legacy modernization.',
	},
	{
		id: 'applied-ai',
		label: 'AI & ML',
		fullLabel: 'Applied AI & Machine Learning',
		description: 'LLM integrations, RAG, and predictive analytics.',
	},
	{
		id: 'workflow-automation',
		label: 'Automation & portals',
		fullLabel: 'Workflow Automation & Custom Portals',
		description: 'Dashboards, ETL, PWAs, and internal tooling.',
	},
	{
		id: 'cloud-architecture',
		label: 'Cloud & DevOps',
		fullLabel: 'Cloud Architecture & DevOps Consulting',
		description: 'AWS serverless, CI/CD, security, and observability.',
	},
];

const TIMELINES = ['ASAP (under 4 weeks)', '1–3 months', '3–6 months', '6+ months', 'Exploring options'];

const BUDGETS = ['Under $25k', '$25k–$75k', '$75k–$150k', '$150k+', 'Not sure yet'];

const inputClass =
	'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#0067FF] focus:ring-2 focus:ring-[#0067FF]/30 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-[#0067FF]/40';

const labelClass = 'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200';

function buildMailto({ contactEmail, form }) {
	const goals = form.goals
		.map((id) => SERVICE_GOALS.find((g) => g.id === id)?.fullLabel)
		.filter(Boolean)
		.join(', ');

	const lines = [
		`Name: ${form.name}`,
		`Email: ${form.email}`,
		`Company: ${form.company.trim() || '—'}`,
		'',
		`Services: ${goals}`,
		`Timeline: ${form.timeline}`,
		`Budget: ${form.budget || 'Not specified'}`,
		'',
		'Project overview:',
		form.message.trim(),
	];

	return `mailto:${contactEmail}?subject=${encodeURIComponent(`Project inquiry from ${form.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export default function MultiStepForm({ contactEmail = 'hello@whiteraven.app' }) {
	const [step, setStep] = useState(1);
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({
		name: '',
		email: '',
		company: '',
		goals: [],
		timeline: '',
		budget: '',
		message: '',
	});

	const totalSteps = STEPS.length;
	const currentStep = STEPS[step - 1];
	const progress = (step / totalSteps) * 100;

	const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

	const toggleGoal = (id) => {
		setForm((prev) => ({
			...prev,
			goals: prev.goals.includes(id) ? prev.goals.filter((g) => g !== id) : [...prev.goals, id],
		}));
	};

	const canProceed = () => {
		if (step === 1) return form.name.trim() && form.email.trim() && /\S+@\S+\.\S+/.test(form.email);
		if (step === 2) return form.goals.length > 0;
		if (step === 3) return form.timeline && form.message.trim();
		return false;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!canProceed()) return;
		window.location.href = buildMailto({ contactEmail, form });
		setSubmitted(true);
	};

	const goNext = () => {
		if (canProceed()) setStep((s) => Math.min(s + 1, totalSteps));
	};

	return (
		<div className="w-full">
			{!submitted ? (
				<>
					<div className="mb-8">
						<div className="mb-3 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-400">
							<span>
								Step {step} of {totalSteps} · {currentStep.title}
							</span>
							<span className="text-[#0067FF]">{Math.round(progress)}%</span>
						</div>
						<div
							className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
							role="presentation"
						>
							<div
								className="h-full rounded-full transition-all duration-500 ease-out"
								style={{ width: `${progress}%`, backgroundColor: BRAND }}
								role="progressbar"
								aria-valuenow={Math.round(progress)}
								aria-valuemin={0}
								aria-valuemax={100}
								aria-label={`Form progress, step ${step} of ${totalSteps}`}
							/>
						</div>
						<nav className="mt-4 flex gap-2" aria-label="Form steps">
							{STEPS.map((s) => (
								<div
									key={s.id}
									className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
										s.id <= step ? '' : 'bg-slate-200 dark:bg-white/10'
									}`}
									style={s.id <= step ? { backgroundColor: BRAND } : undefined}
									aria-hidden="true"
								/>
							))}
						</nav>
					</div>

					<form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} noValidate>
						<div aria-live="polite" aria-atomic="true">
							{step === 1 && (
								<div className="space-y-5">
									<div>
										<h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900 dark:text-white">
											{currentStep.title}
										</h2>
										<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
											We&apos;ll only use this to respond to your inquiry.
										</p>
									</div>
									<div>
										<label htmlFor="name" className={labelClass}>
											Full name <span className="text-[#0067FF]">*</span>
										</label>
										<input
											id="name"
											type="text"
											required
											autoComplete="name"
											className={inputClass}
											value={form.name}
											onChange={(e) => update('name', e.target.value)}
											placeholder="Jane Smith"
										/>
									</div>
									<div>
										<label htmlFor="email" className={labelClass}>
											Work email <span className="text-[#0067FF]">*</span>
										</label>
										<input
											id="email"
											type="email"
											required
											autoComplete="email"
											inputMode="email"
											className={inputClass}
											value={form.email}
											onChange={(e) => update('email', e.target.value)}
											placeholder="you@company.com"
										/>
									</div>
									<div>
										<label htmlFor="company" className={labelClass}>
											Company <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span>
										</label>
										<input
											id="company"
											type="text"
											autoComplete="organization"
											className={inputClass}
											value={form.company}
											onChange={(e) => update('company', e.target.value)}
											placeholder="Acme Inc."
										/>
									</div>
								</div>
							)}

							{step === 2 && (
								<div className="space-y-5">
									<div>
										<h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900 dark:text-white">
											{currentStep.title}
										</h2>
										<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
											Choose everything that applies—you can pick more than one.
										</p>
									</div>
									<div className="grid gap-3 sm:grid-cols-2">
										{SERVICE_GOALS.map((goal) => {
											const selected = form.goals.includes(goal.id);
											return (
												<button
													key={goal.id}
													type="button"
													onClick={() => toggleGoal(goal.id)}
													className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067FF] dark:border-white/10 dark:bg-white/[0.03]"
													style={{
														borderColor: selected ? BRAND : undefined,
														backgroundColor: selected ? 'rgba(0, 103, 255, 0.08)' : undefined,
													}}
													aria-pressed={selected}
												>
													<span className="flex items-start gap-3">
														<span
															className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
																selected ? '' : 'border-slate-300 dark:border-white/25'
															}`}
															style={
																selected
																	? {
																			borderColor: BRAND,
																			backgroundColor: BRAND,
																			color: '#fff',
																		}
																	: undefined
															}
															aria-hidden="true"
														>
															{selected ? '✓' : ''}
														</span>
														<span>
															<span className="block text-sm font-semibold text-slate-900 dark:text-white">
																{goal.label}
															</span>
															<span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-slate-300">
																{goal.description}
															</span>
														</span>
													</span>
												</button>
											);
										})}
									</div>
								</div>
							)}

							{step === 3 && (
								<div className="space-y-5">
									<div>
										<h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900 dark:text-white">
											{currentStep.title}
										</h2>
										<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
											A few sentences is enough—we&apos;ll ask follow-ups on our call.
										</p>
									</div>
									<div>
										<label htmlFor="timeline" className={labelClass}>
											When do you want to start? <span className="text-[#0067FF]">*</span>
										</label>
										<select
											id="timeline"
											required
											className={inputClass}
											value={form.timeline}
											onChange={(e) => update('timeline', e.target.value)}
										>
											<option value="" disabled>
												Select a timeline
											</option>
											{TIMELINES.map((t) => (
												<option key={t} value={t}>
													{t}
												</option>
											))}
										</select>
									</div>
									<div>
										<label htmlFor="budget" className={labelClass}>
											Budget range{' '}
											<span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span>
										</label>
										<select
											id="budget"
											className={inputClass}
											value={form.budget}
											onChange={(e) => update('budget', e.target.value)}
										>
											<option value="">I&apos;m not sure yet</option>
											{BUDGETS.map((b) => (
												<option key={b} value={b}>
													{b}
												</option>
											))}
										</select>
									</div>
									<div>
										<label htmlFor="message" className={labelClass}>
											What are you building? <span className="text-[#0067FF]">*</span>
										</label>
										<textarea
											id="message"
											required
											rows={5}
											className={`${inputClass} resize-y min-h-[120px]`}
											value={form.message}
											onChange={(e) => update('message', e.target.value)}
											placeholder="Example: We need a customer portal that connects to our ERP and shows order status in real time..."
										/>
									</div>
								</div>
							)}
						</div>

						{!canProceed() && (
							<p className="mt-6 text-sm text-slate-600 dark:text-slate-400" role="status">
								{currentStep.hint}
							</p>
						)}

						<div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
							{step > 1 ? (
								<button
									type="button"
									onClick={() => setStep((s) => s - 1)}
									className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067FF] dark:border-white/15 dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
								>
									Back
								</button>
							) : (
								<p className="text-center text-xs text-slate-500 sm:text-left dark:text-slate-400">
									Submitting opens your email app with your answers filled in.
								</p>
							)}
							{step < 3 ? (
								<button
									type="button"
									disabled={!canProceed()}
									onClick={goNext}
									className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067FF]"
									style={{
										backgroundColor: BRAND,
									}}
								>
									Continue
								</button>
							) : (
								<button
									type="submit"
									disabled={!canProceed()}
									className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067FF]"
									style={{
										backgroundColor: BRAND,
									}}
								>
									Send via email
								</button>
							)}
						</div>
					</form>
				</>
			) : (
				<div className="py-6 text-center sm:py-8" role="status">
					<div
						className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
						style={{ backgroundColor: 'rgba(0, 103, 255, 0.12)', color: BRAND }}
					>
						<svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
					<h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900 dark:text-white">
						Almost done—check your email app
					</h2>
					<p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
						We opened a draft to{' '}
						<a href={`mailto:${contactEmail}`} className="font-medium text-[#0067FF] hover:underline dark:text-[#3d8fff]">
							{contactEmail}
						</a>
						. Hit send there and we&apos;ll reply within one business day.
					</p>
					<p className="mx-auto mt-4 max-w-md text-xs text-slate-500 dark:text-slate-400">
						Didn&apos;t see a draft?{' '}
						<a
							href={buildMailto({ contactEmail, form })}
							className="font-medium text-[#0067FF] hover:underline dark:text-[#3d8fff]"
						>
							Open the email again
						</a>
						{' '}
						or copy {contactEmail}.
					</p>
					<a
						href="/"
						className="mt-8 inline-flex text-sm font-medium text-slate-600 transition-colors hover:text-[#0067FF] dark:text-slate-300 dark:hover:text-[#3d8fff]"
					>
						← Back to home
					</a>
				</div>
			)}
		</div>
	);
}
