CREATE TABLE IF NOT EXISTS products (
    id              uuid not null,
    title           text not null,
    description     text,
    price           int,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS stocks (
    product_id      uuid not null,
    count           int,
    PRIMARY KEY(product_id),
    CONSTRAINT fk_product_id
      FOREIGN KEY(product_id)
	  REFERENCES products(id)
);

TRUNCATE TABLE stocks;
TRUNCATE TABLE products CASCADE;

INSERT INTO products
VALUES
    (
        gen_random_uuid(),
        'Machine Learning Simplified',
        'The underlying goal of "Machine Learning Simplified" is to develop strong intuition into inner workings of ML. We use simple intuitive examples to explain complex concepts, algorithms or methods, as well as democratize all mathematics "behind the scenes". After reading this book, you will understand everything that comes into the scope of supervised ML. You will be able to not only understand nitty-gritty details of mathematics, but also explain to anyone how things work on a high level.',
        53
    ),
    (
        gen_random_uuid(),
        'Practical Statistics for Data Scientists',
        'Statistical methods are a key part of data science, yet very few data scientists have any formal statistics training. Courses and books on basic statistics rarely cover the topic from a data science perspective. This practical guide explains how to apply various statistical methods to data science, tells you how to avoid their misuse, and gives you advice on what''s important and what''s not. Many data science resources incorporate statistical methods but lack a deeper statistical perspective. If you''re familiar with the R programming language, and have some exposure to statistics, this quick reference bridges the gap in an accessible, readable format.',
        62
    ),
    (
        gen_random_uuid(),
        'Naked Statistics - Stripping the Dread From the Data',
        'Naked Statistics takes a casual approach at explaining core statistical concepts with real-life examples, answering questions like "How does Netflix know which movies you''ll like?" and "What is causing the rising incidence of autism?"',
        73
    );

INSERT INTO stocks
SELECT id, 5 as count
FROM products;
