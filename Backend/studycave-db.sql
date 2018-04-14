#create database db;
use  db;

drop table Flashcards;
drop table FlashcardsSet;
drop table Users;

create table Users (
	id int,
    name varchar(15),
    surname varchar(15),
    login varchar(15),
    password varchar(15),
    email varchar(20),
    

	primary key(id)
);

create table FlashcardsSet (
	id int,
    name varchar(30),
    category varchar(30),
    id_owner int,
    add_date date,
    edit_add date,
    grade int,
    
    primary key(id),
    foreign key(id_owner) references Users(id)
);

create table Flashcards (
	id_set int,
    id_card int,
    left_side varchar(30),
	right_side varchar(30),

	primary key(id_card),
    foreign key(id_set) references FlashcardsSet(id)
);




INSERT INTO Users VALUES(0,'-','-','anonim','-','-');
INSERT INTO FlashcardsSet VALUES(0,'zestaw1','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO FlashcardsSet VALUES(2,'zestaw2','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO Flashcards VALUES(0,1,'left1','right1');
INSERT INTO Flashcards VALUES(0,2,'left2','right2');
INSERT INTO Flashcards VALUES(2,3,'2left2','2right2');

select * from Flashcards where id_set=0