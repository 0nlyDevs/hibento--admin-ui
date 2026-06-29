import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type {
  CreateEvent,
  UpdateEvent,
} from "../../lib/admin-client/types.gen";
import { publicApi, adminApi, handleSdkError } from "../api";

function normalizeEvent(e: Record<string, unknown>) {
  return {
    ...e,
    venueId: e.venue ? (e.venue as Record<string, unknown>)?.id ?? null : null,
    online: e.isOnline ?? e.online,
  };
}

export const eventsResource = {
  getList: async ({ pagination, filter }: GetListParams) => {
    const q = (filter as Record<string, string>)?.q;
    const { data } = await publicApi.getEvents({
      query: {
        page: pagination.page,
        limit: pagination.perPage,
        ...(q ? { q } : {}),
      } as any,
    });
    return { data: data.data.map(normalizeEvent), total: data.pagination.total };
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "venueId") {
      const { data } = await publicApi.getEvents({
        query: { limit: 1000 },
      });
      const filtered = (data.data ?? []).filter(
        (event: any) => event.venueId === id,
      );
      return { data: filtered, total: filtered.length };
    }
    return { data: [], total: 0 };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getEventsByEventId({
      path: { eventId: String(id) },
    });
    return { data: normalizeEvent(data as any) };
  },

  create: async ({ data: body }: CreateParams) => {
    const res = await adminApi.createEvent({ body: body as CreateEvent }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const raw = body as Record<string, unknown>;
    const res = await adminApi.updateEvent({
      path: { eventId: String(id) },
      body: {
        title: raw.title,
        description: raw.description,
        online: raw.online,
        startDate: raw.startDate,
        endDate: raw.endDate,
        venueId: raw.venueId,
      } as UpdateEvent,
    }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  delete: async ({ id }: DeleteParams) => {
    const res = await adminApi.deleteEvent({ path: { eventId: String(id) } }) as any;
    handleSdkError(res);
    return { data: { id } as Record<string, string> };
  },
};
