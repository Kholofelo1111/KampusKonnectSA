// ============================================================
// Centralized API client — reusable service layer
// All frontend data fetching goes through here.
// Ready for future AI integrations (streaming, retries, auth).
// ============================================================

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;

  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error || `Request failed (${res.status})`,
      res.status
    );
  }

  return data as T;
}

// ---- Typed service methods ----
export const api = {
  // Institutions
  institutions: {
    list: (params?: { category?: string; province?: string; q?: string }) => {
      const qs = new URLSearchParams(
        Object.entries(params || {}).filter(([, v]) => v) as [string, string][]
      );
      return request<{ total: number; institutions: unknown[] }>(
        `/api/institutions${qs.toString() ? `?${qs}` : ""}`
      );
    },
  },

  // Opportunities feed
  opportunities: {
    list: (params?: { type?: string; province?: string; q?: string; sort?: string }) => {
      const qs = new URLSearchParams(
        Object.entries(params || {}).filter(([, v]) => v) as [string, string][]
      );
      return request<{ total: number; opportunities: unknown[] }>(
        `/api/opportunities${qs.toString() ? `?${qs}` : ""}`
      );
    },
  },

  // Qualification engine
  qualify: {
    check: (body: {
      aps: number;
      subjects: string[];
      subjectMarks?: Record<string, number>;
      field?: string;
      province?: string;
      institutionType?: string;
    }) => request("/api/qualify", { method: "POST", body }),

    checkInstitution: (body: {
      institutionId: string;
      aps: number;
      subjects: string[];
      subjectMarks?: Record<string, number>;
    }) => request("/api/qualify-institution", { method: "POST", body }),
  },

  // Applications tracker
  applications: {
    list: () => request<{ applications: unknown[] }>("/api/applications"),
    create: (body: unknown) => request("/api/applications", { method: "POST", body }),
    updateStatus: (id: string, status: string) =>
      request("/api/applications", { method: "PATCH", body: { id, status } }),
    remove: (id: string) =>
      request(`/api/applications?id=${id}`, { method: "DELETE" }),
  },

  // Bookmarks
  bookmarks: {
    list: () => request<{ bookmarks: unknown[] }>("/api/bookmarks"),
    toggle: (body: unknown) => request("/api/bookmarks", { method: "POST", body }),
  },

  // Notifications
  notifications: {
    list: () => request<{ notifications: unknown[] }>("/api/notifications"),
    markRead: (id?: string) =>
      request("/api/notifications", {
        method: "PATCH",
        body: id ? { id } : { markAll: true },
      }),
  },

  // AI assistant — ready for streaming upgrades
  ai: {
    ask: (query: string) =>
      request<{ text: string; sections?: unknown[]; followUps?: string[] }>(
        "/api/ai",
        { method: "POST", body: { query } }
      ),
  },

  // Auth
  auth: {
    signup: (body: { name: string; email: string; password: string }) =>
      request("/api/signup", { method: "POST", body }),
  },
};
