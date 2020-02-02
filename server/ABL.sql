


CREATE TABLE ABL (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(45),
Current_Lot VARCHAR(45), 
Expiration_Date VARCHAR(200), 
Quantity VARCHAR(45)
)




INSERT INTO `ABL` (`id`, `Name`, `Current_Lot`, `Expiration_Date`, `Quantity`) VALUES
(1, 'Calibration-Solution', 'FD20S-SK2',  '04/14/21', '32'); 
(2,  'Calibration-Solution-2', 'XOSLW-A2KD',  '03/20/22', '16'); 
(3,  'Met-II-Clean-Solution', 'F38X-SLK3',  '12/03/21', '24'); 

