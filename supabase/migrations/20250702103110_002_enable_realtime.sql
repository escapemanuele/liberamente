-- 002_enable_realtime.sql
begin;

-- 1) Add the three tables to the default Realtime publication
alter publication supabase_realtime
  add table brain_dumps,
            ai_outputs,
            todos;

-- 2) Make sure the client role can SELECT (needed for Realtime RLS checks)
grant select on brain_dumps to authenticated;
grant select on ai_outputs  to authenticated;
grant select on todos       to authenticated;

-- 3) OPTIONAL: send old records on UPDATE/DELETE
-- alter table brain_dumps replica identity full;
-- alter table ai_outputs  replica identity full;
-- alter table todos       replica identity full;

commit;