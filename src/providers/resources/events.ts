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
import { publicApi, adminApi } from "../api";

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
        ...(q ? { search: q } : {}),
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
    return { data: normalizeEvent(data as unknown as Record<string, unknown>) as never };
  },

  create: async ({ data: body }: CreateParams) => {
    const { data } = await adminApi.createEvent({ body: body as CreateEvent });
    return { data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const { data } = await adminApi.updateEvent({
      path: { eventId: String(id) },
      body: body as UpdateEvent,
    });
    return { data };
  },

  delete: async ({ id }: DeleteParams) => {
    await adminApi.deleteEvent({ path: { eventId: String(id) } });
    return { data: { id } as Record<string, string> };
  },
};
