DELIMITER GO	

USE sys
GO

DROP DATABASE IF EXISTS appmon
GO

CREATE DATABASE appmon
GO

USE appmon
GO

CREATE TABLE application
(
	gid 					CHAR(36) 		NOT NULL,
	app_domain 			VARCHAR(50) 	NULL DEFAULT NULL,
	name 					VARCHAR(50) 	NULL DEFAULT NULL,
	entity 				VARCHAR(50) 	NULL DEFAULT NULL,
	last_heartbeat 	DATETIME 		NULL DEFAULT NULL,
	app_type				VARCHAR(10)		NOT NULL, -- Service, Batch
	current_activity	VARCHAR(100)	NULL,
	
	CONSTRAINT 	pk_application PRIMARY KEY (gid)
	
) ENGINE=InnoDB;
GO

CREATE TRIGGER tr_application_insert 
BEFORE INSERT ON application
FOR EACH ROW 
BEGIN 
	IF (NEW.gid IS NULL) THEN
    SET NEW.gid = UUID(); 
   END IF;
END
GO

CREATE TABLE audit_log_entry
(
	id						INT				NOT NULL AUTO_INCREMENT,
	app_gid 				CHAR(36) 		NOT NULL,
	
	datetime_logged 	DATETIME 		NULL DEFAULT CURRENT_TIMESTAMP(),
	level					INT				NOT NULL, -- 1 = Info, 2 = Warning, 3 = Error, 4 = Critical
	log_description	TEXT				NULL,
	
	CONSTRAINT 	pk_audit_log_entry 	PRIMARY KEY (id)
	
) ENGINE=InnoDB;
GO

ALTER TABLE audit_log_entry
    ADD CONSTRAINT fk_audit_log_entry_application 
	 FOREIGN KEY (app_gid)
    REFERENCES application (gid)
GO

#
# 
#
INSERT INTO application(gid, app_domain, name, entity, app_type, last_heartbeat) VALUES ('00000001-3c05-11e7-a467-080027152214', 'Default', 'Service 1', 'Entity 1', 'Process', '2017-05-15 13:00:00');
INSERT INTO application(gid, app_domain, name, entity, app_type) VALUES ('00000002-3c05-11e7-a467-080027152214', 'Default', 'Service 2', NULL, 'Process');
INSERT INTO application(gid, app_domain, name, entity, app_type) VALUES ('00000003-3c05-11e7-a467-080027152214', 'Default', 'Service 3', 'Entity 1', 'Process');
INSERT INTO application(gid, app_domain, name, entity, app_type) VALUES ('00000004-3c05-11e7-a467-080027152214', 'Default', 'Service 3', 'Entity 2', 'Process');
INSERT INTO application(gid, app_domain, name, entity, app_type) VALUES ('00000005-3c05-11e7-a467-080027152214', 'Default', 'Batch 1', 'Entity 1', 'Batch');
INSERT INTO application(gid, app_domain, name, entity, app_type) VALUES ('00000006-3c05-11e7-a467-080027152214', 'Default', 'Batch 1', 'Entity 2', 'Batch');
GO

SELECT * FROM application
GO

INSERT INTO audit_log_entry(app_gid, datetime_logged, level, log_description) VALUES ('00000001-3c05-11e7-a467-080027152214', '2017-05-15 13:00:00', 1, 'Some description for this log entry');
INSERT INTO audit_log_entry(app_gid, datetime_logged, level, log_description) VALUES ('00000001-3c05-11e7-a467-080027152214', '2017-05-15 13:00:00', 2, 'Some description for this log entry');
INSERT INTO audit_log_entry(app_gid, datetime_logged, level, log_description) VALUES ('00000001-3c05-11e7-a467-080027152214', '2017-05-15 13:00:00', 3, 'Some description for this log entry');
INSERT INTO audit_log_entry(app_gid, datetime_logged, level, log_description) VALUES ('00000001-3c05-11e7-a467-080027152214', '2017-05-15 13:00:00', 4, 'Some description for this log entry');
GO

SELECT * FROM audit_log_entry;
GO

DROP PROCEDURE IF EXISTS temp_sp_popuate_log_entries
GO

CREATE PROCEDURE temp_sp_popuate_log_entries()
BEGIN
  DECLARE int_val INT DEFAULT 0;
  test_loop : LOOP
    IF (int_val = 10000) THEN
      LEAVE test_loop;
    END IF;
    
	INSERT INTO audit_log_entry(app_gid, datetime_logged, level, log_description) 
	SELECT gid, CURRENT_TIMESTAMP(), MOD(RAND()*1000, 3) + 1, CONCAT('This is a detailed log entry number ',int_val,' for application ',name,', entity ',COALESCE(entity, ''),'. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. This is some additional text for this event entry. ')
	FROM 	
		application;

    SET int_val = int_val +1;
  END LOOP; 
END
GO

call temp_sp_popuate_log_entries();
GO


SELECT * FROM audit_log_entry;
GO