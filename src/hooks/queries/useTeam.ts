import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  { 
    id: 1, 
    name: "Babu", 
    role: "CEO & Founder", 
    bio: "Former VP of Engineering with 15+ years of enterprise software experience.", 
    image: "/babu.jpg", 
    displayOrder: 1 
  },
  { 
    id: 2, 
    name: "Mani", 
    role: "CTO & Co-Founder", 
    bio: "Architect of scalable cloud systems handling millions of daily transactions.", 
    image: "/mani.jpg", 
    displayOrder: 2 
  },
  { 
    id: 3, 
    name: "Dinesh", 
    role: "Lead Designer", 
    bio: "Award-winning UX designer obsessed with creating frictionless digital experiences.", 
    image: "/dinesh.jpg", 
    displayOrder: 3 
  },
  { 
    id: 4, 
    name: "Alice Johnson", 
    role: "Head of Engineering", 
    bio: "Open source contributor and AI enthusiast leading our machine learning initiatives.", 
    image: "/images/team/designer.png", 
    displayOrder: 4 
  }
];

export function getLocalTeam(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM_MEMBERS;
  const saved = localStorage.getItem("app_team_members");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_TEAM_MEMBERS;
    }
  }
  return DEFAULT_TEAM_MEMBERS;
}

export function saveLocalTeam(members: TeamMember[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("app_team_members", JSON.stringify(members));
  }
}

export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      try {
        const res = await apiFetch("/api/v1/team");
        if (res.ok) {
          const json = await res.json();
          const list = json.content || json;
          if (Array.isArray(list) && list.length > 0) {
            saveLocalTeam(list);
            return list;
          }
        }
      } catch (err) {
        console.warn("API team fetch failed, using local storage/defaults:", err);
      }
      return getLocalTeam();
    },
  });
}
