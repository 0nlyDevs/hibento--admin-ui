import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
} from "react-admin";
import { publicApi } from "../api";

const questionCache = new Map<string, Record<string, unknown>>();

export const questionsResource = {
  getList: async ({ filter }: GetListParams) => {
    const eventSessionId = (filter as Record<string, string>)?.eventSessionId;
    if (!eventSessionId) return { data: [], total: 0 };
    const { data } = await publicApi.getEventSessionsBySessionIdQuestions({
      path: { sessionId: eventSessionId },
    });
    const items = (data.data ?? []).map((q) => {
      const record = { ...q, eventSessionId } as Record<string, unknown>;
      questionCache.set(q.id as string, record);
      return record;
    });
    return { data: items, total: items.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const cached = questionCache.get(String(id));
    if (cached) return { data: cached as never };
    throw new Error("Question not found. Please navigate from a session view.");
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "eventSessionId") {
      const { data } = await publicApi.getEventSessionsBySessionIdQuestions({
        path: { sessionId: String(id) },
      });
      const items = (data.data ?? []).map((q) => {
        const record = { ...q, eventSessionId: id } as Record<string, unknown>;
        questionCache.set(q.id as string, record);
        return record;
      });
      return { data: items as never[], total: items.length };
    }
    return { data: [], total: 0 };
  },
};
