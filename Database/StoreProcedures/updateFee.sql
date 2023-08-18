CREATE OR ALTER PROCEDURE updateFee (@id VARCHAR(200), @feeBalance  FLOAT)
AS
    BEGIN
        UPDATE studentTable SET feeBalance = @feeBalance WHERE id= @id
    END