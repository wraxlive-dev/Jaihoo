import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: bigint;
}
export interface CaseStudy {
    metrics: Array<[string, string]>;
    clientName: string;
    description: string;
    industry: string;
}
export interface TeamMember {
    bio: string;
    name: string;
    role: string;
}
export interface Service {
    title: string;
    icon: string;
    description: string;
    category: string;
}
export interface PricingPlan {
    features: Array<string>;
    name: string;
    isFeatured: boolean;
    price: bigint;
}
export interface MembershipSubscription {
    status: string;
    name: string;
    plan: string;
    tier: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface FAQItem {
    question: string;
    answer: string;
}
export interface Testimonial {
    role: string;
    quote: string;
    author: string;
    company: string;
    rating: bigint;
}
export interface backendInterface {
    addCaseStudy(study: CaseStudy): Promise<bigint>;
    addFAQ(faq: FAQItem): Promise<bigint>;
    addPricingPlan(plan: PricingPlan): Promise<bigint>;
    addService(service: Service): Promise<bigint>;
    addTeamMember(member: TeamMember): Promise<bigint>;
    addTestimonial(testimonial: Testimonial): Promise<bigint>;
    deleteCaseStudy(id: bigint): Promise<void>;
    deleteFAQ(id: bigint): Promise<void>;
    deletePricingPlan(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteTeamMember(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getCaseStudies(): Promise<Array<CaseStudy>>;
    getFAQs(): Promise<Array<FAQItem>>;
    getMembershipByEmail(email: string): Promise<MembershipSubscription | null>;
    getMembershipSubscriptions(): Promise<Array<MembershipSubscription>>;
    getPricingPlans(): Promise<Array<PricingPlan>>;
    getServices(): Promise<Array<Service>>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    initialize(): Promise<void>;
    submitContactForm(form: ContactForm): Promise<bigint>;
    subscribeMembership(sub: MembershipSubscription): Promise<bigint>;
    updateCaseStudy(id: bigint, study: CaseStudy): Promise<void>;
    updateFAQ(id: bigint, faq: FAQItem): Promise<void>;
    updatePricingPlan(id: bigint, plan: PricingPlan): Promise<void>;
    updateService(id: bigint, service: Service): Promise<void>;
    updateTeamMember(id: bigint, member: TeamMember): Promise<void>;
    updateTestimonial(id: bigint, testimonial: Testimonial): Promise<void>;
}
