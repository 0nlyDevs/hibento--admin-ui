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
import { publicApi, adminApi, handleSdkError } from "../api";

export const venuesResource = {
  getList: async ({ pagination, filter }: GetListParams) => {
    const q = (filter as Record<string, string>)?.q;
    const { data } = await publicApi.getVenues({
      query: {
        ...(pagination ? { page: pagination.page, limit: pagination.perPage } : {}),
        ...(q ? { q } : {}),
      } as any,
    });
    return { data: data.data, total: (data as any).pagination?.total ?? data.data.length };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getVenuesByVenueId({
      path: { venueId: String(id) },
    });
    return { data };
  },

  create: async ({ data: body }: CreateParams) => {
    const res = await adminApi.createVenue({ body: body as CreateVenue }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const res = await adminApi.updateVenue({
      path: { venueId: String(id) },
      body: body as UpdateVenue,
    }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  delete: async ({ id }: DeleteParams) => {
    const res = await adminApi.deleteVenue({ path: { venueId: String(id) } }) as any;
    handleSdkError(res);
    return { data: { id } as Record<string, string> };
  },
};
