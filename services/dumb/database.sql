CREATE DATABASE kontact

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	email TEXT NOT NULL UNIQUE,
  	senha TEXT NOT NULL
);

CREATE TABLE contatos (
	id SERIAL PRIMARY KEY,
  	nome text not null,
  	email text not null,
  	telefone text not null,
  	usuario_id INTEGER REFERENCES usuarios(id)
);