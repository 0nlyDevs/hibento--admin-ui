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
import { publicApi, adminApi, handleSdkError } from "../api";

function normalizeSpeaker(s: Record<string, unknown>) {
  const externalLinks = (s.externalLinks as Array<Record<string, unknown>> | undefined)?.map(
    (link: Record<string, unknown>) => ({
      ...link,
      type: typeof link.type === "string" ? link.type.toLowerCase() : link.type,
    }),
  );
  return { ...s, avatarUrl: s.avatar, externalLinks };
}

export const speakersResource = {
  getList: async ({ pagination, filter }: GetListParams) => {
    const q = (filter as Record<string, string>)?.q;
    const { data } = await publicApi.getSpeakers({
      query: {
        page: pagination.page,
        limit: pagination.perPage,
        ...(q ? { q } : {}),
      } as any,
    });
    const items = data.data.map(normalizeSpeaker);
    return { data: items, total: data.pagination.total };
  },

  getOne: async ({ id }: GetOneParams) => {
    const { data } = await publicApi.getSpeakersBySpeakerId({
      path: { speakerId: String(id) },
    });
    return { data: normalizeSpeaker(data as any) };
  },

  create: async ({ data: body }: CreateParams) => {
    const res = await adminApi.createSpeaker({
      body: body as CreateSpeaker,
    }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  update: async ({ id, data: body }: UpdateParams) => {
    const raw = body as Record<string, unknown>;
    const res = await adminApi.updateSpeaker({
      path: { speakerId: String(id) },
      body: {
        name: raw.name,
        avatarUrl: raw.avatarUrl,
        bio: raw.bio,
        externalLinks: raw.externalLinks,
      } as UpdateSpeaker,
    }) as any;
    handleSdkError(res);
    return { data: res.data };
  },

  delete: async ({ id }: DeleteParams) => {
    const res = await adminApi.deleteSpeaker({ path: { speakerId: String(id) } }) as any;
    handleSdkError(res);
    return { data: { id } as Record<string, string> };
  },
};
