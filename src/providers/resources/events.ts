import type {
  GetListParams,
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

export const eventsResource = {
  getList: async ({ pagination }: GetListParams) => {
    const { data } = await publicApi.getEvents({
      query: { page: pagination.page, limit: pagination.perPage },
    });
    return { data: data.data, total: data.pagination.total };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getEventsByEventId({
      path: { eventId: String(id) },
    });
    return { data };
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
