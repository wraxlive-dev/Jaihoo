import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Int "mo:core/Int";
import List "mo:core/List";
import Time "mo:core/Time";

actor {
  // Types
  type ContactForm = {
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    timestamp : Int;
  };

  type Service = {
    title : Text;
    description : Text;
    category : Text;
    icon : Text;
  };

  type PricingPlan = {
    name : Text;
    price : Int;
    features : [Text];
    isFeatured : Bool;
  };

  type CaseStudy = {
    clientName : Text;
    industry : Text;
    metrics : [(Text, Text)];
    description : Text;
  };

  type Testimonial = {
    author : Text;
    role : Text;
    company : Text;
    quote : Text;
    rating : Int;
  };

  type TeamMember = {
    name : Text;
    role : Text;
    bio : Text;
  };

  type FAQItem = {
    question : Text;
    answer : Text;
  };

  type MembershipSubscription = {
    name : Text;
    email : Text;
    phone : Text;
    plan : Text;   // "monthly" or "yearly"
    tier : Text;   // "Silver", "Gold", "Platinum"
    timestamp : Int;
    status : Text; // "pending", "active", "cancelled"
  };

  module ContactForm {
    public func compare(a : ContactForm, b : ContactForm) : Order.Order {
      Text.compare(a.email, b.email);
    };
  };

  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  module PricingPlan {
    public func compare(a : PricingPlan, b : PricingPlan) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module CaseStudy {
    public func compare(a : CaseStudy, b : CaseStudy) : Order.Order {
      Text.compare(a.clientName, b.clientName);
    };
  };

  module Testimonial {
    public func compare(a : Testimonial, b : Testimonial) : Order.Order {
      Text.compare(a.author, b.author);
    };
  };

  module TeamMember {
    public func compare(a : TeamMember, b : TeamMember) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module FAQItem {
    public func compare(a : FAQItem, b : FAQItem) : Order.Order {
      Text.compare(a.question, b.question);
    };
  };

  module MembershipSubscription {
    public func compare(a : MembershipSubscription, b : MembershipSubscription) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  // State
  var nextContactId = 0;
  var nextMembershipId = 0;
  let contacts = Map.empty<Int, ContactForm>();
  let services = Map.empty<Int, Service>();
  let pricingPlans = Map.empty<Int, PricingPlan>();
  let caseStudies = Map.empty<Int, CaseStudy>();
  let testimonials = Map.empty<Int, Testimonial>();
  let teamMembers = Map.empty<Int, TeamMember>();
  let faqs = Map.empty<Int, FAQItem>();
  let memberships = Map.empty<Int, MembershipSubscription>();

  // Membership methods
  public shared func subscribeMembership(sub : MembershipSubscription) : async Int {
    let id = nextMembershipId;
    nextMembershipId += 1;
    let newSub = { sub with timestamp = Time.now(); status = "pending" };
    memberships.add(id, newSub);
    id;
  };

  public query func getMembershipSubscriptions() : async [MembershipSubscription] {
    memberships.values().toArray().sort();
  };

  public query func getMembershipByEmail(email : Text) : async ?MembershipSubscription {
    for ((_, sub) in memberships.entries()) {
      if (sub.email == email) { return ?sub };
    };
    null;
  };

  // Public methods
  public shared ({ caller }) func submitContactForm(form : ContactForm) : async Int {
    let id = nextContactId;
    nextContactId += 1;
    let newForm = { form with timestamp = Time.now() };
    contacts.add(id, newForm);
    id;
  };

  public query func getServices() : async [Service] {
    services.values().toArray().sort().reverse();
  };

  public query func getPricingPlans() : async [PricingPlan] {
    pricingPlans.values().toArray().sort().reverse();
  };

  public query func getCaseStudies() : async [CaseStudy] {
    caseStudies.values().toArray().sort().reverse();
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort().reverse();
  };

  public query func getTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray().sort().reverse();
  };

  public query func getFAQs() : async [FAQItem] {
    faqs.values().toArray().sort();
  };

  // Admin methods
  public shared ({ caller }) func addService(service : Service) : async Int {
    let id = services.size();
    services.add(id, service);
    id;
  };

  public shared ({ caller }) func addPricingPlan(plan : PricingPlan) : async Int {
    let id = pricingPlans.size();
    pricingPlans.add(id, plan);
    id;
  };

  public shared ({ caller }) func addCaseStudy(study : CaseStudy) : async Int {
    let id = caseStudies.size();
    caseStudies.add(id, study);
    id;
  };

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async Int {
    let id = testimonials.size();
    testimonials.add(id, testimonial);
    id;
  };

  public shared ({ caller }) func addTeamMember(member : TeamMember) : async Int {
    let id = teamMembers.size();
    teamMembers.add(id, member);
    id;
  };

  public shared ({ caller }) func addFAQ(faq : FAQItem) : async Int {
    let id = faqs.size();
    faqs.add(id, faq);
    id;
  };

  public shared ({ caller }) func updateService(id : Int, service : Service) : async () {
    if (not services.containsKey(id)) { Runtime.trap("Service not found") };
    services.add(id, service);
  };

  public shared ({ caller }) func updatePricingPlan(id : Int, plan : PricingPlan) : async () {
    if (not pricingPlans.containsKey(id)) { Runtime.trap("Pricing plan not found") };
    pricingPlans.add(id, plan);
  };

  public shared ({ caller }) func updateCaseStudy(id : Int, study : CaseStudy) : async () {
    if (not caseStudies.containsKey(id)) { Runtime.trap("Case study not found") };
    caseStudies.add(id, study);
  };

  public shared ({ caller }) func updateTestimonial(id : Int, testimonial : Testimonial) : async () {
    if (not testimonials.containsKey(id)) { Runtime.trap("Testimonial not found") };
    testimonials.add(id, testimonial);
  };

  public shared ({ caller }) func updateTeamMember(id : Int, member : TeamMember) : async () {
    if (not teamMembers.containsKey(id)) { Runtime.trap("Team member not found") };
    teamMembers.add(id, member);
  };

  public shared ({ caller }) func updateFAQ(id : Int, faq : FAQItem) : async () {
    if (not faqs.containsKey(id)) { Runtime.trap("FAQ not found") };
    faqs.add(id, faq);
  };

  public shared ({ caller }) func deleteService(id : Int) : async () {
    if (not services.containsKey(id)) { Runtime.trap("Service not found") };
    services.remove(id);
  };

  public shared ({ caller }) func deletePricingPlan(id : Int) : async () {
    if (not pricingPlans.containsKey(id)) { Runtime.trap("Pricing plan not found") };
    pricingPlans.remove(id);
  };

  public shared ({ caller }) func deleteCaseStudy(id : Int) : async () {
    if (not caseStudies.containsKey(id)) { Runtime.trap("Case study not found") };
    caseStudies.remove(id);
  };

  public shared ({ caller }) func deleteTestimonial(id : Int) : async () {
    if (not testimonials.containsKey(id)) { Runtime.trap("Testimonial not found") };
    testimonials.remove(id);
  };

  public shared ({ caller }) func deleteTeamMember(id : Int) : async () {
    if (not teamMembers.containsKey(id)) { Runtime.trap("Team member not found") };
    teamMembers.remove(id);
  };

  public shared ({ caller }) func deleteFAQ(id : Int) : async () {
    if (not faqs.containsKey(id)) { Runtime.trap("FAQ not found") };
    faqs.remove(id);
  };

  // Initialization
  public shared ({ caller }) func initialize() : async () {
    if (services.isEmpty()) {
      let sampleServices = [
        { title = "SEO Optimization"; description = "Improve your website's ranking on search engines"; category = "Digital Marketing"; icon = "seo" },
        { title = "Social Media Management"; description = "Manage your social media presence"; category = "Social Media"; icon = "social" },
      ];
      for (service in sampleServices.values()) {
        services.add(services.size(), service);
      };
    };
    if (pricingPlans.isEmpty()) {
      let samplePlans = [
        { name = "Basic"; price = 100; features = ["SEO", "Social Media"]; isFeatured = false },
        { name = "Premium"; price = 250; features = ["SEO", "Social Media", "Content Marketing"]; isFeatured = true },
      ];
      for (plan in samplePlans.values()) {
        pricingPlans.add(pricingPlans.size(), plan);
      };
    };
    if (caseStudies.isEmpty()) {
      let sampleCaseStudies = [
        { clientName = "Acme Corp"; industry = "E-commerce"; metrics = [("ROI", "+200%"), ("Traffic", "+300%")]; description = "Increased sales for Acme Corp" },
      ];
      for (study in sampleCaseStudies.values()) {
        caseStudies.add(caseStudies.size(), study);
      };
    };
    if (testimonials.isEmpty()) {
      let sampleTestimonials = [
        { author = "Jane Doe"; role = "CEO"; company = "Acme Corp"; quote = "Amazing results!"; rating = 5 },
      ];
      for (testimonial in sampleTestimonials.values()) {
        testimonials.add(testimonials.size(), testimonial);
      };
    };
    if (teamMembers.isEmpty()) {
      let sampleTeamMembers = [
        { name = "John Smith"; role = "CEO"; bio = "Founder and CEO of Digital Agency" },
      ];
      for (member in sampleTeamMembers.values()) {
        teamMembers.add(teamMembers.size(), member);
      };
    };
    if (faqs.isEmpty()) {
      let sampleFAQs = [
        { question = "What is digital marketing?"; answer = "Digital marketing is the promotion of products or services using digital channels." },
      ];
      for (faq in sampleFAQs.values()) {
        faqs.add(faqs.size(), faq);
      };
    };
  };
};
