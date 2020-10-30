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

/* Create an index on start_year to speed up sorting (on start_year) */
CREATE INDEX start_year_index ON title_basics (start_year);

GRANT ALL ON TABLE title_basics TO amazing;
