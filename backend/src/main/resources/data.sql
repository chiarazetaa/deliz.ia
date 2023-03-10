MERGE INTO tbl_operation (id) VALUES ('OP_READ'), ('OP_WRITE');

MERGE INTO tbl_role (id) VALUES ('ROLE_OWNER');

MERGE INTO tbl_user (id, username, password) VALUES
(1, 'owner', '$2a$10$EKlRvIQfTMkVzTG1bYQm3.5cfvKLtkBw7RhMpxuyRCiF5HubRlsDq');

MERGE INTO tbl_item (id, name, description, price) VALUES
(1, 'A', 'a', 3.99),
(2, 'B', 'b', 2.49),
(3, 'C', 'c', 1.05),
(4, 'D', 'd', 0.98);
