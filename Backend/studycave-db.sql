drop database db;
create database db;
use db;



create table User (
	id int NOT NULL AUTO_INCREMENT  primary key,
    name varchar(15),
    surname varchar(15),
    login varchar(15),
    password varchar(255),
    email varchar(20)
);

create table FlashcardSet (
	id int NOT NULL AUTO_INCREMENT  primary key,
    name varchar(30),
    category varchar(30),
    id_owner int,
    add_date date,
    edit_date date,
    grade int
    
    #foreign key(id_owner) references User(id)
);


create table Flashcard (
	id_set int,
    id int NOT NULL AUTO_INCREMENT  primary key,
    left_side varchar(30),
	right_side varchar(30),

    foreign key(id_set) references FlashcardSet(id)
);

INSERT INTO User VALUES(1,'-','-','anonim','-','-');
INSERT INTO FlashcardSet VALUES(1,'zestaw1','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO FlashcardSet VALUES(2,'zestaw2','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO Flashcard VALUES(1,1,'left1','right1');
INSERT INTO Flashcard VALUES(1,2,'left2','right2');
INSERT INTO Flashcard VALUES(2,3,'2left2','2right2');

select * from User;
select * from FlashcardSet;
select * from flashcard;