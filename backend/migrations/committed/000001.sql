--! Previous: -
--! Hash: sha1:e23a2ead24bdc507a05077244e3454ce65cf5d38

-- Enter migration here
create table if NOT EXISTS questions (
    id serial primary key,
    question text,
    answer_type text
);
