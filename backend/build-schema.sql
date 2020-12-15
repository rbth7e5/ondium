DROP TABLE IF EXISTS access;
DROP TABLE IF EXISTS collection_content;
DROP TABLE IF EXISTS payments;

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS collections;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL,
    email TEXT NOT NULL
--    birth_date DATE NOT NULL,
--    stripe_details VARCHAR(50), -- ?
--    isWriter BOOLEAN NOT NULL DEFAULT FALSE,
--    CHECK (
--        CASE
--            WHEN isWriter = FALSE THEN TRUE
--            ELSE (stripe_details IS NOT NULL)
--        END
--    )
);

CREATE TABLE articles (
    article_id INTEGER PRIMARY KEY,
    article_title TEXT NOT NULL,
    writer VARCHAR(50) REFERENCES users(username),
    price DECIMAL(4,2) CHECK (price >= 0), -- if price=0.00 free access
    content TEXT
    -- how to store interactive content?
);

CREATE TABLE access ( -- doesn't seem the most efficient idk
    username VARCHAR(50) REFERENCES users(username),
    article_id INTEGER REFERENCES articles(article_id)
);

CREATE TABLE collections ( -- books
    coll_id INTEGER PRIMARY KEY,
    coll_name VARCHAR(50) NOT NULL,
    coll_description TEXT,
    price DECIMAL(5,2) CHECK (price >= 0) -- how to do price discrimination?
    -- assume collection only has one writer
);

CREATE TABLE collection_content (
    coll_id INTEGER REFERENCES collections(coll_id),
    article_id INTEGER REFERENCES articles(article_id)
);

CREATE TABLE payments (
    payment_id INTEGER PRIMARY KEY,
    payment_date DATE NOT NULL,
    payer VARCHAR(50) REFERENCES users(username),
    payee VARCHAR(50) REFERENCES users(username),
    amount DECIMAL(5,2) NOT NULL, -- in case of price changes
    purchase_type VARCHAR(50) CHECK (purchase_type IN ('article', 'collection')),
    article_id INTEGER REFERENCES articles(article_id),
    coll_id INTEGER REFERENCES collections(coll_id),
    CHECK (article_id IS NOT NULL OR coll_id IS NOT NULL)
);
