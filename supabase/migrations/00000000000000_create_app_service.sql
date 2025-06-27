-- helper role for authenticated Edge Functions
create role app_service noinherit nologin;
grant app_service to authenticator; 