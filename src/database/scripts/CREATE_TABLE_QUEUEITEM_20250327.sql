/**********************************************
Create Date:        2025-03-27
Author:             Carla
Description:        Create table Queue Item
**********************************************/
CREATE TABLE queueitem (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position INT NOT NULL,
    isActual BOOLEAN NOT NULL,
    identification VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    ringDate TIMESTAMP,
    startDate TIMESTAMP,
    finishDate TIMESTAMP
);