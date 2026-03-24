-- Auto-generated seed data from src/data/
-- Generated: 2026-03-24T15:54:37.829Z

-- Songs
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('test-renderer', 0, '渲染测试', NULL, 'Renderer Test — All Features', 'D', '4/4', 60, '1 2 3 4 | 5 6 7 1'' | 2'' 1'' 7 6 | 5 4 3 2 |
1 - - - | 5, 6, 7, 1 | 2 3 5 6 | 1'' 2'' 1'' - |
[ 1_ 2_ ] [ 3_ 5_ ] 6 5 | [ 6_ 5_ ] [ 3_ 2_ ] 1 - |
[ 1_ 2_ 3_ ] 5 - 0 | 6 [ 3_ 2_ 1_ ] - 0 |
[ 1_ 2_ 3_ 5_ ] - - | [ 6_ 5_ 3_ 2_ ] - - |
[ 1_ 2_ 3_ 5_ 6_ 1''_ ] - | [ 6,_ 6,_ ] [ 1_ 6,_ ] [ 5,_ 3,_ ] 1 |
[ 1__ 2__ 3__ 5__ ] - - - | [ 1__ 2__ ] [ 3__ 5__ ] - - - |
[ 6_ 6__ 1__ ] [ 3_ 5_ ] - - | [ 3_ 6__ 1__ ] [ 5_ 6_ ] - - |
[ 1__ 2__ ] [ 3__ 5__ ] [ 6__ 5__ ] [ 3__ 2__ ] | [ 5_ 6__ 1''__ ] [ 3_ 2_ ] - - |
( 5 3 ) 2 1 | ( 6 5 ) ( 3 2 ) |
( 5 3 ) ( 2 1 ) | ( [ 1_ 2_ ] ) ( [ 3_ 5_ ] ) 6 - |
#4 5 b7 6 | #1'' 2'' b3'' 1'' | #5 - b6 - | 5 - - - |
3^ - - - | 5; 5; 3; 3; | 6> 5> 3> 2> | tr5 - - - |
1T 2T 3T 5T | ( 5 3 ) 2T - | 6,T - 5,T - | [ 1,_ 6,_ ] 5,T - - |
T:single [ 1_ 2_ 3_ 5_ ] - - | T:double [ 3_ 5_ 3_ 5_ ] - - |
orn:vibrato 6 - - - | orn:slide-up 5 - - - |
0 - 5 6 | 1'' 0 0 5 | 0 0 5 6 | 0 0 0 0 |
5 ~ 5 - - | 3 - 2 - | 1 2 3 - | 5 - - - |
5 3 - - V | 2 - - - V | ( 5 3 ) 2T - V | 1 - - - ||', 'All features: notes, octaves, eighth/sixteenth/mixed beams, slurs, accidentals, articulations, tonguing, breath marks, annotations, ornaments, rests, ties, holds, double bar.', NULL, NULL, 'Test', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-1-song-1', 1, '玛丽有只小羊羔', NULL, 'Mary Had a Little Lamb', 'D', '4/4', NULL, '3 2 1 2 | 3 3 3 - V | 2 2 2 - | 3 5 5 - V |
3 2 1 2 | 3 3 3 3 | 2 2 3 2 | 1 - - - ||', 'Uses only notes 1-5. Perfect first song.', NULL, NULL, NULL, 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-1-song-2', 1, NULL, NULL, 'Hot Cross Buns', 'D', '4/4', NULL, '3 2 1 - V | 3 2 1 - V | 1 1 2 2 | 3 2 1 - ||', 'Very simple, only 3 notes (1, 2, 3).', NULL, NULL, NULL, 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-1-song-3', 1, NULL, NULL, 'Lightly Row', 'D', '4/4', NULL, '5 3 3 - | 4 2 2 - | 1 2 3 4 | 5 5 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 3 - - - V |
2 2 2 2 | 2 3 4 - | 3 3 3 3 | 3 4 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 1 - - - ||', 'A classic beginner melody using notes 1-5.', NULL, NULL, NULL, 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-1-song-4', 1, '找朋友', NULL, 'Finding Friends', 'D', '2/4', NULL, '1 1 | 1 3 | 5 5 | 5 3 V |
4 2 | 3 1 | 2 - | 2 - V |
1 1 | 1 3 | 5 5 | 5 3 V |
4 2 | 3 1 | 2 1 | 1 - ||', 'A well-known Chinese children''s song.', NULL, NULL, 'Chinese children''s song', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-1-song-5', 1, '上学歌', NULL, 'Going to School Song', 'D', '2/4', NULL, '1 2 | 3 1 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - V |
3 4 | 5 5 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - ||', 'Another Chinese children''s classic using notes 1-5.', NULL, NULL, 'Chinese children''s song', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-1', 2, '小星星', NULL, 'Twinkle Twinkle Little Star', 'D', '4/4', NULL, '1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - V |
5 5 4 4 | 3 3 2 - V | 5 5 4 4 | 3 3 2 - V |
1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - ||', 'The perfect Level 2 starter. Uses notes 1-6.', NULL, NULL, NULL, 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-2', 2, '小白菜', NULL, 'Little White Cabbage', 'D', '3/4', 69, '( 5T 3 ) 3T | 2T - - V | ( 5 3 ) ( [ 3_ 2_ ] ) | 1T - - V | ( 1T 3 ) 2T |
6,T - - V | 2T 1T ( [ 1_T 6,_ ] ) | 5,T - - V | 2T 2T 3T | 2T - - V |
( 5T 3 ) ( [ 3_T 2_ ] ) | 1T - - V | ( 1T 3 ) 2T  | 6,T - - V | ( 2T 1T ) ( [ 1_ 6,_ ] ) |
5,T - - V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T 2T ( [ 1_ 6,_ ] ) | 5,T - - ||', 'A sorrowful Chinese folk song. Pentatonic — uses only 1, 2, 3, 5, 6.', NULL, NULL, 'Hebei folk song', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-3', 2, '世上只有妈妈好', NULL, 'Only Mama is Good', 'C', '4/4', NULL, '( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 5 ) ( 6 5 ) | 6 - - 0 V |
( 3 2 ) ( 1 2 ) | 3 - - 0 V | ( 5 3 ) ( 2 1 ) | 2 - - 0 V |
( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - |
( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - | ( 5 3 ) ( 2 1 ) | 6, - - - ||', 'One of the most beloved Chinese songs. From the 1960 film "Mom Loves Me Once More."', NULL, NULL, 'Chinese film song (1960)', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-4', 2, '两只老虎', NULL, 'Two Tigers', 'D', '4/4', NULL, '||: 1 2 3 1 | 1 2 3 1 V | 3 4 5 - | 3 4 5 - V |
[ 5_ 6_ ] [ 5_ 4_ ] | 3 - 1 - | [ 5_ 6_ ] [ 5_ 4_ ] | 3 - 1 - V |
1 5, 1 - | 1 5, 1 - :||', 'A well-known children''s song (Frère Jacques). Great for rhythmic confidence.', NULL, NULL, NULL, 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-5', 2, '欢乐颂', NULL, 'Ode to Joy', 'D', '4/4', NULL, '( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 3 - 2 - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - V |
2 2 3 1 | 2 [ 3_ 4_ ] 3 1 | 2 [ 3_ 4_ ] 3 2 | 1 2 5, - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - ||', 'Beethoven. Uses stepwise motion. Good for smooth finger transitions.', NULL, NULL, 'Beethoven', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-6', 2, '新年好', NULL, 'Happy New Year', 'D', '3/4', NULL, '1 1 1 | 5 - - V | 3 3 3 | 1 - - V |
1 3 5 | 5 4 3 | 2 - - V | 2 3 4 |
4 3 2 | 3 - - V | 1 3 2 | 5, - - V |
1 3 2 | 5, - - V | 1 2 3 | 1 - - ||', 'Simple and festive. In 3/4 time.', NULL, NULL, 'Chinese traditional', 5);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-7', 2, '月亮代表我的心', NULL, 'The Moon Represents My Heart', 'D', '4/4', 72, '( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 5 - | ( 6 5 ) 3 - | ( 2 2 ) 1 - | 1 - - - V |
( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 3 - | ( 2 3 ) 2 - | ( 1 1 ) 1 - | 1 - - - V |
3 - 5 - | 6 - 1'' - | ( 6 - ) ( 5 - ) | 5 - - - V |
3 - 5 - | 6 - 1'' - | ( 6 - ) ( 5 - ) | 5 - - - V |
( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 3 - | ( 2 3 ) 2 - | ( 1 1 ) 1 - | 1 - - - ||', 'Teresa Teng (1977). One of the most beloved Chinese songs worldwide.', NULL, NULL, 'Teresa Teng, 1977', 6);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-8', 2, '甜蜜蜜', 'Điềm Mật Mật', 'Sweet Honey', 'D', '4/4', 96, '( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1'' - ( 6 5 ) | ( 3 3 ) ( 2 1 ) | 2 - - - V |
( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1'' - ( 6 5 ) | ( 3 2 ) ( 1 2 ) | 1 - - - V |

5, 1 2 3 | ( 2 1 ) ( 2 3 ) | 5, 1 2 3 | 2 - - - V |
5, 1 2 3 | ( 5 6 ) ( 5 3 ) | ( 2 1 ) ( 2 3 ) | 2 - - - V |

( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1'' - ( 6 5 ) | ( 3 2 ) ( 1 2 ) | 1 - - - ||', 'Teresa Teng, 1979. Cheerful and instantly recognizable. Complete with verse 2.', NULL, NULL, 'Teresa Teng, 1979', 7);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-9', 2, NULL, 'Cháu Lên Ba', 'Turning Three', 'C', '2/4', 100, '[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 5_ 3_ ] | 2 - V |
[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 2_ 1_ ] | 5, - V |
[ 6,_ 6,_ ] [ 1_ 6,_ ] | [ 5,_ 5,_ ] [ 3,_ 5,_ ] | [ 6,_ 6,_ ] [ 1_ 2_ ] | 1 - V |
[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 2_ 1_ ] | 5, - ||', 'A beloved Vietnamese children''s song. Simple melody, single octave.', NULL, NULL, 'Vietnamese children''s song', 8);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-10', 2, NULL, 'Đàn Gà Trong Sân', 'Chickens in the Yard', 'C', '2/4', 110, '[ 1_ 1_ ] [ 3_ 3_ ] | [ 5_ 5_ ] [ 3_ -_ ] V | [ 4_ 4_ ] [ 2_ 2_ ] | [ 3_ 3_ ] [ 1_ -_ ] V |
[ 5_ 5_ ] [ 3_ 3_ ] | [ 2_ 2_ ] [ 1_ -_ ] V | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 1_ -_ ] V |
[ 1_ 1_ ] [ 3_ 3_ ] | [ 5_ 5_ ] [ 3_ -_ ] V | [ 4_ 4_ ] [ 2_ 2_ ] | [ 3_ 3_ ] [ 1_ -_ ] ||', 'Playful children''s song with simple repeating patterns. Every Vietnamese person knows this song.', NULL, NULL, 'Vietnamese children''s song', 9);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-2-song-11', 2, NULL, 'Chú Voi Con Ở Bản Đôn', 'Baby Elephant', 'C', '2/4', 100, '[ 5_ 5_ ] [ 3_ 5_ ] | 6 - 5 - V | [ 3_ 3_ ] [ 1_ 3_ ] | 5 - 3 - V |
[ 2_ 2_ ] [ 3_ 2_ ] | 1 - 6, - V | [ 1_ 2_ ] [ 3_ 5_ ] | 3 - 1 - V |
[ 5_ 5_ ] [ 3_ 5_ ] | 6 - 5 - V | [ 3_ 3_ ] [ 1_ 3_ ] | 5 - 3 - V |
[ 2_ 3_ ] [ 2_ 1_ ] | 6, - 1 - V | [ 2_ 3_ ] [ 2_ 1_ ] | 1 - - - ||', 'By Phạm Tuyên. A happy, bouncy melody beloved by Vietnamese children.', NULL, NULL, 'Phạm Tuyên, Vietnamese', 10);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-1', 3, '茉莉花', NULL, 'Jasmine Flower', 'D', '2/4', 72, '3 3 | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) | 5 - V | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) |
5 - V | ( 5 3 ) | ( [ 5_ 6_ ] [ 5_ 3_ ] ) | 2 - V |
[ 1_ 6,_ ] | ( [ 5,_ 6,_ ] 1 ) - V | ( 2 3 ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) |
( 6, 1 ) | 2 - V | ( 3 5 ) | ( [ 3_ 2_ ] [ 1_ 2_ ] ) |
3 - V | ( 5 3 ) | ( [ 2_ 3_ ] [ 5_ 3_ ] ) | 2 - V |
[ 1_ 6,_ ] | ( 1 5, ) | 6, - ||', 'The most famous Chinese folk song. Pentatonic, lyrical, beautiful. Jiangsu version.', NULL, NULL, 'Jiangsu folk song', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-2', 3, '康定情歌', NULL, 'Kangding Love Song', 'G', '2/4', 108, '5 5 | ( 6 5 ) | ( 3 5 ) | [ 6_ 1''_ ] | 5 - V |
( 3 2 ) | ( 3 5 ) - V | ( 2 1 ) | ( 6, 1 ) | 2 - V |
5 5 | ( 6 5 ) | ( 3 5 ) | [ 6_ 1''_ ] | 5 - V |
( 3 2 ) | [ 1_ 6,_ ] | 5, - - ||', 'A famous Sichuan folk song about love. Lively and joyful.', NULL, NULL, 'Sichuan folk song', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-3', 3, '南泥湾', NULL, 'Nanniwan', 'D', '2/4', 100, '[ 0_ 5_ ] 3 | ( 5 6 ) | [ 1''_ 6_ ] | 5 - V | [ 0_ 5_ ] 3 | ( 5 6 ) | 5 - V |
( 3 5 ) | ( 6 5 ) | ( 3 2 ) | 1 - V | ( 6, 1 ) | ( 2 3 ) | 2 - V |
[ 0_ 5_ ] 3 | ( 5 6 ) | [ 1''_ 6_ ] | 5 - V | [ 0_ 5_ ] 3 | ( 5 6 ) | 5 - V |
( 3 2 ) | [ 1_ 6,_ ] | [ 5,_ 6,_ ] | 1 - - ||', 'A patriotic folk song from the 1940s. Warm and uplifting melody.', NULL, NULL, 'Chinese patriotic song, 1940s', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-4', 3, NULL, NULL, 'Scarborough Fair', 'D', '3/4', 80, '6, - 6, | 3 - 2 | 3 - 1 | 6, - - V |
0 - 6, | 5 - 6 | 3 - - | 3 - - V |
0 - 6 | ( 6 - ) ( 5 ) | ( 3 - ) ( 2 ) | ( 3 - ) ( 1 ) |
( 6, - ) ( 1 ) | ( 2 - ) ( 1 ) | 6, - - | 6, - - ||', 'An English folk ballad that sounds gorgeous on dizi. In 3/4 time.', NULL, NULL, 'English folk ballad', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-5', 3, '送别', NULL, 'Farewell', 'D', '4/4', 72, '( 5 3 5 ) | 1'' - - V | ( [ 6_ 1''_ ] 6 ) | 5 - - V |
( [ 5_ 6,_ ] 1 ) | ( 2 - 1 ) | 2 - - | 0 - - V |
( 5 3 5 ) | ( 1'' - 7 ) | ( [ 6_ 1''_ ] 6 ) | 5 - - V |
( 5 2 3 ) | 1 - - | 1 - - | 0 - - ||', 'Based on "Dreaming of Home and Mother" by J.P. Ordway. One of China''s most cherished songs.', NULL, NULL, 'Li Shutong / J.P. Ordway', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-6', 3, '小燕子', NULL, 'Little Swallow', 'D', '2/4', NULL, '( 3 5 ) | 5 - V | ( 3 5 ) | 1'' - V |
( 6 1'' ) | ( 6 5 ) | ( 3 1 ) | 2 - V |
( 2 3 ) | ( 4 3 ) | 2 - V | ( 5 3 ) |
( 4 2 ) | 1 - ||', 'A classic Chinese children''s song from the 1950s film. Very singable melody.', NULL, NULL, 'Chinese film song, 1950s', 5);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-7', 3, '彝族舞曲', NULL, 'Yi Dance (Simplified)', 'D', '3/4', NULL, '( 3 2 1 ) | 6, - - V | ( 1 2 3 ) | 2 - - V |
( 3 5 6 ) | ( 5 3 2 ) | [ 1_ 6,_ ] 1 | 2 - - V |
( 3 2 1 ) | ( 6, - 5, ) | ( 6, 1 2 ) | 1 - - ||', 'A simplified version of a Yi ethnic minority melody. Great introduction to ethnic Chinese music.', NULL, NULL, 'Yi ethnic minority melody', 6);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-8', 3, '但愿人长久', 'Đản Nguyện Nhân Trường Cửu', 'Wishing We Last Forever', 'D', '4/4', 66, '0 0 0 3 | 5 - [ 6_ 5_ ] | 3 - [ 2_ 1_ ] | 2 - - - V |
0 0 0 1 | 2 - [ 3_ 5_ ] | 5 - [ 3_ 2_ ] | 3 - - - V |
0 0 0 3 | 5 - [ 6_ 5_ ] | 3 - [ 2_ 1_ ] | 2 - - - V |
0 0 0 5 | 6 - [ 1''_ 6_ ] | 5 - [ 3_ 5_ ] | 6 - - - V |
1'' - ( [ 6_ 5_ ] ) | 6 - ( [ 5_ 3_ ] ) | 2 - ( [ 3_ 2_ ] ) | 1 - - - V |
0 0 0 3 | 5 - [ 6_ 5_ ] | 3 - [ 2_ 1_ ] | 2 - - - V |
0 0 0 5 | 3 - [ 2_ 1_ ] | 6, - [ 1_ 2_ ] | 1 - - - ||', 'Based on Su Shi''s Song dynasty poem. Teresa Teng''s 1983 recording made it immortal.', NULL, NULL, 'Teresa Teng, 1983 / Su Shi poem', 7);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-9', 3, '故乡的原风景', 'Cố Hương Đích Nguyên Phong Cảnh', 'Original Scenery of Hometown', 'D', '4/4', 66, '3 - ( [ 5_ 6_ ] ) | 5 - - - V | 3 - ( [ 2_ 3_ ] ) | 2 - - - V |
6, - ( [ 1_ 2_ ] ) | 1 - - - V | 6, - ( [ 5,_ 6,_ ] ) | 1 - - - V |
3 - ( [ 5_ 6_ ] ) | 5 - - - V | 3 - ( [ 2_ 3_ ] ) | 5 - - - V |
6 - ( [ 5_ 3_ ] ) | 2 - - - V | 1 - ( [ 6,_ 1_ ] ) | 2 - - - V |
3 - ( [ 5_ 6_ ] ) | 5 - - - V | 3 - ( [ 2_ 3_ ] ) | 2 - - - V |
6, - ( [ 1_ 2_ ] ) | 1 - - - V | 6, - ( [ 5,_ 6,_ ] ) | 1 - - - ||', 'By Muneyuki Sou. Extremely popular among Vietnamese sáo trúc players. Pentatonic, gentle, melancholic.', NULL, NULL, 'Muneyuki Sou (Japanese ocarina)', 8);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-10', 3, '渡情', 'Độ Tình', 'Crossing Love', 'D', '2/4', 108, '( 3 5 ) | ( 6 5 ) | ( 3 2 ) | 1 - V |
( 6, 1 ) | ( 2 3 ) | ( 5 3 ) | 2 - V |
( 2 3 ) | ( 5 6 ) | ( 5 3 ) | ( 2 1 ) |
( 6, 1 ) | ( 2 1 ) | [ 6,_ 5,_ ] | 6, - V |
( 3 5 ) | ( 6 5 ) | ( 3 2 ) | 1 - V |
( 6, 1 ) | ( 2 3 ) | ( 2 1 ) | 6, - ||', 'Opening theme of "New Legend of White Snake" (1992). Joyful, lively.', NULL, NULL, 'New Legend of White Snake TV (1992)', 9);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-11', 3, NULL, 'Cò Lả', 'The Stork Song', 'C', '2/4', 90, '( [ 2_ 2_ ] [ 3_ 2_ ] ) | 1 - 6, - V | ( [ 1_ 2_ ] [ 3_ 5_ ] ) | 3 - 2 - V |
( [ 6,_ 1_ ] [ 2_ 3_ ] ) | 2 - 1 - V | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | 6, - - - V |
( [ 2_ 2_ ] [ 3_ 2_ ] ) | 1 - 6, - V | ( [ 1_ 2_ ] [ 3_ 5_ ] ) | 3 - 2 - V |
( [ 6,_ 1_ ] [ 2_ 1_ ] ) | 6, - 5, - | 6, - - - | 0 - - - ||', 'Northern Vietnamese folk song (dân ca Bắc Bộ). An iconic pentatonic melody.', NULL, NULL, 'Northern Vietnamese folk song', 10);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-12', 3, NULL, 'Bèo Dạt Mây Trôi', 'Duckweed Drifts, Clouds Float', 'C', '4/4', 72, '( [ 1_ 1_ ] [ 5_ 4_ ] ) | ( [ 6_ 5_ ] ) 5 - V | ( [ 3_ 3_ ] [ 3_ 5_ ] ) | 1 - - - V |
( [ 5_ 3_ ] [ 5_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | ( [ 1_ 6,_ ] [ 1_ 2_ ] ) | 1 - - - V |
( [ 1_ 1_ ] [ 5_ 4_ ] ) | ( [ 6_ 5_ ] ) 5 - V | ( [ 3_ 3_ ] [ 3_ 5_ ] ) | 1 - - - V |
( [ 5_ 3_ ] [ 2_ 1_ ] ) | 6, - 5, - V | ( [ 6,_ 1_ ] [ 2_ 1_ ] ) | 6, - - - ||', 'Quan họ Bắc Ninh folk song. UNESCO Intangible Cultural Heritage. Hauntingly lyrical.', NULL, NULL, 'Quan họ Bắc Ninh folk song', 11);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-13', 3, NULL, 'Lý Cây Đa', 'The Banyan Tree Song', 'C', '2/4', 110, '( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 2_ 3_ ] ) 5 - V | ( [ 6_ 5_ ] [ 3_ 2_ ] ) | 1 - 6, - V |
( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 5_ ] ) 3 - V | ( [ 2_ 1_ ] [ 6,_ 1_ ] ) | 2 - - - V |
( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 2_ 3_ ] ) 5 - V | ( [ 6_ 5_ ] [ 3_ 2_ ] ) | 1 - 6, - V |
( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 1_ 6,_ ] ) 5, - | 6, - - - | 0 - - - ||', 'Northern Vietnamese folk song. Lively, cheerful, widely known.', NULL, NULL, 'Northern Vietnamese folk song', 12);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-3-song-14', 3, NULL, 'Trống Cơm', 'Rice Drum Song', 'D', '2/4', 120, '( [ 5_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] ) 1 - V | ( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] ) 2 - V |
( [ 1_ 2_ ] [ 3_ 5_ ] ) | ( [ 6_ 5_ ] ) 3 - V | ( [ 2_ 1_ ] [ 6,_ 1_ ] ) | 2 - - - V |
( [ 5_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] ) 1 - V | ( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] ) 2 - V |
( [ 1_ 6,_ ] [ 5,_ 6,_ ] ) | ( [ 1_ 2_ ] ) 1 - | 6, - - - | 0 - - - ||', 'Traditional Vietnamese folk song. Fast and cheerful. Great for developing articulation.', NULL, NULL, 'Vietnamese traditional folk song', 13);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-1', 4, '龙的传人', NULL, 'Descendants of the Dragon', 'G', '4/4', 96, '0 0 [ 3_ 5_ ] | 6 - 6 6 | ( [ 5_ 6_ ] [ 5_ 3_ ] ) | 2 - 0 0 V |
0 0 [ 3_ 2_ ] | 1 - 1 1 | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | 3, - 0 0 V |
0 0 [ 3_ 5_ ] | 6 - 6 6 | ( [ 5_ 6_ ] [ 5_ 3_ ] ) | 2 - 0 0 V |
0 0 [ 3_ 2_ ] | 1 - 1 1 | ( [ 6,_ 1_ ] ) 2 - | 1 - 0 0 V |
6 - 1'' - | ( [ 6_ 5_ ] [ 3_ 5_ ] ) | 6 - - - | 0 0 0 0 V |
6 - 1'' - | ( [ 6_ 5_ ] [ 3_ 2_ ] ) | 1 - - - | 0 0 0 0 ||', 'A powerful anthem by Hou Dejian (1978). Stately and emotional.', NULL, NULL, 'Hou Dejian, 1978', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-2', 4, '女儿情', NULL, 'Daughter''s Love', 'D', '4/4', 72, '0 0 ( [ 5_ 6,_ ] ) | ( [ 1_ 1_ ] [ 6,_ 1_ ] ) | 2 - - 0 V |
0 0 ( [ 1_ 2_ ] ) | ( [ 3_ 3_ ] [ 2_ 3_ ] ) | 5 - - 0 V |
( [ 5_ 5_ ] [ 3_ 5_ ] ) | ( [ 6_ 6_ ] [ 5_ 6_ ] ) | 1'' - ( [ 6_ 5_ ] ) |
6 - - 0 V | ( [ 3_ 3_ ] [ 2_ 3_ ] ) | ( [ 5_ 5_ ] [ 3_ 2_ ] ) |
( [ 1_ 1_ ] [ 6,_ 5,_ ] ) | 6, - - 0 V |
0 0 ( [ 5,_ 6,_ ] ) | ( [ 1_ 1_ ] [ 6,_ 1_ ] ) | 2 - - 0 V |
( [ 2_ 2_ ] [ 3_ 5_ ] ) | ( [ 6_ 5_ ] [ 3_ 2_ ] ) | 1 - - - ||', 'From the 1986 TV series "Journey to the West." Tender and expressive.', NULL, NULL, 'Journey to the West TV (1986)', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-3', 4, '彩云追月', NULL, 'Colorful Clouds Chasing the Moon', 'D', '4/4', 66, '0 0 ( [ 5_ 6_ ] ) | ( [ 1''_ 6_ ] [ 5_ 6_ ] ) | 1'' - ( [ 6_ 5_ ] ) | 3 - - 0 V |
0 0 ( [ 3_ 5_ ] ) | ( [ 6_ 5_ ] [ 3_ 5_ ] ) | 6 - ( [ 5_ 3_ ] ) | 2 - - 0 V |
0 0 ( [ 2_ 3_ ] ) | ( [ 5_ 3_ ] [ 2_ 3_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 1_ ] ) |
2 - ( [ 1_ 6,_ ] ) | 5, - - - V | 0 0 ( [ 5_ 6_ ] ) | ( [ 1''_ 6_ ] [ 5_ 3_ ] ) |
5 - ( [ 6_ 5_ ] ) | 3 - ( [ 2_ 1_ ] ) | 6, - ( [ 1_ 2_ ] ) | 1 - - - ||', 'A famous Cantonese music piece by Ren Guang (1935). Elegant and dreamy.', NULL, NULL, 'Ren Guang, 1935 (Cantonese)', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-4', 4, '牧羊曲', NULL, 'Shepherd''s Song', 'D', '4/4', 76, '0 0 0 3 | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) | 5 - - 3 | ( [ 5_ 3_ ] [ 2_ 3_ ] ) |
1 - - 0 V | 0 0 0 1 | ( [ 2_ 3_ ] [ 5_ 3_ ] ) | 2 - - 6, |
( [ 1_ 6,_ ] [ 5,_ 6,_ ] ) | 1 - - 0 V | 0 0 0 3 | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) |
5 - - 3 | ( [ 5_ 3_ ] [ 2_ 3_ ] ) | 5 - - 0 V | ( [ 5_ 5_ ] [ 3_ 5_ ] ) |
6 - - 5 | ( [ 3_ 5_ ] [ 2_ 3_ ] ) | 1 - - - | 0 0 0 0 ||', 'From the 1982 film "Shaolin Temple." Pastoral, peaceful melody.', NULL, NULL, 'Shaolin Temple film (1982)', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-5', 4, '天路', NULL, 'Road to Heaven', 'D', '4/4', 96, '0 0 ( [ 1_ 2_ ] ) | 3 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 1_ ] ) | 2 - - 0 V |
0 0 ( [ 2_ 3_ ] ) | 5 - ( [ 5_ 3_ ] ) | 2 - ( [ 1_ 2_ ] ) | 3 - - 0 V |
0 0 ( [ 3_ 5_ ] ) | 6 - ( [ 6_ 5_ ] ) | 3 - ( [ 2_ 3_ ] ) | 5 - - 0 V |
( [ 6_ 5_ ] [ 3_ 5_ ] ) | 6 - ( [ 1''_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - - - ||', 'A Tibetan-influenced melody by Qu Yuan (2001). Sweeping and majestic.', NULL, NULL, 'Qu Yuan, 2001', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-6', 4, '沧海一声笑', NULL, 'Laughing Across the Ocean', 'D', '4/4', 132, '5 - - - | 3 - - - | 2 - - - | 1 - 6, - V |
5, - - - | 0 0 0 0 V | 5 - - - | 3 - - - |
2 - - - | 1 - 6, - V | 5, - - - | 0 0 0 0 V |
( [ 5,_ 6,_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 6,_ ] ) | 5, - - - | 0 0 0 0 V |
( [ 5,_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 3,_ 5,_ ] ) | 6, - - - | 0 0 0 0 ||', 'Theme from "Swordsman" film series. Bold, free-spirited, and heroic.', NULL, NULL, 'Swordsman film series', 5);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-7', 4, '一剪梅', 'Nhất Tiễn Mai', 'A Spray of Plum Blossom', 'D', '4/4', 72, '0 0 ( [ 3_ 5_ ] ) | 6 - - 5 | 3 - ( [ 5_ 6_ ] ) | 5 - - - V |
0 0 ( [ 2_ 3_ ] ) | 5 - - 3 | 2 - ( [ 3_ 5_ ] ) | 3 - - - V |
0 0 ( [ 3_ 5_ ] ) | 6 - - 5 | 3 - ( [ 2_ 1_ ] ) | 2 - - - V |
0 0 ( [ 6,_ 1_ ] ) | 2 - - 1 | 6, - ( [ 1_ 2_ ] ) | 1 - - - V |
( [ 3_ 5_ ] ) 6 - | ( [ 1''_ 6_ ] ) 5 - | ( [ 6_ 5_ ] ) 3 - | 5 - - - V |
( [ 3_ 5_ ] ) 6 - | ( [ 1''_ 6_ ] ) 5 - | ( [ 3_ 2_ ] [ 1_ 2_ ] ) | 1 - - - ||', 'From the 1984 TV drama. Went viral in Vietnam ("Xue Hua Piao Piao" meme).', NULL, NULL, 'TV drama (1984)', 6);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-8', 4, '千年等一回', 'Thiên Niên Đẳng Nhất Hồi', 'A Thousand Years of Waiting', 'D', '4/4', 88, '6, - ( [ 1_ 2_ ] ) | 3 - ( [ 2_ 1_ ] ) | 2 - ( [ 3_ 5_ ] ) | 3 - - - V |
6 - ( [ 5_ 3_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 1_ ] ) | 2 - - - V |
6, - ( [ 1_ 2_ ] ) | 3 - ( [ 2_ 1_ ] ) | 2 - ( [ 3_ 5_ ] ) | 6 - - - V |
5 - ( [ 3_ 5_ ] ) | 6 - ( [ 1''_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - - - V |
3 - ( [ 5_ 6_ ] ) | 1'' - ( [ 6_ 5_ ] ) | 6 - ( [ 5_ 3_ ] ) | 2 - - - V |
1 - ( [ 6,_ 1_ ] ) | 2 - ( [ 3_ 2_ ] ) | 1 - - - | 0 - - - ||', 'Main theme of "New Legend of White Snake" (1992). Dramatic and emotional.', NULL, NULL, 'New Legend of White Snake TV (1992)', 7);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-9', 4, '铁血丹心', 'Thiết Huyết Đan Tâm', 'Iron Blood, Loyal Heart', 'D', '4/4', 80, '5, - ( [ 1_ 2_ ] ) | 3 - - 2 | 1 - ( [ 6,_ 1_ ] ) | 2 - - - V |
2 - ( [ 3_ 5_ ] ) | 6 - - 5 | 3 - ( [ 2_ 3_ ] ) | 5 - - - V |
5 - ( [ 6_ 1''_ ] ) | 6 - - 5 | 3 - ( [ 5_ 6_ ] ) | 5 - - - V |
3 - ( [ 2_ 1_ ] ) | 2 - - 3 | 1 - ( [ 6,_ 5,_ ] ) | 6, - - - V |
5, - ( [ 1_ 2_ ] ) | 3 - - 2 | 1 - ( [ 6,_ 1_ ] ) | 2 - - - V |
2 - ( [ 3_ 5_ ] ) | 6 - ( [ 1''_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - - - ||', 'Theme of "Legend of the Condor Heroes" (1983). The definitive wuxia theme.', NULL, NULL, 'Legend of the Condor Heroes TV (1983)', 8);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-10', 4, NULL, 'Diễm Xưa', 'Beauty of the Past', 'C', '4/4', 66, '0 0 0 3 | 2 - ( [ 1_ 6,_ ] ) | 5, - ( [ 6,_ 1_ ] ) | 2 - - - V |
0 0 0 1 | 6, - ( [ 5,_ 3,_ ] ) | 5, - ( [ 6,_ 5,_ ] ) | 3, - - - V |
0 0 0 3 | 2 - ( [ 1_ 6,_ ] ) | 5, - ( [ 6,_ 1_ ] ) | 2 - - - V |
3 - ( [ 5_ 3_ ] ) | 2 - ( [ 1_ 2_ ] ) | 3 - ( [ 2_ 1_ ] ) | 6, - - - V |
5, - ( [ 6,_ 1_ ] ) | 2 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 5,_ ] ) | 6, - - - ||', 'By Trịnh Công Sơn (1965). THE quintessential nhạc Trịnh piece for sáo trúc.', NULL, NULL, 'Trịnh Công Sơn, 1965', 9);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-11', 4, NULL, 'Biển Nhớ', 'Remembering the Sea', 'G', '4/4', 60, '0 0 ( [ 6,_ 1_ ] ) | 2 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 1_ ] ) | 2 - - - V |
3 - ( [ 5_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - ( [ 2_ 1_ ] ) | 6, - - - V |
0 0 ( [ 6,_ 1_ ] ) | 2 - ( [ 3_ 5_ ] ) | 6 - ( [ 5_ 3_ ] ) | 5 - - - V |
3 - ( [ 2_ 1_ ] ) | 6, - ( [ 1_ 6,_ ] ) | 5, - ( [ 6,_ 5,_ ] ) | 3, - - - V |
5, - ( [ 6,_ 1_ ] ) | 2 - ( [ 3_ 2_ ] ) | 1 - ( [ 6,_ 5,_ ] ) | 6, - - - ||', 'By Trịnh Công Sơn. Deep, emotional, spanning two octaves.', NULL, NULL, 'Trịnh Công Sơn', 10);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-12', 4, NULL, 'Lý Kéo Chài', 'Hauling the Net', 'C', '2/4', 108, '( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] ) 2 - V | ( [ 3_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] ) 1 - V |
( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 5_ 3_ ] ) 2 - V | ( [ 1_ 6,_ ] [ 5,_ 6,_ ] ) | 1 - - - V |
( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] ) 2 - V | ( [ 3_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] ) 1 - V |
( [ 6,_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] ) 6, - | 1 - - - | 0 - - - ||', 'Southern Vietnamese folk song (dân ca Nam Bộ). Energetic fishing song from the Mekong Delta.', NULL, NULL, 'Southern Vietnamese folk song', 11);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-4-song-13', 4, NULL, 'Nối Vòng Tay Lớn', 'Join Hands in a Great Circle', 'C', '4/4', 96, '5 - ( [ 5_ 6_ ] ) | 5 - ( [ 3_ 2_ ] ) | 1 - ( [ 1_ 2_ ] ) | 3 - - - V |
5 - ( [ 5_ 6_ ] ) | 5 - ( [ 3_ 5_ ] ) | 6 - ( [ 5_ 3_ ] ) | 2 - - - V |
1 - ( [ 2_ 3_ ] ) | 5 - ( [ 6_ 5_ ] ) | 3 - ( [ 2_ 1_ ] ) | 2 - - - V |
3 - ( [ 5_ 6_ ] ) | 1'' - ( [ 6_ 5_ ] ) | 3 - ( [ 2_ 1_ ] ) | 1 - - - ||', 'By Trịnh Công Sơn — the unity anthem of Vietnam. Uplifting, powerful.', NULL, NULL, 'Trịnh Công Sơn', 12);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-1', 5, '姑苏行', NULL, 'A Walk in Gusu', 'D', '4/4', 60, '0 0 0 ( 5, 6, ) | ( 1 2 3 5 3 ) | 2 - - ( 1 2 ) |
( 3 5 6 1'' 6 ) | 5 - - ( 3 5 ) |
( 6 5 3 2 ) | ( 1 - 6, 5, ) | 6, - - - V ||

( 6, 1 2 3 ) | 5 - ( 3 2 ) | 1 - - 6, | 5, - - 0 V |
( 6, 1 2 3 ) | 5 - ( 6 5 ) | 3 - ( 2 1 ) | 2 - - 0 V |
( 3 5 6 1'' ) | 6 - ( 5 3 ) | 5 - ( 3 2 ) | 1 - - 0 V |
( 6, 1 2 3 ) | 2 - ( 1 6, ) | 5, - - - | 0 0 0 0 V ||

( 6, 1 ) | ( 2 3 ) | ( 5 3 ) | ( 2 1 ) |
( 6, 1 ) | ( 2 3 ) | ( 5 6 ) | ( 5 3 ) |
( 2 3 ) | ( 5 6 ) | ( 1'' 6 ) | ( 5 3 ) |
( 2 1 ) | ( 6, 5, ) | ( 6, 1 ) | 2 - ||', 'THE milestone piece. Grade 5, southern style masterpiece by Jiang Xianwei (1962).', NULL, NULL, 'Jiang Xianwei, 1962', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-2', 5, '小放牛', NULL, 'Little Cowherd', 'D', '2/4', 120, '( 5 6 ) | ( [ 1''_ 6_ ] [ 5_ 3_ ] ) | 5 - V | ( [ 3_ 2_ ] [ 1_ 2_ ] ) |
3 - V | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | 6, - V |
( 5, 6, ) | ( [ 1_ 2_ ] [ 3_ 5_ ] ) | ( [ 3_ 2_ ] [ 1_ 6,_ ] ) | 5, - V |
( 6, 1 ) | ( [ 2_ 3_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) | 6, - ||', 'Grade 3-4, northern style. Playful and lively, based on a Hebei folk melody.', NULL, NULL, 'Hebei folk melody', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-3', 5, '牧笛', NULL, 'Shepherd''s Flute', 'D', '4/4', 66, '0 0 ( 5, 6, ) | ( 1 - 2 3 ) | ( 5 3 ) 2 - | ( 1 2 3 5 ) |
6 - - 5 | ( 3 2 1 6, ) | 5, - - - V | 0 0 ( 5, 6, ) |
( 1 - 6, 1 ) | ( 2 3 5 3 ) | 2 - ( 1 2 ) | ( 3 5 ) 6 - |
( 5 3 2 1 ) | ( 6, 5, 6, 1 ) | 2 - ( 1 6, ) | 5, - - - ||', 'A lyrical piece by Liu Zhi (1958). Tests tone quality and breath control.', NULL, NULL, 'Liu Zhi, 1958', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-4', 5, '喜相逢', NULL, 'Happy Reunion', 'D', '4/4', 52, '( 5, - 6, 1 ) | ( 2 - 1 6, ) | 5, - - - V | ( 6, - 1 2 ) |
( 3 - 2 1 ) | ( 6, 5, ) 6, - | 5, - - - V | ( 1 - 2 3 ) |
( 5 - 3 2 ) | ( 1 - 6, 5, ) | ( 6, 1 ) 2 - | 1 - - - V ||

( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 5_ ] [ 6_ 5_ ] ) |
( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 5_ ] [ 3_ 2_ ] ) | ( [ 1_ 6,_ ] ) 5, - ||', 'Grade 4-5, northern style by Feng Zicun. Depicts joy of friends reuniting.', NULL, NULL, 'Feng Zicun (Inner Mongolian folk melody)', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-5', 5, '扬鞭催马运粮忙', NULL, 'Whipping the Horse to Transport Grain', 'D', '2/4', 144, '5T 5T | ( [ 6_ 5_ ] [ 3_ 2_ ] ) | 1T 1T | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) V |
6,T 6,T | ( [ 1_ 6,_ ] [ 5,_ 3,_ ] ) | 5, - V | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) |
3T 3T | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | 6, - V | ( [ 1_ 2_ ] [ 3_ 5_ ] ) |
6T 6T | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( 6, 5, ) | 6, - ||', 'Energetic northern piece depicting the busy harvest season. Grade 4-5.', NULL, NULL, 'Northern Chinese', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-6', 5, '中花六板', NULL, 'Zhonghua Liuban', 'D', '4/4', 60, '( 5 - 6 5 ) | ( 3 - 2 1 ) | ( 2 - 3 2 ) | ( 1 - 6, 5, ) V |
( 6, - 1 6, ) | ( 5, - 3, 5, ) | ( 6, - 1 2 ) | 1 - - - V |
( 3 - 5 3 ) | ( 2 - 1 2 ) | ( 3 - 5 6 ) | ( 5 - 3 2 ) V |
( 1 - 6, 1 ) | ( 2 - 1 6, ) | 5, - - - | 0 - - - ||', 'Traditional Jiangnan silk and bamboo ensemble piece. Elegant southern style.', NULL, NULL, 'Jiangnan silk and bamboo (江南丝竹)', 5);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-7', 5, '上海滩', 'Bến Thượng Hải', 'The Bund', 'D', '4/4', 80, '0 0 0 5, | ( 1 - 2 3 ) | ( 2 - 1 6, ) | 1 - - - V |
0 0 0 1 | ( 2 - 3 5 ) | ( 5 - 3 2 ) | 3 - - - V |
0 0 0 3 | ( 5 - 6 1'' ) | ( 6 - 5 6 ) | 5 - - - V |
0 0 ( 5 6 ) | ( 1'' - 6 5 ) | ( 3 - 2 1 ) | 2 - - - V |
0 0 0 5, | ( 1 - 2 3 ) | ( 2 - 1 6, ) | 1 - - - V |
0 0 0 1 | ( 3 - 5 6 ) | ( 5 - 3 2 ) | 1 - - - ||', 'Theme of the Hong Kong TVB drama "The Bund." Sweeping, dramatic melody.', NULL, NULL, 'TVB drama (1980)', 6);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-8', 5, '枉凝眉', 'Uổng Ngưng Mi', 'Vain Knitting of Brows', 'D', '4/4', 56, '0 0 ( 5, 6, ) | ( 1 - 2 3 ) | 2 - - 1 | 6, - - - V |
( 5, - 6, 1 ) | ( 2 - 3 2 ) | 1 - - 6, | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 3 ) | ( 2 - 1 2 ) | 3 - - - V |
( 5 - 6 5 ) | ( 3 - 2 1 ) | ( 6, - 5, 6, ) | 1 - - - V |
( 1 - 2 3 ) | ( 5 - 6 5 ) | ( 3 - 2 1 ) | 2 - - - V |
( 6, - 1 2 ) | ( 1 - 6, 5, ) | 6, - - - | 0 - - - ||', 'From "Dream of the Red Chamber" TV (1987). Hauntingly beautiful.', NULL, NULL, 'Wang Liping, Dream of the Red Chamber TV (1987)', 7);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-9', 5, '琵琶语', 'Tỳ Bà Ngữ', 'Pipa Language', 'D', '4/4', 66, '0 0 ( 3 5 ) | ( 6 - 5 3 ) | ( 2 - 3 2 ) | 1 - - - V |
0 0 ( 1 2 ) | ( 3 - 2 1 ) | ( 6, - 1 6, ) | 5, - - - V |
0 0 ( 5, 6, ) | ( 1 - 2 3 ) | ( 5 - 3 2 ) | 3 - - - V |
( 3 - 5 6 ) | ( 5 - 3 2 ) | ( 1 - 6, 1 ) | 2 - - - V |
0 0 ( 3 5 ) | ( 6 - 1'' 6 ) | ( 5 - 3 5 ) | 6 - - - V |
( 5 - 3 2 ) | ( 1 - 6, 1 ) | ( 2 - 1 6, ) | 5, - - - ||', 'By Lin Hai (2003). Extremely popular among Vietnamese sáo players.', NULL, NULL, 'Lin Hai, 2003', 8);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-10', 5, NULL, 'Hạ Trắng', 'White Summer', 'G', '4/4', 58, '0 0 0 5, | ( 6, - 1 2 ) | ( 3 - 2 1 ) | 6, - - - V |
( 5, - 6, 1 ) | ( 2 - 3 5 ) | ( 3 - 2 1 ) | 2 - - - V |
( 3 - 5 6 ) | ( 5 - 3 2 ) | ( 1 - 6, 1 ) | 2 - - - V |
( 6, - 1 2 ) | ( 1 - 6, 5, ) | 6, - - - | 0 - - - V |
( 3 - 5 6 ) | ( 5 - 3 5 ) | ( 6 - 5 3 ) | 2 - - - V |
( 1 - 2 3 ) | ( 2 - 1 6, ) | ( 5, - 6, 5, ) | 3, - - - ||', 'By Trịnh Công Sơn (1961). A complex, dreamy melody evoking the summers of Huế.', NULL, NULL, 'Trịnh Công Sơn, 1961', 9);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-11', 5, NULL, 'Áo Lụa Hà Đông', 'Silk Dress of Ha Dong', 'C', '4/4', 72, '0 0 0 3 | ( 5 - 6 5 ) | ( 3 - 2 3 ) | 5 - - - V |
( 6 - 5 3 ) | ( 2 - 1 2 ) | ( 3 - 2 1 ) | 6, - - - V |
0 0 0 1 | ( 2 - 3 5 ) | ( 6 - 5 3 ) | 2 - - - V |
( 1 - 2 3 ) | ( 5 - 3 2 ) | ( 1 - 6, 1 ) | 2 - - - V |
( 3 - 5 6 ) | ( 1'' - 6 5 ) | ( 3 - 5 6 ) | 5 - - - V |
( 3 - 2 1 ) | ( 6, - 1 2 ) | 1 - - - | 0 - - - ||', 'By Ngô Thụy Miên. One of the most elegant Vietnamese romantic songs.', NULL, NULL, 'Ngô Thụy Miên, 1971', 10);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-5-song-12', 5, NULL, 'Mùa Thu Cho Em', 'Autumn for You', 'G', '4/4', 66, '0 0 0 3 | ( 5 - 6 5 ) | ( 3 - 2 1 ) | 2 - - - V |
0 0 0 5 | ( 6 - 1'' 6 ) | ( 5 - 3 5 ) | 6 - - - V |
( 5 - 3 2 ) | ( 1 - 6, 1 ) | ( 2 - 3 2 ) | 1 - - - V |
( 6, - 1 2 ) | ( 3 - 5 3 ) | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 6 ) | ( 5 - 3 2 ) | 3 - - - V |
( 2 - 1 6, ) | ( 5, - 6, 1 ) | 6, - - - | 0 - - - ||', 'By Ngô Thụy Miên. A lush romantic ballad. One of the masterpieces of nhạc tiền chiến.', NULL, NULL, 'Ngô Thụy Miên', 11);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-1', 6, '牧民新歌', NULL, 'Herdsman''s New Song', 'D', '4/4', 52, '0 0 0 ( 3 5 ) | 6 - - - ( 5 6 ) | 1'' - - - ( 6 1'' ) |
2'' - - - ( 1'' 6 ) | 5 - - ( 3 5 6 ) | ( 5 3 ) 2 - ( 1 2 ) |
3 - - - - - V ||

( 3 - 5 3 ) | ( 2 - 1 2 ) | ( 3 - 5 6 ) | 5 - - - V |
( 6 - 1'' 6 ) | ( 5 - 3 5 ) | ( 6 - 5 3 ) | 2 - - - V |
( 1 - 2 1 ) | ( 6, - 5, 6, ) | ( 1 - 2 3 ) | 2 - - - V |
( 3 - 5 3 ) | ( 2 - 1 2 ) | ( 3 - 5 6 ) | 5 - - - V ||

( [ 5_ 3_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) |
( [ 5_ 3_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | 2 - V |
( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 6,_ 1_ ] ) 2 - |
( [ 3_ 5_ ] [ 3_ 2_ ] ) | ( [ 1_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 5,_ 3,_ ] ) | 5, - ||', 'Grade 7 masterpiece by Jian Guangyi (1966). The most famous dizi piece.', NULL, NULL, 'Jian Guangyi, 1966', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-2', 6, '春到湘江', NULL, 'Spring Arrives at the Xiang River', 'D', '4/4', 66, '0 0 ( 3 5 6 ) | 1'' - - ( 6 5 ) | ( 6 1'' 2'' 1'' 6 5 ) |
( 3 5 6 5 3 2 ) | ( 1 6, 5, 6, 1 2 ) | 3 - - - - V |

( 6, 1 2 3 ) | 5 - ( 3 2 ) | 1 - ( 6, 1 ) | 2 - - - V |
( 3 5 6 5 ) | ( 3 2 1 2 ) | 3 - ( 2 1 ) | 6, - - - V |
( 5, 6, 1 2 ) | 3 - ( 5 3 ) | 2 - ( 1 6, ) | 5, - - - V |
( 6, 1 2 3 ) | 5 - ( 6 5 ) | 3 - ( 2 1 ) | 2 - - - V |
( 3 5 6 5 ) | ( 3 2 1 6, ) | 5, - ( 6, 1 ) | 6, - - - ||', 'Grade 7-8 by Ning Baosheng (1976). Requires circular breathing for the opening cadenza.', NULL, NULL, 'Ning Baosheng, 1976', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-3', 6, '鹧鹄飞', NULL, 'Partridge Flying', 'D', '4/4', 52, '5 - - 6 | ( 1'' - 6 5 ) | 3 - - 2 | 1 - - - V |
5 - - 6 | ( 1'' - 6 5 ) | 6 - - 5 | 3 - - - V |
2 - - 3 | ( 5 - 3 2 ) | 1 - - 6, | 5, - - - V |
6, - - 1 | ( 2 - 1 6, ) | 5, - - - | 0 - - - V ||

( [ 5_ 3_ ] ) 5 - 6 | ( [ 1''_ 6_ ] ) 1'' - ( [ 6_ 5_ ] ) | ( [ 3_ 5_ ] ) 3 - 2 | ( [ 1_ 2_ ] ) 1 - - V |
( [ 5_ 3_ ] ) 5 - 6 | ( [ 1''_ 6_ ] ) 1'' - ( [ 6_ 5_ ] ) | ( [ 6_ 5_ ] ) 6 - 5 | ( [ 3_ 5_ ] ) 3 - - V |
( [ 2_ 1_ ] ) 2 - 3 | ( [ 5_ 3_ ] ) 5 - ( [ 3_ 2_ ] ) | ( [ 1_ 6,_ ] ) 1 - 6, | ( [ 5,_ 6,_ ] ) 5, - - V |
( [ 6,_ 5,_ ] ) 6, - 1 | ( [ 2_ 1_ ] ) 2 - ( [ 1_ 6,_ ] ) | 5, - - - | 0 - - - ||', 'Grade 6-7. Hunan folk tune depicting partridges in flight. Southern style.', NULL, NULL, 'Zhao Songting arrangement (Hunan folk tune)', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-4', 6, '五梆子', NULL, 'Wu Bangzi (Five Beats)', 'G', '2/4', 132, '( [ 5_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) |
( [ 6,_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 3,_ 5,_ ] ) | 6, - | 0 0 V |
( [ 5_ 6_ ] [ 1''_ 6_ ] ) | ( [ 5_ 3_ ] [ 5_ 6_ ] ) | ( [ 1''_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) |
6, - | 0 0 V ||

( [ 5_ 3_ ] [ 5_ 3_ ] ) | ( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 2_ 1_ ] ) | ( [ 2_ 3_ ] [ 2_ 1_ ] ) |
( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | ( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | 6, - V |
( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) |
( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 3,_ ] [ 5,_ 6,_ ] ) | 1 - | 0 0 ||', 'Classic northern piece. Bright, energetic, uses the bangdi.', NULL, NULL, 'Northern folk melody', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-5', 6, '秋湖月夜', NULL, 'Autumn Lake, Moonlit Night', 'D', '4/4', 48, '0 0 0 5, | ( 6, - - 1 ) | ( 2 - - 3 2 ) | ( 1 - - 6, 5, ) |
6, - - - | 0 0 0 0 V |

( 5, - 6, - ) | ( 1 - 2 1 ) | 6, - - 5, | 6, - - - V |
( 1 - 2 - ) | ( 3 - 5 3 ) | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 - ) | ( 2 - 3 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 1 - 2 3 ) | ( 5 - 3 2 ) | ( 1 - 6, - ) | 5, - - - V |
( 6, - - 1 ) | ( 2 - - 3 ) | ( 2 - 1 6, ) | 5, - - - ||', 'Grade 6 by Yu Xunfa. Atmospheric, introspective. Showcases tone color and dynamics.', NULL, NULL, 'Yu Xunfa', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-6', 6, '凉凉', 'Lương Lương', 'Cold Cold', 'D', '4/4', 72, '0 0 ( 3 5 ) | 6 - - 5 | ( 3 - 2 3 ) | 5 - - - V |
0 0 ( 5 6 ) | 1'' - - 6 | ( 5 - 6 5 ) | 3 - - - V |
0 0 ( 2 3 ) | 5 - - 3 | ( 2 - 1 2 ) | 3 - - - V |
( 5 - 6 1'' ) | ( 6 - 5 3 ) | ( 2 - 3 2 ) | 1 - - - V |
( 1'' - 2'' 1'' ) | ( 6 - 5 6 ) | ( 1'' - 6 5 ) | 6 - - - V |
( 5 - 3 5 ) | ( 6 - 5 3 ) | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 3 ) | ( 2 - 1 2 ) | 1 - - - ||', 'Theme of "Eternal Love" (2017). Hugely popular on Vietnamese sáo channels.', NULL, NULL, 'Eternal Love TV drama (2017)', 5);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-7', 6, '菊花台', 'Cúc Hoa Đài', 'Chrysanthemum Terrace', 'D', '4/4', 76, '0 0 0 3 | ( 5 - 5 6 ) | ( 5 - 3 2 ) | 3 - - - V |
0 0 0 2 | ( 3 - 3 5 ) | ( 3 - 2 1 ) | 2 - - - V |
0 0 0 1 | ( 2 - 2 3 ) | ( 2 - 1 6, ) | 1 - - - V |
0 0 0 6, | ( 1 - 1 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 3 - 5 6 ) | ( 1'' - 6 5 ) | ( 6 - 5 3 ) | 5 - - - V |
( 3 - 5 6 ) | ( 1'' - 6 5 ) | ( 3 - 2 1 ) | 2 - - - V |
( 6, - 1 2 ) | ( 3 - 2 1 ) | ( 6, - 5, 6, ) | 1 - - - ||', 'Jay Chou (2006). The quintessential Chinese-style pop song. Beautiful on dizi.', NULL, NULL, 'Jay Chou, 2006', 6);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-6-song-8', 6, '半壶纱', 'Bán Hồ Sa', 'Half Pot of Gauze', 'D', '4/4', 66, '0 0 ( 5, 6, ) | ( 1 - 2 3 ) | ( 2 - 1 6, ) | 1 - - - V |
0 0 ( 6, 1 ) | ( 2 - 3 5 ) | ( 3 - 2 1 ) | 2 - - - V |
0 0 ( 2 3 ) | ( 5 - 6 5 ) | ( 3 - 2 3 ) | 5 - - - V |
( 6 - 5 3 ) | ( 2 - 1 2 ) | ( 3 - 2 1 ) | 6, - - - V |
( 5, - 6, 1 ) | ( 2 - 3 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 1 - 2 3 ) | ( 5 - 3 2 ) | ( 1 - 6, 1 ) | ( 2 - 1 6, ) |
5, - - - | 0 - - - ||', 'By Liu Ke Yi (2015). Chinese-style meditation music. Extremely popular among Vietnamese sáo players.', NULL, NULL, 'Liu Ke Yi, 2015', 7);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-1', 7, '幽兰逢春', NULL, 'Orchid Meets Spring', 'D', '4/4', 46, '0 0 0 5, | ( 6, - - - 1 2 ) | ( 3 - - 2 1 6, ) | 5, - - - V |
( 6, 1 2 3 ) | ( 5 - - 3 2 ) | ( 1 - - 6, 5, ) | 6, - - - - V |

( 6, - 1 2 ) | ( 3 - 2 1 ) | ( 6, - 5, 6, ) | 1 - - - V |
( 2 - 3 5 ) | ( 6 - 5 3 ) | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 6 ) | ( 5 - 3 2 ) | 3 - - - V |
( 2 - 1 6, ) | ( 5, - 6, 1 ) | 6, - - - | 0 - - - V |
( 5, - 6, 1 ) | ( 2 - 3 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 1 - 2 3 ) | ( 5 - 6 5 ) | ( 3 - 2 1 ) | 2 - - - V |
( 6, - 1 2 ) | ( 3 - 2 1 ) | ( 6, - 5, - ) | 6, - - - V ||

( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 5_ 6_ ] [ 5_ 3_ ] ) |
( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | 2 - V |
( [ 3_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | 3 - V |
( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | 6, - - - V |
( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 1''_ 6_ ] [ 5_ 3_ ] ) | ( [ 5_ 6_ ] [ 1''_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) |
( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | 2 - V |
( [ 3_ 2_ ] [ 1_ 6,_ ] ) | ( [ 5,_ 6,_ ] [ 1_ 2_ ] ) | ( [ 3_ 5_ ] [ 6_ 5_ ] ) | ( [ 3_ 2_ ] [ 1_ 6,_ ] ) |
( 5, - 6, - ) | 1 - - - ||', 'Grade 8-9. By Zhao Songting and Cao Xing (1979). One of the great dizi concertos.', NULL, NULL, 'Zhao Songting & Cao Xing, 1979', 0);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-2', 7, '三五七', NULL, 'San Wu Qi', 'D', '2/4', 152, '0 ( 5 3 ) | ( 2 1 6, 5, 3, ) | 5, - V |
0 ( 5 3 2 1 ) | ( 6, 5, 3, 5, 6, ) | 1 - V |
0 ( 5 3 2 1 6, 5, ) | ( 3, 5, 6, 1 2 3 5 ) | 6 - V |

( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 3,_ 5,_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 5_ 6_ ] [ 5_ 3_ ] ) |
( [ 2_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 6,_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 3,_ 5,_ ] ) | 6, - V |
( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 3,_ 5,_ ] [ 6,_ 1_ ] ) |
( [ 2_ 3_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 6,_ 1_ ] [ 2_ 1_ ] ) | 6, - V |
( [ 3,_ 5,_ ] [ 6,_ 1_ ] ) | ( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 3,_ 5,_ ] ) |
6, - | 0 0 ||', 'A Zhejiang opera style piece arranged by Zhao Songting. Named after its rhythmic pattern. Grade 7.', NULL, NULL, 'Zhao Songting (Zhejiang opera)', 1);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-3', 7, '秦川抴怀', NULL, 'Reflections on Qinchuan', 'D', '4/4', 50, '0 0 ( 2 3 ) | 5 - - ( 6 5 ) | 3 - 2 - | 1 - 6, - |
5, - - - V | ( 6, 1 2 3 ) | 2 - - - - V |
( 3 5 6 5 ) | ( 3 - 2 1 ) | 6, - 5, - | 6, - - - V |
( 1 2 3 5 ) | ( 6 - 5 3 ) | 2 - - - - V ||

( 2 - 3 5 ) | ( 6 - 5 3 ) | 2 - - 1 | 6, - - - V |
( 5, - 6, 1 ) | ( 2 - 3 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 2 - 3 5 ) | ( 6 - 1'' 6 ) | ( 5 - 3 2 ) | 3 - - - V |
( 5 - 6 1'' ) | ( 6 - 5 3 ) | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 2 1 ) | ( 6, - 5, 6, ) | 1 - - - V |
( 2 - 3 5 ) | ( 6 - 5 3 ) | 2 - - - | 0 - - - V ||

( [ 2_ 3_ ] [ 5_ 6_ ] ) | ( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 5,_ ] ) |
( [ 6,_ 1_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | 2 - | 0 0 V |
( [ 5_ 6_ ] [ 5_ 3_ ] ) | ( [ 2_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 1_ ] [ 6,_ 5,_ ] ) | ( [ 6,_ 1_ ] [ 2_ 3_ ] ) |
( [ 5_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) | ( [ 2_ 3_ ] [ 5_ 6_ ] ) | 5 - V |
( [ 2_ 3_ ] [ 5_ 3_ ] ) | ( [ 2_ 1_ ] [ 6,_ 1_ ] ) | ( [ 2_ 3_ ] [ 2_ 1_ ] ) | ( [ 6,_ 5,_ ] [ 6,_ 1_ ] ) |
2 - | 0 0 ||', 'By Ma Di. A northern masterpiece evoking the landscapes of Shaanxi province. Grade 8. Uses Shang mode.', NULL, NULL, 'Ma Di', 2);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-4', 7, '愛空山', NULL, 'Sorrowful Empty Mountain', 'D', '散板', NULL, 'pp
5, - - - - | 0 0 0 0 | 6, - - - - | 0 0 0 0 |
1 - - - - - | 2 - 1 - 6, - | 5, - - - - - |
0 0 0 0 | 0 0 0 0 |

(gradually emerging)
6, - 1 - | 2 - - 3 | 2 - 1 - | 6, - - - |
5, 6, 1 2 | 3 - 2 1 | 6, - 5, - | 6, - - - - |

(This piece requires the full published score for accurate study.
The notation here is a simplified excerpt for familiarization.)', 'By Guo Wenjing (1992). A contemporary masterwork for dizi and orchestra. Grade 9+.', NULL, NULL, 'Guo Wenjing, 1992', 3);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-5', 7, '梅花三弄', 'Mai Hoa Tam Lộng', 'Three Variations on Plum Blossom', 'D', '4/4', 52, '( 5, - 6, 1 ) | 2 - - 3 | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 3 ) | ( 2 - 1 6, ) | 1 - - - V |
( 2 - 3 5 ) | ( 6 - 5 3 ) | ( 5 - 3 2 ) | 3 - - - V |
( 2 - 1 6, ) | ( 5, - 6, 1 ) | ( 6, - 5, 6, ) | 1 - - - V |

( 5 - 6 1'' ) | 2'' - - 3'' | ( 2'' - 1'' 6 ) | 5 - - - V |
( 6 - 1'' 2'' ) | ( 3'' - 5'' 3'' ) | ( 2'' - 1'' 6 ) | 1'' - - - V |

( 5, - 6, 1 ) | 2 - - 3 | ( 2 - 1 6, ) | 5, - - - V |
( 6, - 1 2 ) | ( 3 - 5 3 ) | ( 2 - 1 6, ) | 1 - - - ||', 'Ancient guqin piece (~300 AD), adapted for dizi. A classical masterwork.', NULL, NULL, 'Jin Dynasty (~300 AD), guqin', 4);
INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES ('level-7-song-6', 7, '二泉映月', 'Nhị Tuyền Ánh Nguyệt', 'Moon Reflected in Two Springs', 'D', '4/4', 48, '0 0 0 5, | ( 6, - 1 2 ) | ( 1 - 6, 5, ) | 6, - - - V |
( 1 - 2 3 ) | ( 5 - 3 2 ) | ( 1 - 6, 1 ) | 2 - - - V |
( 3 - 5 6 ) | ( 5 - 3 2 ) | ( 3 - 2 1 ) | 6, - - - V |
( 5, - 6, 1 ) | ( 2 - 1 6, ) | ( 5, - 6, 5, ) | 3, - - - V |
( 5, - 6, 1 ) | ( 2 - 3 5 ) | ( 3 - 2 1 ) | 2 - - - V |
( 6, - 1 2 ) | ( 3 - 5 6 ) | ( 5 - 3 2 ) | 1 - - - V |
( 6, - 1 2 ) | ( 1 - 6, 5, ) | 6, - - - | 0 - - - ||', 'By Abing (Hua Yanjun), a blind street musician. Originally for erhu. One of China''s most famous instrumental pieces.', NULL, NULL, 'Abing (Hua Yanjun)', 5);

-- Exercises
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-0-exercise-1', 0, 'Rhythm Clapping: Quarter Notes', 'D', '4/4', NULL, '1  1  1  1 | 1  1  1  1 | 1  1  1  1 | 1  1  1  1 ||', 'Clap on each note to practice reading jianpu rhythm.', NULL, NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-0-exercise-2', 0, 'Rhythm Clapping: Half and Quarter Notes', 'D', '4/4', NULL, '1  -  1  1 | 1  1  1  - | 1  -  1  - | 1  -  -  - ||', 'Practice half notes and quarter notes by clapping.', NULL, NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-0-exercise-3', 0, 'Rhythm Clapping: With Rests', 'D', '4/4', NULL, '1  1  0  1 | 1  0  1  1 | 1  -  0  0 | 1  1  1  - ||', 'Practice rests (silence) within rhythmic patterns.', NULL, NULL, 2);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-0-exercise-4', 0, 'Rhythm Clapping: Reading Different Numbers', 'D', '4/4', NULL, '1  2  3  4 | 5  -  5  - | 6  5  4  3 | 2  -  1  - ||', 'Clap the rhythm while saying the numbers out loud. This builds your jianpu reading before adding the complexity of playing.', NULL, NULL, 3);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-1', 1, 'Long Tones on Each Note', 'D', '4/4', 60, '1 - - - | 1 - - - | 0 0 0 0 |
2 - - - | 2 - - - | 0 0 0 0 |
3 - - - | 3 - - - | 0 0 0 0 |
4 - - - | 4 - - - | 0 0 0 0 |
5 - - - | 5 - - - | 0 0 0 0 ||', 'Hold each note as long as possible with a steady, even tone.', '/audio/level-1/01-long-tones.ogg', NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-2', 1, 'Scale Walk (Ascending)', 'D', '4/4', 60, '1 - 2 - | 3 - 4 - | 5 - - - | 0 - - - ||', 'Walk up the scale slowly from Do to Sol.', '/audio/level-1/02-scale-walk-ascending.ogg', NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-3', 1, 'Scale Walk (Descending)', 'D', '4/4', NULL, '5 - 4 - | 3 - 2 - | 1 - - - | 0 - - - ||', 'Walk down the scale from Sol to Do.', '/audio/level-1/03-scale-walk-descending.ogg', NULL, 2);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-4', 1, 'Scale Up and Down', 'D', '4/4', NULL, '1 - 2 - | 3 - 4 - | 5 - - - | 0 0 0 0 |
5 - 4 - | 3 - 2 - | 1 - - - | 0 0 0 0 ||', 'Combine ascending and descending scale practice.', '/audio/level-1/04-scale-up-and-down.ogg', NULL, 3);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-5', 1, 'Step Patterns', 'D', '4/4', NULL, '1 2 1 2 | 3 4 3 4 | 5 4 5 4 | 3 2 3 2 |
1 - - - | 0 0 0 0 ||', 'Practice stepwise motion between adjacent notes.', '/audio/level-1/05-step-patterns.ogg', NULL, 4);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-6', 1, 'Skip Patterns', 'D', '4/4', NULL, '1 3 1 3 | 2 4 2 4 | 3 5 3 5 | 1 - - - ||', 'Practice skipping between notes (intervals of a third).', '/audio/level-1/06-skip-patterns.ogg', NULL, 5);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-1-exercise-7', 1, 'Simple Tonguing Practice', 'D', '4/4', NULL, '1 1 1 1 | 2 2 2 2 | 3 3 3 3 | 4 4 4 4 |
5 5 5 5 | 4 4 4 4 | 3 3 3 3 | 2 2 2 2 |
1 - - - ||', 'Single tongue each note with "tu". Start at 60 BPM.', '/audio/level-1/07-tonguing-practice.ogg', NULL, 6);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-2-exercise-1', 2, 'Full Scale Long Tones', 'D', '4/4', 60, '5, - - - | 6, - - - | 7, - - - | 1 - - - |
2 - - - | 3 - - - | 4 - - - | 5 - - - |
6 - - - | 7 - - - | 1'' - - - | 0 - - - ||', 'Long tones through the full scale from low Sol to high Do.', '/audio/level-2/01-full-scale-long-tones.ogg', NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-2-exercise-2', 2, 'Pentatonic Scale Patterns', 'D', '4/4', NULL, '1 2 3 5 | 6 - - - | 6 5 3 2 | 1 - - - |
1 3 5 6 | 5 3 2 1 | 2 3 5 6 | 1 - - - ||', 'Practice the pentatonic scale in various patterns.', '/audio/level-2/02-pentatonic-patterns.ogg', NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-2-exercise-3', 2, 'Octave Jumps', 'D', '4/4', NULL, '5, - 5 - | 6, - 6 - | 7, - 7 - | 1 - 1'' - |
1'' - 1 - | 7 - 7, - | 6 - 6, - | 5 - 5, - ||', 'Practice jumping between octaves on the same note.', '/audio/level-2/03-octave-jumps.ogg', NULL, 2);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-2-exercise-4', 2, 'Tonguing on Eighth Notes', 'D', '2/4', NULL, '1 2 | 3 4 | 5 6 | 7 1'' |
1'' 7 | 6 5 | 4 3 | 2 1 ||', 'Tongue each note with "tu". Two notes per beat.', '/audio/level-2/04-tonguing-eighth-notes.ogg', NULL, 3);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-3-exercise-1', 3, 'Dynamic Long Tones', 'D', '4/4', NULL, '1 - - - - - - - | 2 - - - - - - - |
3 - - - - - - - | 5 - - - - - - - |
6 - - - - - - - ||', 'Play each note: start very soft, grow to loud, return to soft.', '/audio/level-3/01-dynamic-long-tones.ogg', NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-3-exercise-2', 3, 'Pentatonic Patterns', 'D', '2/4', NULL, '1 2 | 3 5 | 6 5 | 3 2 |
1 3 | 5 6 | 5 3 | 2 1 |
6, 1 | 2 3 | 5 6 | 5 - ||', 'Practice pentatonic patterns in 2/4 time.', '/audio/level-3/02-pentatonic-patterns.ogg', NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-3-exercise-3', 3, 'Two-Octave Scale Run', 'D', '4/4', NULL, '5, 6, 7, 1 | 2 3 4 5 | 6 7 1'' - | 0 0 0 0 |
1'' 7 6 5 | 4 3 2 1 | 7, 6, 5, - | 0 0 0 0 ||', 'Full two-octave scale ascending and descending.', '/audio/level-3/03-two-octave-scale.ogg', NULL, 2);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-3-exercise-4', 3, 'Dotted Rhythm Patterns', 'D', '2/4', NULL, '1. 2 | 3. 5 | 6. 5 | 3 - |
5. 6 | 5. 3 | 2. 1 | 6, - ||', 'Practice dotted rhythms creating a "long-short" swing feel.', '/audio/level-3/04-dotted-rhythms.ogg', NULL, 3);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-3-exercise-5', 3, 'Grace Note Practice', 'D', '4/4', NULL, '(2)1 - - - | (1)2 - - - | (2)3 - - - | (3)2 - - - |
(6)5 - - - | (5)6 - - - | (2)1 - - - ||', 'Numbers in parentheses are grace notes -- play them very quickly before the main note.', '/audio/level-3/05-grace-notes.ogg', NULL, 4);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-4-exercise-1', 4, 'Vibrato Long Tones', 'D', '4/4', NULL, '1 - - - - - - - | 2 - - - - - - - |
3 - - - - - - - | 5 - - - - - - - |
6 - - - - - - - | 1'' - - - - - - - ||', 'Start each note plain for the first beat, then add vibrato for the remaining 7 beats.', '/audio/level-4/01-vibrato-long-tones.ogg', NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-4-exercise-2', 4, 'Double Tonguing Drill', 'D', '4/4', 80, '1 1 1 1 | 2 2 2 2 | 3 3 3 3 | 5 5 5 5 |
6 6 6 6 | 5 5 5 5 | 3 3 3 3 | 2 2 2 2 |
1 1 1 1 | 1 - - - ||', 'Each note tongued with alternating tu-ku. Make "ku" as clear as "tu."', '/audio/level-4/02-double-tonguing.ogg', NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-4-exercise-3', 4, 'Trill Practice', 'D', '4/4', NULL, '1 tr - - | 2 tr - - | 3 tr - - | 5 tr - - |
6 tr - - | 5 tr - - | 3 tr - - | 1 tr - - ||', 'Hold each trill for 3 beats. Start with slow trills and increase speed.', '/audio/level-4/03-trill-practice.ogg', NULL, 2);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-4-exercise-4', 4, 'Ornament Combinations', 'D', '2/4', NULL, '(d)1 - | (d)2 - | (d)3 - | (d)5 - |
(da)6 5 | (da)5 3 | (da)3 2 | (da)1 - ||', 'First half: practice 叠音 on held notes. Second half: practice 打音 on moving passages.', '/audio/level-4/04-ornament-combinations.ogg', NULL, 3);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-4-exercise-5', 4, 'Sixteenth Note Patterns', 'D', '2/4', NULL, '1 2 3 2 | 1 - | 3 5 6 5 | 3 - |
5 6 1'' 6 | 5 3 | 2 3 5 3 | 2 - ||', 'Groups of four sixteenth notes per beat. Keep fingers close to the holes for speed.', '/audio/level-4/05-sixteenth-notes.ogg', NULL, 4);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-5-exercise-1', 5, 'Triple Tonguing Drill', 'D', '2/4', NULL, '1 1 1  2 2 2 | 3 3 3  5 5 5 | 6 6 6  5 5 5 | 3 3 3  2 2 2 |
1 1 1  1 - ||', 'Practice the tu-tu-ku pattern on triplet groupings.', '/audio/level-5/triple-tonguing-drill.ogg', NULL, 0);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-5-exercise-2', 5, 'Slide Practice', 'D', '4/4', NULL, '1 - ↗3 - | 3 - ↗5 - | 5 - ↗6 - | 6 - ↘5 - |
5 - ↘3 - | 3 - ↘1 - ||', 'Practice upward and downward slides between notes.', '/audio/level-5/slide-practice.ogg', NULL, 1);
INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES ('level-5-exercise-3', 5, '散板 Free Time Exercise', 'D', '散板', NULL, '5, - - 6, 1 | 2 3 - - - | 5 - 6 5 3 | 2 - - - |
1 - - - 6, | 5, - - - - ||', 'No metronome. Feel each note. Breathe naturally.', '/audio/level-5/sanban-free-time.ogg', NULL, 2);
