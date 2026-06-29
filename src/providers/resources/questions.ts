import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
} from "react-admin";
import { publicApi } from "../api";

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
    const { data } = await publicApi.getQuestionsByQuestionId({
      path: { questionId: String(id) },
    });
    return { data: (data as any)?.data ?? data };
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "eventSessionId") {
      const { data } = await publicApi.getEventSessionsBySessionIdQuestions({
        path: { sessionId: String(id) },
      });
      const items = (data.data ?? []).map((q) => ({ ...q, eventSessionId: id } as Record<string, unknown>));
      return { data: items as any[], total: items.length };
    }
    return { data: [], total: 0 };
  },
};
