import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ContactForm } from "../backend.d";

export function useInitialize() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["initialize"],
    queryFn: async () => {
      if (!actor) return null;
      await actor.initialize();
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePricingPlans() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pricingPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPricingPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCaseStudies() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCaseStudies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeamMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: Omit<ContactForm, "timestamp">) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContactForm({
        ...form,
        timestamp: BigInt(Date.now()),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactForms"] });
    },
  });
}
