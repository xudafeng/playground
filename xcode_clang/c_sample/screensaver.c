//
//  main.c
//  c_sample
//
//  Created by xdf on 18/11/2016.
//  Copyright © 2016 xdf. All rights reserved.
//

#include <ApplicationServices/ApplicationServices.h>

extern void SACLockScreenImmediate ( );

int main (int argc, const char * argv[]) {
    SACLockScreenImmediate();
    return 0;
}
