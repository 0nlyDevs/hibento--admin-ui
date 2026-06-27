import type {
  GetListParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type { CreateRoom, UpdateRoom } from "../../lib/admin-client/types.gen";
import { publicApi, adminApi } from "../api";

export const roomsResource = {
  getList: async ({ filter }: GetListParams) => {
    const eventId = (filter as Record<string, string>)?.eventId;
    if (!eventId) return { data: [], total: 0 };
    const { data } = await publicApi.getEventsByEventIdRooms({
      path: { eventId },
    });
    return { data: data.data, total: data.data.length };
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

  getOne: async () => {
    throw new Error("getOne not implemented for rooms");
  },

  create: async ({ data: body }: CreateParams) => {
    const { data } = await adminApi.createRoom({ body: body as CreateRoom });
    return { data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const { data } = await adminApi.updateRoom({
      path: { roomId: String(id) },
      body: body as UpdateRoom,
    });
    return { data };
  },

  delete: async ({ id }: DeleteParams) => {
    await adminApi.deleteRoom({ path: { roomId: String(id) } });
    return { data: { id } as Record<string, string> };
  },
};
