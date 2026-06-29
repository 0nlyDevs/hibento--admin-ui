import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type { CreateRoom, UpdateRoom } from "../../lib/admin-client/types.gen";
import { publicApi, adminApi, handleSdkError } from "../api";

export const roomsResource = {
  getList: async ({ pagination, filter }: GetListParams) => {
    const eventId = (filter as Record<string, string>)?.eventId;
    const q = (filter as Record<string, string>)?.q;
    if (eventId) {
      const { data } = await publicApi.getEventsByEventIdRooms({
        path: { eventId },
        query: q ? { q } as any : undefined,
      } as any);
      return { data: data.data, total: data.data.length };
    }
    const venueId = (filter as Record<string, string>)?.venueId;
    const { data } = await publicApi.getRooms({
      query: {
        page: pagination.page,
        limit: pagination.perPage,
        ...(q ? { q } : {}),
        ...(venueId ? { venueId } : {}),
      },
    } as any);
    return { data: data.data ?? [], total: data.pagination?.total ?? 0 };
  },

  getManyReference: async ({ target, id }: GetManyReferenceParams) => {
    if (target === "venueId") {
      const { data } = await publicApi.getVenuesByVenueId({
        path: { venueId: String(id) },
      });
      const rooms = (data as any).rooms ?? [];
      return { data: rooms, total: rooms.length };
    }
    return { data: [], total: 0 };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getRoomsByRoomId({
      path: { roomId: String(id) },
    });
    return { data };
  },

  create: async ({ data: body }: CreateParams) => {
    const res = await adminApi.createRoom({ body: body as CreateRoom }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const raw = body as Record<string, unknown>;
    const res = await adminApi.updateRoom({
      path: { roomId: String(id) },
      body: {
        name: raw.name,
        capacity: raw.capacity,
        venueId: raw.venueId,
      } as UpdateRoom,
    }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  delete: async ({ id }: DeleteParams) => {
    const res = await adminApi.deleteRoom({ path: { roomId: String(id) } }) as any;
    handleSdkError(res);
    return { data: { id } as Record<string, string> };
  },
};
