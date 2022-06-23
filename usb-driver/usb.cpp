#include <iostream>
#include <libusb-1.0/libusb.h>

using namespace std;

static libusb_device **devs;
static libusb_context *context = NULL;

int getDevs() {
  int count = libusb_get_device_list(context, &devs);
  if (count < 0) {
    printf("Get device error.\n");
  } else {
    printf("\n%d devices in list.\n\n", count);
  }

  return count;
}

int printDev(libusb_device *device) {

  struct libusb_device_descriptor desc;
  struct libusb_device_handle *handle;

  unsigned char buf[512];
  int rc;

  libusb_get_device_descriptor(device, &desc);

  printf("Attached device: \n");
  printf("\tCLASS(0x%x) SUBCLASS(0x%x) PROTOCOL(0x%x) VENDOR(0x%x) PRODUCT(0x%x)\n", desc.bDeviceClass, desc.bDeviceSubClass, desc.bDeviceProtocol, desc.idVendor, desc.idProduct);

  rc = libusb_open(device, &handle);

  if (LIBUSB_SUCCESS != rc) {
    printf("Could not open USB device\n");
    return 0;
  }

  memset(buf, 0, sizeof(buf));
  rc = libusb_get_string_descriptor_ascii(handle, desc.iManufacturer, buf, sizeof(buf));

  if (rc < 0) {
    //printf("Get Manufacturer failed\n");
  } else {
    printf("\tManufacturer: %s\n", buf);
  }

  memset(buf, 0, sizeof(buf));
  rc = libusb_get_string_descriptor_ascii(handle, desc.iProduct, buf, sizeof(buf));

  if (rc < 0) {
    //printf("Get Product failed\n");
  } else {
    printf("\tProduct: %s\n", buf);
  }

  memset(buf, 0, sizeof(buf));
  rc = libusb_get_string_descriptor_ascii(handle, desc.iSerialNumber, buf, sizeof(buf));

  if (rc < 0) {
    //printf("Get SerialNumber failed\n");
  } else {
    printf("\tSerialNumber: %s\n", buf);
  }
  libusb_close(handle);

  return 0;
}

int main(int argc, const char * argv[]) {

  if (int e = libusb_init(&context)) {
    printf("Init error: %d\n", e);
  }

  if (context) {
    libusb_set_debug(context, 3);
  }

  int count = getDevs();

  for (int i = 0; i < count; i++) {
    libusb_device *device = devs[i];
    printDev(device);
  }

  libusb_free_device_list(devs, 1);
  libusb_exit(NULL);
  return 0;
}
