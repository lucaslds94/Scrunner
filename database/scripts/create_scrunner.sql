DROP DATABASE IF EXISTS scrunner;
CREATE DATABASE scrunner; 

USE scrunner;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(350) NOT NULL,
    is_owner ENUM('F','T') NOT NULL,
    image VARCHAR(500),
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_users PRIMARY KEY(id)
);


CREATE TABLE teams(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50),
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_teams PRIMARY KEY(id)
);


CREATE TABLE user_teams(
    id INT NOT NULL AUTO_INCREMENT,
    is_leader ENUM('F','T') NOT NULL,
    users_id INT NOT NULL,
    teams_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_user_teams PRIMARY KEY (id),
    CONSTRAINT fk_user_teams_users FOREIGN KEY(users_id) REFERENCES users(id),
    CONSTRAINT fk_user_teams_teams FOREIGN KEY(teams_id) REFERENCES teams(id)
);


CREATE TABLE daily_boards(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    teams_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_daily_boards PRIMARY KEY (id),
    CONSTRAINT fk_daily_boards_user_teams FOREIGN KEY(teams_id) REFERENCES teams(id)
);

CREATE TABLE daily_contents(
    id INT NOT NULL AUTO_INCREMENT,
    did_yesterday VARCHAR(255),
    do_today VARCHAR(255),
    problems VARCHAR(255),
    daily_boards_id INT NOT NULL,
    users_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_daily_contents PRIMARY KEY(id),
    CONSTRAINT fk_daily_contents_daily_boards FOREIGN KEY(daily_boards_id) REFERENCES daily_boards(id),
    CONSTRAINT fk_daily_contents_users FOREIGN KEY(users_id) REFERENCES users(id)
);

CREATE TABLE task_boards(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    teams_id INT NOT NULL,
    CONSTRAINT pk_task_boards PRIMARY KEY (id),
    CONSTRAINT fk_task_boards_teams FOREIGN KEY(teams_id) REFERENCES teams(id)
);

CREATE TABLE task_columns(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    CONSTRAINT pk_task_columns PRIMARY KEY(id)
);

CREATE TABLE tasks(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    task_points tinyINT NOT NULL,
    task_columns_id INT NOT NULL,
    task_boards_id INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT pk_tasks PRIMARY KEY(id),
    CONSTRAINT fk_tasks_task_columns FOREIGN KEY(task_columns_id) REFERENCES task_columns(id),
    CONSTRAINT fk_tasks_task_boards FOREIGN KEY(task_boards_id) REFERENCES task_boards(id),
    CONSTRAINT fk_tasks_users FOREIGN KEY(users_id) REFERENCES users(id)
);
