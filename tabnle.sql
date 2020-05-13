-- 创建用户信息表
create table user(
    id int auto_increment primary key,
    name varchar(16) not null,
    phone varchar(11) not null

);