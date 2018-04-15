drop database db;
create database db;
use db;



create table User (
	id int,
    name varchar(15),
    surname varchar(15),
    login varchar(15),
    password varchar(15),
    email varchar(20),
    
	primary key(id)
);

create table FlashcardSet (
	id int,
    name varchar(30),
    category varchar(30),
    id_owner int,
    add_date date,
    edit_date date,
    grade int,
    
    primary key(id)
    #foreign key(id_owner) references User(id)
);


create table Flashcard (
	id_set int,
    id int,
    left_side varchar(30),
	right_side varchar(30),

	primary key(id),
    foreign key(id_set) references FlashcardSet(id)
);

INSERT INTO User VAflashcard_setLUES(0,'-','-','anonim','-','-');
INSERT INTO FlashcardSet VALUES(0,'zestaw1','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO FlashcardSet VALUES(1,'zestaw2','cat1',0, 14/04/2018,14/04/2018 ,5);
INSERT INTO Flashcard VALUES(0,1,'left1','right1');
INSERT INTO Flashcard VALUES(0,2,'left2','right2');
INSERT INTO Flashcard VALUES(1,3,'2left2','2right2');

select * from User;
select * from FlashcardSet;
select * from flashcard;
