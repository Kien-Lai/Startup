# Startup
Chứa file hoàn chỉnh có cả nodemodules. <br>
Chứa code model của DB <br>
Chứa file dumb chuẩn của DB ( tên DB: Startup, tên Collection: exams, questions)<br>
api: localhost:6969/api/admin/exam nhập đề thi <br>
localhost:6969/api/admin/question nhập câu hỏi <br>
dump db: mongodump -d name_db <br>
         mongorestore --drop -d name_db dump/name_db
