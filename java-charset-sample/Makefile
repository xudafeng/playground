git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')

all:
	cat Makefile
build:
	@java -version
	@echo JAVA_HOME: ${JAVA_HOME}
	@cd ./src/ && javac *.java
run: build
	@cd ./src/ && java Sample
run-android: build
	@cd ./src/ && dx --dex --output=Sample.dex Sample.class
	@adb push ./src/Sample.dex /data/local/tmp
	@adb shell app_process -Djava.class.path=/data/local/tmp/Sample.dex /data/local/tmp/ Sample
.PHONY: test
