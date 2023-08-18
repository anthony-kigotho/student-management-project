CREATE OR ALTER PROCEDURE createStudentPROC(@id VARCHAR(200), @firstName  VARCHAR(200), @lastName VARCHAR(200), @className VARCHAR(200), @feeBalance FLOAT)
AS
BEGIN
    INSERT INTO studentTable(id, firstName, lastName, className, feeBalance) VALUES (@id, @firstName, @lastName, @className, @feeBalance)
END