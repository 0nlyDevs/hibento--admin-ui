import type {
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type {
  CreateSession,
  UpdateSession,
} from "../../lib/admin-client/types.gen";
import { publicApi, adminApi } from "../api";

export const sessionsResource = {
  getList: async ({ filter }: GetListParams) => {
    const eventId = (filter as Record<string, string>)?.eventId;
    const { data } = await publicApi.getEventsByEventIdEventSessions({
      path: { eventId },
    });
    return { data: data.data, total: data.data.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getEventSessionsBySessionId({
      path: { sessionId: String(id) },
    });
    return { data };
  },

  create: async ({ data: body }: CreateParams) => {
    const bodyRecord = body as Record<string, unknown>;
    const { eventId, ...rest } = bodyRecord;
    const { data } = await adminApi.createSession({
      path: { eventId: String(eventId) },
      body: rest as CreateSession,
    });
    return { data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const { data } = await adminApi.updateSession({
      path: { sessionId: String(id) },
      body: body as UpdateSession,
    });
    return { data };
  },

  delete: async ({ id }: DeleteParams) => {
    await adminApi.deleteSession({ path: { sessionId: String(id) } });
    return { data: { id } as Record<string, string> };
  },
};
