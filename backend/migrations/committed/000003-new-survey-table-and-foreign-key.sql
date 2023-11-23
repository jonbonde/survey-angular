--! Previous: sha1:17767b0f300f4b3861c298df21b2bcd0bc7d8425
--! Hash: sha1:0e570f3a911531cf86269b85b0f510a232d4d089
--! Message: new survey table and foreign key

-- Enter migration here
create table if not exists survey (
    id serial primary key,
    survey_name text
);

alter table questions 
add column if not exists survey_id int;

alter table questions
drop constraint if exists fk_questions_survey;

alter table questions 
add constraint fk_questions_survey foreign key (survey_id) references survey (id);
