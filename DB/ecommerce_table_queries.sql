CREATE DATABASE ecommerce;
use ecommerce;
Create table Products(
	prod_id INT Primary key auto_increment,
    prod_name VARCHAR(100) NOT NULL,
    prod_desc varchar(1000) ,
    category_id int ,
    sale_price float,
    list_price float
);

ALTER TABLE Products ADD created_by varchar(100) NOT NULL,ADD created_dt DATETIME NOT NULL,ADD units_avai INT ;
select * FROM Products;

CREATE TABLE Category (
	category_id int PRIMARY KEY auto_increment,
    category_desC VARCHAR(100),
    created_by varchar(100) NOT NULL,
    created_dt DATETIME NOT NULL
);
ALTER TABLE category RENAME column category_desC  to category_desc;
CREATE TABLE Users( 
	user_id INT PRIMARY key auto_increment,
	user_name VARCHAR(100) NOT NULL,
    passwrd VARCHAR(100) NOT NULL,
    email_id VARCHAR(100),
    role_id  int,
    created_by varchar(100),
    created_dt datetime
);

CREATE TABLE Roles(
	role_id int PRIMARY KEY auto_increment,
    role_desc VARCHAR(100),
    created_by varchar(100) NOT NULL,
    created_dt DATETIME NOT NULL
);

CREATE TABLE Orders(
	order_id int auto_increment PRIMARY KEY,
    user_id int ,
    order_date DATE,
    tot_amt FLOAT,
	cgst float,
    sgst float,
    final_amt float,
    created_by varchar(100) NOT NULL,
    created_dt DATETIME NOT NULL
);

CREATE TABLE Order_Items (
	order_id int PRIMARY KEY auto_increment,
    prod_id int,
	prod_name VARCHAR(100) NOT NULL,
    qty int,
    price float,
	created_by varchar(100) NOT NULL,
    created_dt DATETIME NOT NULL
);

	ALTER TABLE Orders ADD COLUMN status VARCHAR(100) default "new";
