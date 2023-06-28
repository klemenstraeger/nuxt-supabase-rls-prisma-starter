import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        const user = await serverSupabaseUser(event);
        event.context.user = user;
    }
});