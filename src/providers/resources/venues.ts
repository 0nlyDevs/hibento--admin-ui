import type {
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type {
  CreateVenue,
  UpdateVenue,
} from "../../lib/admin-client/types.gen";
import { publicApi, adminApi } from "../api";

export const venuesResource = {
  getList: async ({ filter }: GetListParams) => {
    const { data } = await publicApi.getVenues();
    const items = data.data;
    const q = (filter?.q as string)?.toLowerCase();
    const filtered = q
      ? items.filter(
          (v) =>
            v.name?.toLowerCase().includes(q) ||
            v.city?.toLowerCase().includes(q) ||
            v.neighborhood?.toLowerCase().includes(q),
        )
      : items;
    return { data: filtered, total: filtered.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getVenuesByVenueId({
      path: { venueId: String(id) },
    });
    return { data };
  },

  create: async ({ data: body }: CreateParams) => {
    const { data } = await adminApi.createVenue({ body: body as CreateVenue });
    return { data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const { data } = await adminApi.updateVenue({
      path: { venueId: String(id) },
      body: body as UpdateVenue,
    });
    return { data };
  },

  delete: async ({ id }: DeleteParams) => {
    await adminApi.deleteVenue({ path: { venueId: String(id) } });
    return { data: { id } as Record<string, string> };
  },
};
