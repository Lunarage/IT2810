CREATE TABLE IF NOT EXISTS users(
	username varchar,
	CONSTRAINT users_pk PRIMARY KEY (username)
);

GRANT ALL ON TABLE users TO amazing;

CREATE TABLE IF NOT EXISTS title_likes(
	username varchar,
	tconst varchar(9),
	CONSTRAINT title_likes_pk PRIMARY KEY (username, tconst),
	CONSTRAINT username_fk FOREIGN KEY (username)
		REFERENCES users(username)
		ON DELETE CASCADE,
	CONSTRAINT tconst_fk FOREIGN KEY (tconst)
		REFERENCES title_basics(tconst)
		ON DELETE CASCADE
);

GRANT ALL ON TABLE title_likes TO amazing;
