import java.nio.charset.*;
import java.util.SortedMap;

class Sample {
  public static void main(String[] agrs) {
      System.out.println("-------- result --------");
      SortedMap availableCharsets = Charset.availableCharsets();
      System.out.println(availableCharsets);
      Charset defaultCharset = Charset.defaultCharset();
      System.out.println(defaultCharset);

      Charset UTF8 = Charset.forName("UTF-8");
      Charset ASCII  = Charset.forName("US-ASCII");

      if (Charset.isSupported("UTF-7")) {
        System.out.println("UTF-7 is supported.");
        Charset UTF7 = Charset.forName("UTF-7");
        String text = "中";
        byte[] encoded = text.getBytes(UTF8);
        System.out.println(encoded.length);

        System.out.println(encoded[0]);
        System.out.println(encoded[1]);
        System.out.println(encoded[2]);

        String str1 = new String(encoded, ASCII);
        //String str2 = new String(encoded[1], ASCII);
        //String str3 = new String(encoded[2], ASCII);

        System.out.println(str1);
        //System.out.println(str2);
        //System.out.println(str3);
      } else {
        System.out.println("UTF-7 is not supported.");
      }
      System.out.println("\n------------------------");
    }
}
