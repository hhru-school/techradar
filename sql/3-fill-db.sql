\c tech_radar;

INSERT INTO radar (radar_id, name, company_id, author_id, creation_time, last_change_time)
VALUES (9, 'Radar has 3-ring and 4-quadrant', 1, 1, now(), now()),
       (10, 'Radar has 4-ring and 4-quadrant', 1, 1, now(), now()),
       (11, 'Radar has 4-ring and 5-quadrant', 1, 1, now(), now()),
       (12, 'Radar has 5-ring and 5-quadrant', 1, 1, now(), now()),
       (13, 'Radar has 3-ring and 8-quadrant', 1, 1, now(), now());
SELECT setval('radar_radar_id_seq', (SELECT max(radar_id) FROM radar));

INSERT INTO ring (ring_id, radar_id, creation_time, last_change_time)
VALUES (31, 9, now(), now()),
       (32, 9, now(), now()),
       (33, 9, now(), now()),
       (34, 10, now(), now()),
       (35, 10, now(), now()),
       (36, 10, now(), now()),
       (37, 10, now(), now()),
       (38, 11, now(), now()),
       (39, 11, now(), now()),
       (40, 11, now(), now()),
       (41, 11, now(), now()),
       (42, 12, now(), now()),
       (43, 12, now(), now()),
       (44, 12, now(), now()),
       (45, 12, now(), now()),
       (46, 12, now(), now()),
       (47, 13, now(), now()),
       (48, 13, now(), now()),
       (49, 13, now(), now());
SELECT setval('ring_ring_id_seq', (SELECT max(ring_id) FROM ring));

INSERT INTO ring_setting (ring_setting_id, name, position, creation_time, last_change_time, ring_id)
VALUES (31, 'adopt', 1, now(), now(), 31),
       (32, 'trial', 2, now(), now(), 32),
       (33, 'assess', 3, now(), now(), 33),
       (34, 'adopt', 1, now(), now(), 34),
       (35, 'trial', 2, now(), now(), 35),
       (36, 'assess', 3, now(), now(), 36),
       (37, 'hold', 4, now(), now(), 37),
       (38, 'Используется', 1, now(), now(), 38),
       (39, 'Эксперимент', 2, now(), now(), 39),
       (40, 'Устарело', 3, now(), now(), 40),
       (41, 'Оценка', 4, now(), now(), 41),
       (42, 'Используется', 1, now(), now(), 42),
       (43, 'Эксперимент', 2, now(), now(), 43),
       (44, 'Устарело', 3, now(), now(), 44),
       (45, 'Оценка', 4, now(), now(), 45),
       (46, 'Удалена', 5, now(), now(), 46),
       (47, 'adopt', 1, now(), now(), 47),
       (48, 'trial', 2, now(), now(), 48),
       (49, 'assess', 3, now(), now(), 49);
SELECT setval('ring_setting_ring_setting_id_seq', (SELECT max(ring_setting_id) FROM ring_setting));

INSERT INTO quadrant (quadrant_id, radar_id, creation_time, last_change_time)
VALUES (33, 9, now(), now()),
       (34, 9, now(), now()),
       (35, 9, now(), now()),
       (36, 9, now(), now()),
       (37, 10, now(), now()),
       (38, 10, now(), now()),
       (39, 10, now(), now()),
       (40, 10, now(), now()),
       (41, 11, now(), now()),
       (42, 11, now(), now()),
       (43, 11, now(), now()),
       (44, 11, now(), now()),
       (45, 11, now(), now()),
       (46, 12, now(), now()),
       (47, 12, now(), now()),
       (48, 12, now(), now()),
       (49, 12, now(), now()),
       (50, 12, now(), now()),
       (51, 13, now(), now()),
       (52, 13, now(), now()),
       (53, 13, now(), now()),
       (54, 13, now(), now()),
       (55, 13, now(), now()),
       (56, 13, now(), now()),
       (57, 13, now(), now()),
       (58, 13, now(), now());
SELECT setval('quadrant_quadrant_id_seq', (SELECT max(quadrant_id) FROM quadrant));

INSERT INTO quadrant_setting (quadrant_setting_id, name, position, creation_time, last_change_time, quadrant_id)
VALUES (33, 'Data Management', 1, now(), now(), 33),
       (34, 'Languages', 2, now(), now(), 34),
       (35, 'Platform & Insfrastructure', 3, now(), now(), 35),
       (36, 'Frameworks & Tools', 4, now(), now(), 36),
       (37, 'Data Management', 1, now(), now(), 37),
       (38, 'Languages', 2, now(), now(), 38),
       (39, 'Platform & Infrastructure', 3, now(), now(), 39),
       (40, 'Frameworks & Tools', 4, now(), now(), 40),
       (41, 'Языки и тулинг', 1, now(), now(), 41),
       (42, 'Сервис', 2, now(), now(), 42),
       (43, 'Подход', 3, now(), now(), 43),
       (44, 'Библиотека', 4, now(), now(), 44),
       (45, 'Фича', 5, now(), now(), 45),
       (46, 'Сервис', 1, now(), now(), 46),
       (47, 'Подход', 2, now(), now(), 47),
       (48, 'Библиотека', 3, now(), now(), 48),
       (49, 'Languages & Frameworks', 4, now(), now(), 49),
       (50, 'Libraries', 5, now(), now(), 50),
       (51, 'Techniques', 1, now(), now(), 51),
       (52, 'Tools', 2, now(), now(), 52),
       (53, 'Languages', 3, now(), now(), 53),
       (54, 'Libraries', 4, now(), now(), 54),
       (55, 'Feature', 5, now(), now(), 55),
       (56, 'Environment', 6, now(), now(), 56),
       (57, 'Frameworks', 7, now(), now(), 57),
       (58, 'Infrastructure', 8, now(), now(), 58);
SELECT setval('quadrant_setting_quadrant_setting_id_seq', (SELECT max(quadrant_setting_id) FROM quadrant_setting));

INSERT INTO blip (blip_id, name, description, radar_id, creation_time, last_change_time)
VALUES (649, 'PostgreSQL', '', 9, now(), now()),
       (650, 'Cassandra', '', 9, now(), now()),
       (651, 'Redis', '', 9, now(), now()),
       (652, 'Memcached', '', 9, now(), now()),
       (653, 'ClickHouse', '', 9, now(), now()),
       (654, 'Airflow', '', 9, now(), now()),
       (655, 'Elasticsearch', '', 9, now(), now()),
       (656, 'Kafka', '', 9, now(), now()),
       (657, 'RabbitMQ', '', 9, now(), now()),
       (658, 'Logstash', '', 9, now(), now()),
       (659, 'Hadoop', '', 9, now(), now()),
       (660, 'Presto', '', 9, now(), now()),
       (661, 'Hive', '', 9, now(), now()),
       (662, 'Flink', '', 9, now(), now()),
       (663, 'Spark', '', 9, now(), now()),
       (664, 'Kafka Streams', '', 9, now(), now()),
       (665, 'Debezium', '', 9, now(), now()),
       (666, 'Java 17', '', 9, now(), now()),
       (667, 'Java 15', '', 9, now(), now()),
       (668, 'Zookeeper', '', 9, now(), now()),

       (669, 'Java 14', '', 10, now(), now()),
       (670, 'Java 11', '', 10, now(), now()),
       (671, 'Java 8', '', 10, now(), now()),
       (672, 'Python 3.9', '', 10, now(), now()),
       (673, 'Python 3.8', '', 10, now(), now()),
       (674, 'Python 3.7', '', 10, now(), now()),
       (675, 'Python 2', '', 10, now(), now()),
       (676, 'Nginx', '', 10, now(), now()),
       (677, 'Ansible', '', 10, now(), now()),
       (678, 'Docker', '', 10, now(), now()),
       (679, 'MinIO', '', 10, now(), now()),
       (680, 'Sentry', '', 10, now(), now()),
       (681, 'Okmeter', '', 10, now(), now()),
       (682, 'Consul', '', 10, now(), now()),
       (683, 'Kubernetes', '', 10, now(), now()),
       (684, 'Prometheus', '', 10, now(), now()),
       (685, 'Bamboo', '', 10, now(), now()),
       (686, 'Graphana', '', 10, now(), now()),
       (687, 'Sonar', '', 10, now(), now()),

       (688, 'GitHub', '', 11, now(), now()),
       (689, 'PgBouncer', '', 11, now(), now()),
       (690, 'Filebeat', '', 11, now(), now()),
       (691, 'git', '', 11, now(), now()),
       (692, 'Maven', '', 11, now(), now()),
       (693, 'pip', '', 11, now(), now()),
       (694, 'Spring Core', '', 11, now(), now()),
       (695, 'SpringData', '', 11, now(), now()),
       (696, 'Jetty', '', 11, now(), now()),
       (697, 'AsyncHttpClient', '', 11, now(), now()),
       (698, 'Jersey', '', 11, now(), now()),
       (699, 'jOOQ', '', 11, now(), now()),
       (700, 'Hibernate', '', 11, now(), now()),
       (701, 'Jackson', '', 11, now(), now()),
       (702, 'SLF4J', '', 11, now(), now()),
       (703, 'Logstash', '', 11, now(), now()),

       (704, 'MyBatis', '', 12, now(), now()),
       (705, 'OpenAPI / Swagger', '', 12, now(), now()),
       (706, 'HikariCP', '', 12, now(), now()),
       (707, 'Tornado', '', 12, now(), now()),
       (708, 'asyncio', '', 12, now(), now()),
       (709, 'Flask', '', 12, now(), now()),
       (710, 'Gunicorn', '', 12, now(), now()),
       (711, 'SQLAlchemy', '', 12, now(), now()),
       (712, 'aiopg', 'Library for accessing a PostgreSQL database from the asyncio framework.', 12, now(), now()),
       (713, 'aiohttp', 'Asynchronous HTTP Client/Server for asyncio and Python.', 12, now(), now()),
       (714, 'PgQ', '', 12, now(), now()),
       (715, 'JUnit 5', '', 12, now(), now()),
       (716, 'JUnit 4', '', 12, now(), now()),
       (717, 'mockito', '', 12, now(), now()),
       (718, 'TestContainers', '', 12, now(), now()),

       (719, 'pg-embedded', '', 13, now(), now()),
       (720, 'pytest', '', 13, now(), now()),
       (721, 'unittest (python)', '', 13, now(), now()),
       (722, 'jib', 'Maven plugin for building Docker and OCI images for your Java applications.', 13, now(), now()),
       (723, 'skaffold', 'Skaffold is a command line tool that facilitates continuous development for Kubernetes applications.', 13, now(), now()),
       (724, 'openTelemetry', 'OpenTelemetry is a collection of tools, APIs, and SDKs to instrument, generate, collect, and export telemetry data (metrics, logs, and traces) for analysis in order to understand your software''s performance and behavior.', 13, now(), now()),
       (725, 'graphql', '', 13, now(), now()),
       (726, 'PostgreSQL', '', 13, now(), now()),
       (727, 'Scylla', '', 13, now(), now()),
       (728, 'Cassandra', '', 13, now(), now()),
       (729, 'Redis', '', 13, now(), now()),
       (730, 'Memcached', '', 13, now(), now()),
       (731, 'Zookeeper', '', 13, now(), now()),
       (732, 'ClickHouse', '', 13, now(), now()),
       (733, 'Airflow', '', 13, now(), now()),
       (734, 'Elasticsearch', '', 13, now(), now()),
       (735, 'Kafka', '', 13, now(), now()),
       (736, 'RabbitMQ', '', 13, now(), now()),
       (737, 'Logstash', '', 13, now(), now()),
       (738, 'Hadoop', '', 13, now(), now()),
       (739, 'Presto', '', 13, now(), now()),
       (740, 'Hive', '', 13, now(), now());
SELECT setval('blip_blip_id_seq', (SELECT max(blip_id) FROM blip));

INSERT INTO blip_event (blip_event_id, version_name, blip_id, quadrant_id, ring_id, author_id, creation_time, last_change_time)
VALUES (649, 'v', 649, 33, 31, 1, now(), now()),
       (650, 'v', 650, 34, 32, 1, now(), now()),
       (651, 'v', 651, 35, 33, 1, now(), now()),
       (652, 'v', 652, 36, 31, 1, now(), now()),
       (653, 'v', 653, 33, 32, 1, now(), now()),
       (654, 'v', 654, 34, 33, 1, now(), now()),
       (655, 'v', 655, 35, 31, 1, now(), now()),
       (656, 'v', 656, 36, 32, 1, now(), now()),
       (657, 'v', 657, 33, 33, 1, now(), now()),
       (658, 'v', 658, 34, 31, 1, now(), now()),
       (659, 'v', 659, 35, 32, 1, now(), now()),
       (660, 'v', 660, 36, 33, 1, now(), now()),
       (661, 'v', 661, 33, 31, 1, now(), now()),
       (662, 'v', 662, 34, 32, 1, now(), now()),
       (663, 'v', 663, 35, 33, 1, now(), now()),
       (664, 'v', 664, 36, 31, 1, now(), now()),
       (665, 'v', 665, 33, 32, 1, now(), now()),
       (666, 'v', 666, 34, 33, 1, now(), now()),
       (667, 'v', 667, 35, 31, 1, now(), now()),
       (668, 'v', 668, 36, 32, 1, now(), now()),
       (669, 'v', 669, 37, 34, 1, now(), now()),
       (670, 'v', 670, 38, 35, 1, now(), now()),
       (671, 'v', 671, 39, 36, 1, now(), now()),
       (672, 'v', 672, 40, 37, 1, now(), now()),
       (673, 'v', 673, 37, 34, 1, now(), now()),
       (674, 'v', 674, 38, 35, 1, now(), now()),
       (675, 'v', 675, 39, 36, 1, now(), now()),
       (676, 'v', 676, 40, 37, 1, now(), now()),
       (678, 'v', 678, 37, 34, 1, now(), now()),
       (679, 'v', 679, 38, 35, 1, now(), now()),
       (680, 'v', 680, 39, 36, 1, now(), now()),
       (681, 'v', 681, 40, 37, 1, now(), now()),
       (682, 'v', 682, 37, 34, 1, now(), now()),
       (683, 'v', 683, 38, 35, 1, now(), now()),
       (684, 'v', 684, 39, 36, 1, now(), now()),
       (685, 'v', 685, 40, 37, 1, now(), now()),
       (686, 'v', 686, 37, 34, 1, now(), now()),
       (687, 'v', 687, 38, 35, 1, now(), now()),

       (688, 'v', 688, 41, 38, 1, now(), now()),
       (689, 'v', 689, 42, 39, 1, now(), now()),
       (690, 'v', 690, 43, 40, 1, now(), now()),
       (691, 'v', 691, 45, 38, 1, now(), now()),
       (692, 'v', 692, 41, 39, 1, now(), now()),
       (693, 'v', 693, 42, 40, 1, now(), now()),
       (694, 'v', 694, 43, 41, 1, now(), now()),
       (695, 'v', 695, 44, 38, 1, now(), now()),
       (696, 'v', 696, 45, 39, 1, now(), now()),
       (697, 'v', 697, 41, 40, 1, now(), now()),
       (698, 'v', 698, 42, 41, 1, now(), now()),
       (699, 'v', 699, 43, 38, 1, now(), now()),
       (700, 'v', 700, 44, 39, 1, now(), now()),
       (701, 'v', 701, 45, 40, 1, now(), now()),
       (702, 'v', 702, 41, 41, 1, now(), now()),
       (703, 'v', 703, 42, 38, 1, now(), now()),

       (704, 'v', 704, 46, 42, 1, now(), now()),
       (705, 'v', 705, 47, 43, 1, now(), now()),
       (706, 'v', 706, 48, 44, 1, now(), now()),
       (707, 'v', 707, 49, 45, 1, now(), now()),
       (708, 'v', 708, 50, 46, 1, now(), now()),
       (709, 'v', 709, 46, 42, 1, now(), now()),
       (710, 'v', 710, 47, 43, 1, now(), now()),
       (711, 'v', 711, 48, 44, 1, now(), now()),
       (712, 'v', 712, 49, 45, 1, now(), now()),
       (713, 'v', 713, 50, 46, 1, now(), now()),
       (714, 'v', 714, 46, 42, 1, now(), now()),
       (715, 'v', 715, 47, 43, 1, now(), now()),
       (716, 'v', 716, 48, 44, 1, now(), now()),
       (717, 'v', 717, 49, 45, 1, now(), now()),
       (718, 'v', 718, 50, 46, 1, now(), now()),
       (719, 'v', 719, 46, 42, 1, now(), now()),

       (720, 'v', 720, 51, 47, 1, now(), now()),
       (721, 'v', 721, 52, 48, 1, now(), now()),
       (722, 'v', 722, 53, 49, 1, now(), now()),
       (723, 'v', 723, 54, 47, 1, now(), now()),
       (724, 'v', 724, 55, 48, 1, now(), now()),
       (725, 'v', 725, 56, 49, 1, now(), now()),
       (726, 'v', 726, 57, 47, 1, now(), now()),
       (727, 'v', 727, 58, 48, 1, now(), now()),
       (728, 'v', 728, 51, 49, 1, now(), now()),
       (729, 'v', 729, 52, 47, 1, now(), now()),
       (730, 'v', 730, 53, 48, 1, now(), now()),
       (731, 'v', 731, 54, 49, 1, now(), now()),
       (732, 'v', 732, 55, 47, 1, now(), now()),
       (733, 'v', 733, 56, 48, 1, now(), now()),
       (734, 'v', 734, 57, 49, 1, now(), now()),
       (735, 'v', 735, 58, 47, 1, now(), now()),
       (736, 'v', 736, 51, 48, 1, now(), now()),
       (737, 'v', 737, 52, 49, 1, now(), now()),
       (738, 'v', 738, 53, 47, 1, now(), now()),
       (739, 'v', 739, 54, 48, 1, now(), now()),
       (740, 'v', 740, 55, 49, 1, now(), now());
SELECT setval('blip_event_blip_event_id_seq', (SELECT max(blip_event_id) FROM blip_event));