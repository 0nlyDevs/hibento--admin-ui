import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
} from "react-admin";
import { publicApi } from "../api";

const API_BASE = import.meta.env.VITE_PUBLIC_API_URL;

export const questionsResource = {
  getList: async ({ filter }: GetListParams) => {
    const eventSessionId = (filter as Record<string, string>)?.eventSessionId;
    if (!eventSessionId) return { data: [], total: 0 };
    const { data } = await publicApi.getEventSessionsBySessionIdQuestions({
      path: { sessionId: eventSessionId },
    });
    const items = (data.data ?? []).map((q) => ({ ...q, eventSessionId } as Record<string, unknown>));
    return { data: items, total: items.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const res = await fetch(`${API_BASE}/questions/${id}`);
    if (!res.ok) throw new Error("Question not found");
    const body = await res.json();
    return { data: body.data as never };
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "eventSessionId") {
      const { data } = await publicApi.getEventSessionsBySessionIdQuestions({
        path: { sessionId: String(id) },
      });
      const items = (data.data ?? []).map((q) => ({ ...q, eventSessionId: id } as Record<string, unknown>));
      return { data: items as never[], total: items.length };
    }
    return { data: [], total: 0 };
  },
};
