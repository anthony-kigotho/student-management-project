CREATE OR ALTER PROCEDURE deleteStudent (@id VARCHAR(200))
AS
BEGIN 
    UPDATE studentTable SET inSession = 0 WHERE id= @id
END