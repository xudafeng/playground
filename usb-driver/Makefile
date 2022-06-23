cxx	=	g++
CFLAGS = -g	-Wall -O2

LIBUSB_FLAG	=	`pkg-config "libusb-1.0" --cflags`
LIBUSB_L = `pkg-config "libusb-1.0" --libs-only-l`

all: usb

usb.o: usb.cpp
	@$(cxx) $(CFLAGS) $(LIBUSB_FLAG) -c usb.cpp

usb: usb.o
	@$(cxx) usb.o -o usb $(LIBUSB_L)

clean:
	@rm usb.o usb
