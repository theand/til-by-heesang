[TOC]


# MySQLWorkbench 에서 data export 할때 version mismatch 경고가 뜰때 대응

MySQLWorkbench를 최신 버전으로 설치를 하면 번들되어 있는 mysqldump 등의 툴도 버전이 같이 올라가는데, 이때 대상  원격 서버의 버전이 더 낮으면 dump 자체도 잘 안된다. 진행시 경고가 한번 뜨고, 실제 진행도 이루어지지 않는 경우가 있다.

```
14:14:32 Dumping REDACTED (all tables)
Running: /Applications/MySQLWorkbench.app/Contents/MacOS/mysqldump --defaults-file="/var/folders/6k/tjrzsxzd6_13ngrfyc6t13_w0000gn/T/tmpKSR_sa/extraparams.cnf"  --user=REDACTED --host=REDACTED --protocol=tcp --port=3306 --default-character-set=utf8 --skip-triggers "REDACTED"
mysqldump: Couldn't execute 'SELECT COLUMN_NAME,                       JSON_EXTRACT(HISTOGRAM, '$."number-of-buckets-specified"')                FROM information_schema.COLUMN_STATISTICS                WHERE SCHEMA_NAME = 'REDACTED' AND TABLE_NAME = 'configuration_parameters';': Unknown table 'COLUMN_STATISTICS' in information_schema (1109)

Operation failed with exitcode 2
14:14:32 Export of /Users/REDACTED/dumps/20190328.sql has finished with 1 errors
```

해결 하기 위해서는 로컬에 원격서버와 같은 버전의 클라이언트를 깔아놓고 설정에서 이를 사용하여 백업하도록 지정하면 된다.

1. 로컬에 버전 맞춰서 설치하기

```
brew install mysql@5.6
```

2. 사용할 명령어 경로 지정하기

```
Go to Edit - Preferences - Administrator - Path to Mysqldumptool
```

```
/usr/local/opt/mysql@5.6/bin/mysqldump
```
