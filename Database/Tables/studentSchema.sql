BEGIN 
    TRY
        CREATE TABLE studentTable(
            id VARCHAR(200) PRIMARY KEY,
            firstName VARCHAR(200) NOT NULL,
            lastName VARCHAR(200) NOT NULL,
            className VARCHAR(200) NOT NULL,
            feeBalance FLOAT NOT NULL,
            inSession BIT DEFAULT 1
        )
    END TRY
BEGIN   
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH

