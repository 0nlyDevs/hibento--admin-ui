import type {
  GetListParams,
  GetManyReferenceParams,
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

const API_BASE = import.meta.env.VITE_PUBLIC_API_URL;

function normalizeSession(raw: Record<string, unknown>) {
  return {
    ...raw,
    roomId: (raw.room as Record<string, unknown>)?.id ?? raw.roomId,
    roomName: (raw.room as Record<string, unknown>)?.name ?? raw.roomName,
    speakerIds: (raw.speakers as Array<Record<string, unknown>>)?.map((s) => s.id) ?? raw.speakerIds,
    venueId: (raw.venue as Record<string, unknown>)?.id ?? raw.venueId,
  };
}

export const sessionsResource = {
  getList: async ({ pagination, filter }: GetListParams) => {
    const eventId = (filter as Record<string, string>)?.eventId;
    const q = (filter as Record<string, string>)?.q;
    const roomId = (filter as Record<string, string>)?.roomId;
    if (eventId) {
      const { data } = await publicApi.getEventsByEventIdEventSessions({
        path: { eventId },
        query: q ? { q } as any : undefined,
      } as any);
      return { data: data.data.map(normalizeSession), total: data.data.length };
    }
    const params = new URLSearchParams();
    if (pagination) {
      params.set("page", String(pagination.page));
      params.set("limit", String(pagination.perPage));
    }
    if (q) params.set("q", q);
    if (roomId) params.set("roomId", roomId);
    const res = await fetch(`${API_BASE}/event-sessions?${params}`);
    const body = await res.json();
    return { data: (body.data ?? []).map(normalizeSession), total: body.pagination?.total ?? 0 };
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "roomId") {
      const params = new URLSearchParams();
      params.set("roomId", String(id));
      params.set("limit", "100");
      const res = await fetch(`${API_BASE}/event-sessions?${params}`);
      const body = await res.json();
      return { data: (body.data ?? []).map(normalizeSession), total: body.pagination?.total ?? 0 };
    }
    return { data: [], total: 0 };
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
