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
    grade int,
    permission varchar(30)
    
    #foreign key(id_owner) references User(id)
);


create table Flashcard (
	id_set int,
    id int NOT NULL AUTO_INCREMENT  primary key,
    left_side varchar(30),
	right_side varchar(30),

    foreign key(id_set) references FlashcardSet(id)
);

create table Test(
	id int NOT NULL AUTO_INCREMENT primary key,
    title varchar(30),
    id_owner int,
    add_date date,
    edit_date date,
    permission varchar(30)
);

create table Question(
	id int NOT NULL AUTO_INCREMENT primary key,
	#type varchar(15),
    question varchar(15),
    nr_question int,
    id_test int,
    points int,
    
    foreign key(id_test) references Test(id)
);




INSERT INTO User VALUES(1,'-','-','anonim','-','-');

INSERT INTO FlashcardSet VALUES(1,'zestaw1','cat1',1, 14/04/2018,14/04/2018 ,5,'public');
INSERT INTO FlashcardSet VALUES(2,'zestaw2','cat1',1, 14/04/2018,14/04/2018 ,5,'public');

INSERT INTO Flashcard VALUES(1,1,'left1','right1');
INSERT INTO Flashcard VALUES(1,2,'left2','right2');
INSERT INTO Flashcard VALUES(2,3,'2left2','2right2');

select * from User;
select * from FlashcardSet;
select * from flashcard;

select * from Test;
select * from Question;
select * from Answer;
select * from Answer_Pairs;
select * from Answer_Gaps;
select * from Answer_Puzzle;
select * from Answer_Choices;

select * from material;

SHOW TABLES;



