CREATE TABLE user(id SERIAL PRIMARY KEY,name TEXT,email TEXT,password TEXT,company_id INTEGER REFERENCES company(company_id));,