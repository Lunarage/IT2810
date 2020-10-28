CREATE TABLE IF NOT EXISTS title_basics(
	tconst varchar(9),
	title_type varchar(80),
	primary_title varchar(512),
	original_title varchar(512),
	is_adult boolean,
	start_year smallint,
	end_year smallint,
	runtime_minutes integer,
	genres varchar(80),
	CONSTRAINT title_basics_pk PRIMARY KEY (tconst)
);

GRANT ALL ON TABLE title_basics TO amazing;
