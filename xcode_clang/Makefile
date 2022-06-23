exec = exec
SCREENSAVER_CLIB = -F /System/Library/PrivateFrameworks -framework login -framework ApplicationServices

all: mkdir
	$(CC) -v
	$(CC) c_sample/screensaver.c $(SCREENSAVER_CLIB) -O2 -o ./$(exec)/screensaver
mkdir:
	@if [ ! -d $(exec) ] ; then mkdir $(exec) ; fi

.PHONY: all
