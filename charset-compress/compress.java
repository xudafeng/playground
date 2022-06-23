package test;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.charset.Charset;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;

import android.app.Activity;
import android.net.http.AndroidHttpClient;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

public class Main extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);

        new Thread(new Runnable() {

            @Override
            public void run() {
                // TODO Auto-generated method stub
                try {

                    Charset ASCII = Charset.forName("US-ASCII");
                    File file = new File("/sdcard/origin.jpg");
                    File f = new File("/sdcard/gen.jpg");
                    f.createNewFile();

                    if (file.isFile() && file.exists()) {
                        FileInputStream fi = new FileInputStream(file);
                        BufferedInputStream bufferedReader = new BufferedInputStream(fi);
                        FileOutputStream fo = new FileOutputStream(f);
                        byte[] data = new byte[bufferedReader.available()];
                        bufferedReader.read(data, 0, data.length);
                        byte[] list = new byte[5 + data.length + Math.round(data.length / 7)];

                        for (int i = 0; i < data.length; i++) {
                            Log.i("test", i + "d-hex   " + Integer.toBinaryString(data[i]));
                        }

                        int index = 0;

                        list[index++] |= (data.length & 0x7f);
                        list[index++] |= ((data.length >> 8) & 0x7f);
                        list[index++] |= ((data.length >> 16) & 0x7f);
                        list[index++] |= ((data.length >> 24) & 0x7f);
                        list[index] |= ((data.length >> 7) & 0x1);
                        list[index] |= ((data.length >> 14) & 0x2);
                        list[index] |= ((data.length >> 21) & 0x4);
                        list[index] |= ((data.length >> 28) & 0x8);

                        for (int i = 0; i < data.length; i++) {
                            if (i % 7 == 0) {
                                index++;
                            }
                            list[index] |= ((data[i] & 0x80) >> (i % 7 + 1));
                        }
                        for (int i = 0; i < data.length; i++) {
                            list[++index] = (byte) (data[i] & 0x7f);
                        }

                        for (int i = 0; i < list.length; i++) {
                            Log.i("qq", i + "l-hex   " + Integer.toBinaryString(list[i]));
                        }

                        fo.write(list);
                        fo.flush();
                        fo.close();

                        String temp = new String(list, ASCII);

                        byte[] tempb = temp.getBytes(ASCII);

                        AndroidHttpClient androidHttpClient = AndroidHttpClient
                                .newInstance("s");
                        HttpUriRequest get = new HttpGet("");
                        HttpResponse response = androidHttpClient.execute(get);
                        InputStream in = response.getEntity().getContent();

                        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                        byte[] tmp = new byte[2048];

                        for (int len = -1; (len = in.read(tmp)) != -1; ) {
                            outputStream.write(tmp, 0, len);
                        }

                        tempb = outputStream.toByteArray();

                        int len = 0;
                        len |= (tempb[0] & 0x7f);
                        len |= ((tempb[1] & 0x7f) << 8);
                        len |= ((tempb[2] & 0x7f) << 16);
                        len |= ((tempb[3] & 0x7f) << 24);
                        len |= ((tempb[4] & 0x1) << 7);
                        len |= ((tempb[4] & 0x2) << 14);
                        len |= ((tempb[4] & 0x4) << 21);
                        len |= ((tempb[4] & 0x8) << 28);

                        byte[] s = new byte[len];

                        for (int i = 0; i < s.length; i++) {
                            s[i] |= ((tempb[i / 7 + 5] << (i % 7 + 1)) & 0x80);
                            s[i] |= tempb[i + tempb.length - len];
                        }

                        fo.write(Base64.encodeToString(s, Base64.DEFAULT).getBytes());
                        fo.flush();
                        fo.close();
                        fi.close();
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        }).start();
    }
}


