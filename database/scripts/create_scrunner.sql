DROP DATABASE IF EXISTS scrunner;
CREATE DATABASE scrunner; 

USE scrunner;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(350) NOT NULL,
    is_owner BOOLEAN NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1,
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
    is_leader BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_user_teams PRIMARY KEY (id),
    CONSTRAINT fk_user_teams_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_user_teams_teams FOREIGN KEY(team_id) REFERENCES teams(id)
);


CREATE TABLE daily_boards(
    id INT NOT NULL AUTO_INCREMENT,
    team_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_daily_boards PRIMARY KEY (id),
    CONSTRAINT fk_daily_boards_user_teams FOREIGN KEY(team_id) REFERENCES teams(id)
);

CREATE TABLE daily_contents(
    id INT NOT NULL AUTO_INCREMENT,
    did_yesterday VARCHAR(255),
    do_today VARCHAR(255),
    problems VARCHAR(255),
    daily_board_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    CONSTRAINT pk_daily_contents PRIMARY KEY(id),
    CONSTRAINT fk_daily_contents_daily_boards FOREIGN KEY(daily_board_id) REFERENCES daily_boards(id),
    CONSTRAINT fk_daily_contents_users FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE task_boards(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at timestamp not null,
    updated_at timestamp not null,
    team_id INT NOT NULL,
    CONSTRAINT pk_task_boards PRIMARY KEY (id),
    CONSTRAINT fk_task_boards_teams FOREIGN KEY(team_id) REFERENCES teams(id)
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
    task_column_id INT NOT NULL,
    task_board_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT pk_tasks PRIMARY KEY(id),
    CONSTRAINT fk_tasks_task_columns FOREIGN KEY(task_column_id) REFERENCES task_columns(id),
    CONSTRAINT fk_tasks_task_boards FOREIGN KEY(task_board_id) REFERENCES task_boards(id),
    CONSTRAINT fk_tasks_users FOREIGN KEY(user_id) REFERENCES users(id)
);
