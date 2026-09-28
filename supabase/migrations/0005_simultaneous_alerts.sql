-- 0005_simultaneous_alerts.sql
-- Permite el tipo de alerta 'simultaneous' para detectar accesos casi
-- simultáneos del mismo enlace desde IPs o navegadores distintos.
-- Sin RLS nueva: se mantiene el modelo existente (escrituras server-side
-- con service_role, denegado por defecto para anon/authenticated).

-- Se elimina la restricción anterior de tipo y se crea la nueva con los
-- tres valores permitidos: 'different_ip', 'same_ip_repeat' y 'simultaneous'.
alter table public.alerts drop constraint if exists alerts_type_check;
alter table public.alerts
  add constraint alerts_type_check
  check (type in ('different_ip', 'same_ip_repeat', 'simultaneous'));

-- Actualiza el comentario de la tabla para documentar el nuevo tipo.
comment on table public.alerts is
  'Banderas de visitas sospechosas (different_ip | same_ip_repeat | simultaneous). '
  'simultaneous = dos visitas del mismo enlace en 20 min con IP o user_agent distinto.';
