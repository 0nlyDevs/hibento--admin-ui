import type {
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "react-admin";
import type {
  CreateSpeaker,
  UpdateSpeaker,
} from "../../lib/admin-client/types.gen";
import { publicApi, adminApi } from "../api";

function normalizeSpeaker(s: Record<string, unknown>) {
  return { ...s, avatarUrl: s.avatar };
}

export const speakersResource = {
  getList: async ({ pagination }: GetListParams) => {
    const { data } = await publicApi.getSpeakers({
      query: { page: pagination.page, limit: pagination.perPage },
    });
    const items = data.data.map(normalizeSpeaker);
    return { data: items, total: data.pagination.total };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getSpeakersBySpeakerId({
      path: { speakerId: String(id) },
    });
    return { data: normalizeSpeaker(data as unknown as Record<string, unknown>) as never };
  },

  create: async ({ data: body }: CreateParams) => {
    const { data } = await adminApi.createSpeaker({
      body: body as CreateSpeaker,
    });
    return { data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const { data } = await adminApi.updateSpeaker({
      path: { speakerId: String(id) },
      body: body as UpdateSpeaker,
    });
    return { data };
  },

  delete: async ({ id }: DeleteParams) => {
    await adminApi.deleteSpeaker({ path: { speakerId: String(id) } });
    return { data: { id } as Record<string, string> };
  },
};
