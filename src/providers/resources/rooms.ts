import type {
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type { CreateRoom, UpdateRoom } from "../../lib/admin-client/types.gen";
import { publicApi, adminApi } from "../api";

const API_BASE = import.meta.env.VITE_PUBLIC_API_URL;

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
    const params = new URLSearchParams();
    if (pagination) {
      params.set("page", String(pagination.page));
      params.set("limit", String(pagination.perPage));
    }
    if (q) params.set("q", q);
    if (venueId) params.set("venueId", venueId);
    const res = await fetch(`${API_BASE}/rooms?${params}`);
    const body = await res.json();
    return { data: body.data ?? [], total: body.pagination?.total ?? 0 };
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
    const res = await fetch(`${API_BASE}/rooms/${id}`);
    if (!res.ok) throw new Error("Room not found");
    const data = await res.json();
    return { data };
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
