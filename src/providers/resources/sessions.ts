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

function normalizeSession(raw: Record<string, unknown>) {
  return {
    ...raw,
    roomId: (raw.room as Record<string, unknown>)?.id ?? raw.roomId,
    roomName: (raw.room as Record<string, unknown>)?.name ?? raw.roomName,
    speakerIds: (raw.speakers as Array<Record<string, unknown>>)?.map((s) => s.id) ?? raw.speakerIds,
  };
}

export const sessionsResource = {
  getList: async ({ filter }: GetListParams) => {
    const eventId = (filter as Record<string, string>)?.eventId;
    if (!eventId) return { data: [], total: 0 };
    const { data } = await publicApi.getEventsByEventIdEventSessions({
      path: { eventId },
    });
    return { data: data.data.map(normalizeSession), total: data.data.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getEventSessionsBySessionId({
      path: { sessionId: String(id) },
    });
    return { data: normalizeSession(data as unknown as Record<string, unknown>) as never };
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
