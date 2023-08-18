CREATE OR ALTER PROCEDURE getOneStudent (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM studentTable WHERE id = @id
    END