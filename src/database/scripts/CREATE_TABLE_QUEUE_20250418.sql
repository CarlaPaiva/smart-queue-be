/**********************************************
Create Date:        2025-04-18
Author:             Carla
Description:        Create table Queue 
**********************************************/

CREATE TABLE queue (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	creationDate TIMESTAMP NOT NULL,
	startDate TIMESTAMP,
    finishDate TIMESTAMP
)

ALTER TABLE queueitem
ADD queue_id UUID; 

ALTER TABLE queueitem 
	ADD FOREIGN KEY(queue_id) 
	REFERENCES queue(id);