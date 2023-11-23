--! Previous: sha1:e23a2ead24bdc507a05077244e3454ce65cf5d38
--! Hash: sha1:17767b0f300f4b3861c298df21b2bcd0bc7d8425
--! Message: Added table for answers and function to select answer options to the question

-- Enter migration here
create table if not exists answer_options (
	id serial primary key,
	answer_option text
);

alter table answer_options 
add question_id int;

create table if not exists questions_answer_options (
	answer_option_id int,
	question_id int,
	primary key (answer_option_id, question_id),
	constraint fk_answer_options foreign key(answer_option_id) references answer_options(id),
	constraint fk_questions foreign key(question_id) references questions(id)
);

drop function if exists get_question_answer_options(questions);

create or replace function get_question_answer_options(questions)
   returns answer_options[]
   language plpgsql
  as
$$
declare 
-- variable declaration
begin
 -- logic
	return (select array_agg(ao.*) from questions_answer_options qao 
	left join answer_options ao on ao.id = qao.answer_option_id
	where qao.question_id = $1.id);
end;
$$
