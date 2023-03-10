INSERT INTO tbl_role (id) VALUES
('ROLE_OWNER');

INSERT INTO tbl_operation (id) VALUES
('OP_READ'),
('OP_WRITE');

INSERT INTO tbl_role_operation (role_id, operation_id) VALUES
('ROLE_OWNER', 'OP_READ'),
('ROLE_OWNER', 'OP_WRITE');

INSERT INTO tbl_user (id, username, password) VALUES
(1, 'owner', '$2a$10$EKlRvIQfTMkVzTG1bYQm3.5cfvKLtkBw7RhMpxuyRCiF5HubRlsDq');

INSERT INTO tbl_user_role (user_id, role_id) VALUES (1, 'ROLE_OWNER');

INSERT INTO tbl_tag (id) VALUES ('vegetarian'), ('vegan');

INSERT INTO tbl_item (id, name, description, price) VALUES
(1, 'A', 'a', 3.99),
(2, 'B', 'b', 2.49),
(3, 'C', 'c', 1.05),
(4, 'D', 'd', 0.98);

INSERT INTO tbl_item_tag (item_id, tag_id) VALUES
(1, 'vegetarian'),
(1, 'vegan'),
(3, 'vegan');